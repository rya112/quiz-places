import { useState, useCallback, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { WelcomeCard } from './components/WelcomeCard';
import { QuizCard } from './components/QuizCard';
import { SummaryCard } from './components/SummaryCard';
import { PLACES_DATA } from './data/placesData';
import { getStats, recordAnswer, resetStats } from './services/storageService';
import { preloadNextImages } from './services/imagePreloader';
import { shuffleArray } from './utils/shuffle';
import { PlaceQuestion, QuizStats } from './types/quiz';
import './index.css';

type ViewMode = 'welcome' | 'quiz' | 'summary';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('welcome');
  const [stats, setStats] = useState<QuizStats>(() => getStats());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // Lista de perguntas e opções embaralhadas para a sessão atual
  const [shuffledQuestions, setShuffledQuestions] = useState<PlaceQuestion[]>([]);

  // Embaralha as perguntas e as opções de cada pergunta ao iniciar ou reiniciar o quiz
  const prepareQuizQuestions = useCallback(() => {
    const randomized = shuffleArray(PLACES_DATA).map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
    setShuffledQuestions(randomized);
    setCurrentQuestionIndex(0);
  }, []);

  // Pré-carrega as primeiras imagens em segundo plano
  useEffect(() => {
    const initialImages = PLACES_DATA.slice(0, 3).map((place) => place.imageUrl);
    preloadNextImages(initialImages);
  }, []);

  const handleStartQuiz = useCallback(() => {
    prepareQuizQuestions();
    resetStats();
    setStats({ score: 0, totalQuestions: 0 });
    setViewMode('quiz');
  }, [prepareQuizQuestions]);

  const handleAnswerSubmit = useCallback((isCorrect: boolean) => {
    const updated = recordAnswer(isCorrect);
    setStats(updated);
  }, []);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= shuffledQuestions.length) {
        setViewMode('summary');
        return prevIndex;
      }
      return nextIndex;
    });
  }, [shuffledQuestions.length]);

  const handleResetQuiz = useCallback(() => {
    const reseted = resetStats();
    setStats(reseted);
    prepareQuizQuestions();
    setViewMode('quiz');
  }, [prepareQuizQuestions]);

  const handleExitQuiz = useCallback(() => {
    const reseted = resetStats();
    setStats(reseted);
    setCurrentQuestionIndex(0);
    setViewMode('welcome');
  }, []);

  const currentQuestion = useMemo(
    () => shuffledQuestions[currentQuestionIndex] || PLACES_DATA[0],
    [shuffledQuestions, currentQuestionIndex]
  );

  const nextQuestionUrl = useMemo(() => {
    const nextIdx = currentQuestionIndex + 1;
    return shuffledQuestions[nextIdx]?.imageUrl;
  }, [shuffledQuestions, currentQuestionIndex]);

  return (
    <div className="app-container">
      <Header
        stats={stats}
        isInQuizView={viewMode === 'quiz' || viewMode === 'summary'}
        onResetQuiz={handleResetQuiz}
        onExitQuiz={handleExitQuiz}
      />

      <main className="main-content">
        {viewMode === 'welcome' && (
          <WelcomeCard onStartQuiz={handleStartQuiz} />
        )}

        {viewMode === 'quiz' && currentQuestion && (
          <QuizCard
            question={currentQuestion}
            nextQuestionUrl={nextQuestionUrl}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {viewMode === 'summary' && (
          <SummaryCard
            score={stats.score}
            totalQuestions={stats.totalQuestions}
            onRestart={handleStartQuiz}
            onExit={handleExitQuiz}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Quiz Places &copy; {new Date().getFullYear()} - Aprenda se divertindo com imagens incríveis!</p>
      </footer>
    </div>
  );
}

export default App;
