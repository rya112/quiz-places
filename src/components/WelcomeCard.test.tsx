import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WelcomeCard } from './WelcomeCard';

describe('WelcomeCard (Caso de Uso 1)', () => {
  it('deve exibir mensagem de "Bem vindo" e o botão para iniciar o quiz', () => {
    render(<WelcomeCard onStartQuiz={vi.fn()} />);

    expect(screen.getByText(/bem vindo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar quiz/i })).toBeInTheDocument();
  });

  it('deve chamar a função onStartQuiz ao clicar no botão', () => {
    const handleStart = vi.fn();
    render(<WelcomeCard onStartQuiz={handleStart} />);

    const button = screen.getByRole('button', { name: /iniciar quiz/i });
    fireEvent.click(button);

    expect(handleStart).toHaveBeenCalledTimes(1);
  });
});
