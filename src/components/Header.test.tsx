import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header (Componente de Cabeçalho)', () => {
  const defaultProps = {
    stats: { score: 3, totalQuestions: 5 },
    isInQuizView: true,
    onResetQuiz: vi.fn(),
    onExitQuiz: vi.fn(),
  };

  it('deve exibir o título do site e NÃO exibir o botão de iniciar quiz no cabeçalho', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText(/ia quiz places/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /iniciar quiz/i })).not.toBeInTheDocument();
  });

  it('deve exibir o contador de acertos e o total de perguntas feitas quando estiver na página do quiz', () => {
    render(<Header {...defaultProps} stats={{ score: 4, totalQuestions: 7 }} isInQuizView={true} />);

    expect(screen.getByText(/acertos: 4 \/ 7/i)).toBeInTheDocument();
  });

  it('deve exibir os botões de reiniciar e sair ao lado do contador na página do quiz', () => {
    render(<Header {...defaultProps} isInQuizView={true} />);

    expect(screen.getByRole('button', { name: /reiniciar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument();
  });

  it('deve chamar onResetQuiz ao clicar no botão reiniciar', () => {
    const onResetQuiz = vi.fn();
    render(<Header {...defaultProps} isInQuizView={true} onResetQuiz={onResetQuiz} />);

    fireEvent.click(screen.getByRole('button', { name: /reiniciar/i }));
    expect(onResetQuiz).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onExitQuiz ao clicar no botão sair', () => {
    const onExitQuiz = vi.fn();
    render(<Header {...defaultProps} isInQuizView={true} onExitQuiz={onExitQuiz} />);

    fireEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(onExitQuiz).toHaveBeenCalledTimes(1);
  });
});
