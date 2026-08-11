import { describe, it, expect, beforeEach } from 'vitest';
import { getStats, recordAnswer, resetStats, clearMemoryCache } from './storageService';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
    clearMemoryCache();
  });

  it('deve retornar estatísticas zeradas por padrão quando o localStorage estiver vazio', () => {
    const stats = getStats();
    expect(stats).toEqual({ score: 0, totalQuestions: 0 });
  });

  it('deve incrementar o total de perguntas e pontuação em resposta correta', () => {
    recordAnswer(true);
    expect(getStats()).toEqual({ score: 1, totalQuestions: 1 });
  });

  it('deve incrementar apenas o total de perguntas em resposta incorreta', () => {
    recordAnswer(false);
    expect(getStats()).toEqual({ score: 0, totalQuestions: 1 });
  });

  it('deve acumular múltiplas respostas e persistir no localStorage', () => {
    recordAnswer(true);
    recordAnswer(true);
    recordAnswer(false);
    expect(getStats()).toEqual({ score: 2, totalQuestions: 3 });

    const rawData = localStorage.getItem('quiz_stats');
    expect(rawData).not.toBeNull();
    expect(JSON.parse(rawData!)).toEqual({ score: 2, totalQuestions: 3 });
  });

  it('deve reiniciar as estatísticas quando resetStats for chamado', () => {
    recordAnswer(true);
    recordAnswer(true);

    resetStats();
    expect(getStats()).toEqual({ score: 0, totalQuestions: 0 });
    expect(localStorage.getItem('quiz_stats')).toBe(JSON.stringify({ score: 0, totalQuestions: 0 }));
  });
});
