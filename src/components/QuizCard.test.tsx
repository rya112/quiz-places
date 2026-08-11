import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuizCard } from './QuizCard';
import { PlaceQuestion } from '../types/quiz';

const mockQuestion: PlaceQuestion = {
  id: '1',
  landmarkName: 'Torre Eiffel',
  imageUrl: 'https://example.com/eiffel.jpg',
  correctCountry: 'França',
  options: ['França', 'Itália', 'Espanha', 'Alemanha'],
};

describe('QuizCard (Casos de Uso 3, 4, 5)', () => {
  it('deve exibir a pergunta "Qual país é?", a imagem do lugar e o seletor com opções (Caso de Uso 3)', () => {
    render(<QuizCard question={mockQuestion} onAnswerSubmit={vi.fn()} onNextQuestion={vi.fn()} />);

    expect(screen.getByText(/qual país é\?/i)).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockQuestion.imageUrl);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'França' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Itália' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /responder/i })).toBeInTheDocument();
  });

  it('deve permitir selecionar um país e clicar em "Responder" (Caso de Uso 4)', () => {
    const onAnswerSubmit = vi.fn();
    render(<QuizCard question={mockQuestion} onAnswerSubmit={onAnswerSubmit} onNextQuestion={vi.fn()} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'França' } });

    const btnResponder = screen.getByRole('button', { name: /responder/i });
    fireEvent.click(btnResponder);

    expect(onAnswerSubmit).toHaveBeenCalledWith(true);
  });

  it('deve exibir mensagem "Resposta correta" quando o usuário selecionar o país correto (Caso de Uso 5)', () => {
    render(<QuizCard question={mockQuestion} onAnswerSubmit={vi.fn()} onNextQuestion={vi.fn()} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'França' } });

    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    expect(screen.getByText(/resposta correta/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem "Resposta incorreta" quando o usuário selecionar um país incorreto (Caso de Uso 5)', () => {
    render(<QuizCard question={mockQuestion} onAnswerSubmit={vi.fn()} onNextQuestion={vi.fn()} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Itália' } });

    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    expect(screen.getByText(/resposta incorreta/i)).toBeInTheDocument();
  });

  it('deve chamar a função onNextQuestion ao clicar no botão de próxima pergunta', () => {
    const onNextQuestion = vi.fn();
    render(<QuizCard question={mockQuestion} onAnswerSubmit={vi.fn()} onNextQuestion={onNextQuestion} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'França' } });
    fireEvent.click(screen.getByRole('button', { name: /responder/i }));

    const nextBtn = screen.getByRole('button', { name: /próxima pergunta/i });
    fireEvent.click(nextBtn);

    expect(onNextQuestion).toHaveBeenCalledTimes(1);
  });
});
