import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SummaryCard } from './SummaryCard';

describe('SummaryCard (Caso de Uso 4 do melhorias.txt)', () => {
  it('deve exibir a pontuação total e a mensagem de resultado ao final do quiz', () => {
    render(<SummaryCard score={6} totalQuestions={8} onRestart={vi.fn()} onExit={vi.fn()} />);

    expect(screen.getByText(/quiz concluído/i)).toBeInTheDocument();
    expect(screen.getByText(/você acertou/i)).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText(/75% de acertos/i)).toBeInTheDocument();
  });

  it('deve chamar a função onRestart ao clicar em "Jogar Novamente"', () => {
    const handleRestart = vi.fn();
    render(<SummaryCard score={8} totalQuestions={8} onRestart={handleRestart} onExit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /jogar novamente/i }));
    expect(handleRestart).toHaveBeenCalledTimes(1);
  });

  it('deve chamar a função onExit ao clicar em "Sair"', () => {
    const handleExit = vi.fn();
    render(<SummaryCard score={4} totalQuestions={8} onRestart={vi.fn()} onExit={handleExit} />);

    fireEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(handleExit).toHaveBeenCalledTimes(1);
  });
});
