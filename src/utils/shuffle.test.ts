import { describe, it, expect } from 'vitest';
import { shuffleArray } from './shuffle';

describe('shuffleArray', () => {
  it('deve retornar um novo array com os mesmos elementos', () => {
    const original = ['A', 'B', 'C', 'D', 'E'];
    const result = shuffleArray(original);

    expect(result).toHaveLength(original.length);
    expect(result).toEqual(expect.arrayContaining(original));
  });

  it('não deve modificar o array original recebido por parâmetro', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffleArray(original);

    expect(original).toEqual(copy);
  });
});
