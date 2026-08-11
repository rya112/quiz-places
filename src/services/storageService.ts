import { QuizStats } from '../types/quiz';

const STORAGE_KEY = 'quiz_stats';

// Cache em memória para acesso ultrarrápido sem parsing contínuo de JSON
let cachedStats: QuizStats | null = null;

export const getStats = (): QuizStats => {
  if (cachedStats !== null) {
    return cachedStats;
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    cachedStats = { score: 0, totalQuestions: 0 };
    return cachedStats;
  }

  try {
    const parsed = JSON.parse(data);
    cachedStats = {
      score: typeof parsed.score === 'number' ? parsed.score : 0,
      totalQuestions: typeof parsed.totalQuestions === 'number' ? parsed.totalQuestions : 0,
    };
  } catch {
    cachedStats = { score: 0, totalQuestions: 0 };
  }

  return cachedStats;
};

export const recordAnswer = (isCorrect: boolean): QuizStats => {
  const current = getStats();
  const updated: QuizStats = {
    score: isCorrect ? current.score + 1 : current.score,
    totalQuestions: current.totalQuestions + 1,
  };
  cachedStats = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const resetStats = (): QuizStats => {
  const resetValue: QuizStats = { score: 0, totalQuestions: 0 };
  cachedStats = resetValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resetValue));
  return resetValue;
};

// Exportado para reset de estado nos testes
export const clearMemoryCache = (): void => {
  cachedStats = null;
};
