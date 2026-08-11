import React, { useState, useEffect, memo } from 'react';
import { PlaceQuestion } from '../types/quiz';
import { preloadImage } from '../services/imagePreloader';

interface QuizCardProps {
  question: PlaceQuestion;
  nextQuestionUrl?: string;
  onAnswerSubmit: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = memo(({
  question,
  nextQuestionUrl,
  onAnswerSubmit,
  onNextQuestion,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reset do estado ao mudar a pergunta e pré-carregamento da próxima imagem
  useEffect(() => {
    setSelectedCountry('');
    setSubmitted(false);
    setIsCorrect(null);

    // Pré-carrega a imagem da próxima pergunta em segundo plano para eliminar a latência de exibição
    if (nextQuestionUrl) {
      preloadImage(nextQuestionUrl);
    }
  }, [question, nextQuestionUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || submitted) return;

    const correct = selectedCountry === question.correctCountry;
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswerSubmit(correct);
  };

  return (
    <div className="quiz-card card">
      <h2 className="quiz-title">Qual país é?</h2>

      <div className="image-container">
        <img
          src={question.imageUrl}
          alt={`Lugar famoso - ${question.landmarkName}`}
          className="landmark-image"
          decoding="async"
          loading="eager"
        />
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        <label htmlFor="country-select" className="select-label">
          Escolha o país:
        </label>
        <select
          id="country-select"
          className="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          disabled={submitted}
          aria-label="Selecione o país"
        >
          <option value="" disabled>
            -- Selecione um país --
          </option>
          {question.options.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {!submitted ? (
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={!selectedCountry}
          >
            Responder
          </button>
        ) : (
          <div className="feedback-section">
            <div
              className={`feedback-message ${
                isCorrect ? 'feedback-correct' : 'feedback-incorrect'
              }`}
            >
              {isCorrect ? (
                <>🎉 Resposta correta!</>
              ) : (
                <>
                  ❌ Resposta incorreta. O país correto é:{' '}
                  <strong>{question.correctCountry}</strong>.
                </>
              )}
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-next"
              onClick={onNextQuestion}
            >
              Próxima Pergunta
            </button>
          </div>
        )}
      </form>
    </div>
  );
});

QuizCard.displayName = 'QuizCard';
