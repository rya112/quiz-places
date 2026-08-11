import React, { memo } from 'react';

interface WelcomeCardProps {
  onStartQuiz: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = memo(({ onStartQuiz }) => {
  return (
    <div className="welcome-card card">
      <div className="welcome-icon">🌍</div>
      <h2>Bem vindo ao Quiz Places!</h2>
      <p>
        Descubra seus conhecimentos sobre lugares e monumentos incríveis ao redor do mundo.
        Veja a imagem do monumento e adivinhe a qual país ele pertence!
      </p>
      <button className="btn btn-primary" onClick={onStartQuiz}>
        Iniciar Quiz
      </button>
    </div>
  );
});

WelcomeCard.displayName = 'WelcomeCard';
