import React, { memo } from 'react';

interface SummaryCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onExit: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = memo(({
  score,
  totalQuestions,
  onRestart,
  onExit,
}) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getFeedbackMessage = () => {
    if (percentage === 100) {
      return { text: 'Incrível! Você é um mestre da geografia mundial! 🏆', icon: '👑' };
    }
    if (percentage >= 75) {
      return { text: 'Excelente trabalho! Seus conhecimentos sobre o mundo são impressionantes! 🌟', icon: '🎉' };
    }
    if (percentage >= 50) {
      return { text: 'Muito bem! Você conhece vários lugares famosos ao redor do mundo! ✈️', icon: '🌍' };
    }
    return { text: 'Bom esforço! Continue praticando para explorar ainda mais o mundo! 🧭', icon: '🚀' };
  };

  const feedback = getFeedbackMessage();

  return (
    <div className="summary-card card">
      <div className="summary-icon">{feedback.icon}</div>
      <h2>Quiz Concluído!</h2>
      <p className="summary-subtitle">{feedback.text}</p>

      <div className="summary-score-box">
        <div className="score-main">
          Você acertou <strong>{score}</strong> de <strong>{totalQuestions}</strong> perguntas!
        </div>
        <div className="score-percentage">{percentage}% de acertos</div>
      </div>

      <div className="summary-actions">
        <button className="btn btn-primary btn-restart" onClick={onRestart}>
          Jogar Novamente
        </button>
        <button className="btn btn-danger btn-exit" onClick={onExit}>
          Sair
        </button>
      </div>
    </div>
  );
});

SummaryCard.displayName = 'SummaryCard';
