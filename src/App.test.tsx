import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';
import { clearMemoryCache } from './services/storageService';

describe('App - Fluxo Completo com Melhorias (melhorias.txt)', () => {
  beforeEach(() => {
    localStorage.clear();
    clearMemoryCache();
  });

  it('deve inicializar na página de boas-vindas', () => {
    render(<App />);

    expect(screen.getByText(/bem vindo ao quiz places/i)).toBeInTheDocument();
    expect(screen.queryByTestId('score-counter')).not.toBeInTheDocument();
  });

  it('deve navegar para a página do quiz ao clicar em "Iniciar Quiz"', () => {
    render(<App />);

    const startBtn = screen.getByRole('button', { name: /iniciar quiz/i });
    fireEvent.click(startBtn);

    expect(screen.getByText(/qual país é\?/i)).toBeInTheDocument();
    expect(screen.getByTestId('score-counter')).toBeInTheDocument();
  });

  it('deve atualizar o contador ao responder a uma pergunta', () => {
    render(<App />);

    // Iniciar quiz
    fireEvent.click(screen.getByRole('button', { name: /iniciar quiz/i }));

    // Verificar contador inicial zerado
    expect(screen.getByTestId('score-counter')).toHaveTextContent('Acertos: 0 / 0');

    // Selecionar qualquer opção e responder
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    fireEvent.change(select, { target: { value: options[1].getAttribute('value') } });
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    // O contador deve registrar 1 pergunta feita
    expect(screen.getByTestId('score-counter')).toHaveTextContent(/acertos: \d \/ 1/i);
  });

  it('deve zerar o contador ao clicar no botão "Reiniciar"', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /iniciar quiz/i }));

    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    fireEvent.change(select, { target: { value: options[1].getAttribute('value') } });
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    expect(screen.getByTestId('score-counter')).toHaveTextContent(/acertos: \d \/ 1/i);

    // Clicar em reiniciar
    fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }));

    expect(screen.getByTestId('score-counter')).toHaveTextContent(/acertos: 0 \/ 0/i);
  });

  it('deve zerar o contador ao clicar no botão "Sair" e retornar à home (Melhoria 2)', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /iniciar quiz/i }));

    // Responder uma pergunta
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    fireEvent.change(select, { target: { value: options[1].getAttribute('value') } });
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    expect(screen.getByTestId('score-counter')).toHaveTextContent(/acertos: \d \/ 1/i);

    // Clicar em Sair
    fireEvent.click(screen.getByRole('button', { name: /sair/i }));

    expect(screen.getByText(/bem vindo ao quiz places/i)).toBeInTheDocument();
    expect(screen.queryByTestId('score-counter')).not.toBeInTheDocument();

    // Re-iniciar quiz para garantir que o contador foi zerado
    fireEvent.click(screen.getByRole('button', { name: /iniciar quiz/i }));
    expect(screen.getByTestId('score-counter')).toHaveTextContent(/acertos: 0 \/ 0/i);
  });
});
