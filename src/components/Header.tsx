import React, { memo } from 'react';
import { QuizStats } from '../types/quiz';

interface HeaderProps {
  stats: QuizStats;
  isInQuizView: boolean;
  onResetQuiz: () => void;
  onExitQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = memo(({
  stats,
  isInQuizView,
  onResetQuiz,
  onExitQuiz,
}) => {
  return (
    <header className="app-header">
      <div className="header-title-container">
        <h1 className="header-title">IA Quiz Places</h1>
      </div>

      {isInQuizView && (
        <div className="header-quiz-controls">
          <div className="score-counter" data-testid="score-counter">
            <span>Acertos: {stats.score} / {stats.totalQuestions}</span>
          </div>
          <button
            className="btn btn-outline btn-reset"
            onClick={onResetQuiz}
            aria-label="Reiniciar"
          >
            Reiniciar
          </button>
          <button
            className="btn btn-danger btn-exit"
            onClick={onExitQuiz}
            aria-label="Sair"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';
