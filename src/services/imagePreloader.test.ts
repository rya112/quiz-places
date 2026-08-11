import { describe, it, expect } from 'vitest';
import { preloadImage, preloadNextImages } from './imagePreloader';

describe('imagePreloader', () => {
  it('deve chamar a criação de Image e resolver promise', async () => {
    // Simular o evento onload no ambiente JSDOM
    const originalImage = window.Image;
    window.Image = class extends originalImage {
      constructor() {
        super();
        setTimeout(() => {
          if (this.onload) this.onload(new Event('load'));
        }, 10);
      }
    };

    const url = 'https://images.unsplash.com/photo-test.jpg';
    await expect(preloadImage(url)).resolves.toBeUndefined();

    window.Image = originalImage;
  });

  it('deve pré-carregar uma lista de URLs de imagens sem lançar erros', () => {
    const urls = [
      'https://images.unsplash.com/photo-1.jpg',
      'https://images.unsplash.com/photo-2.jpg',
    ];
    expect(() => preloadNextImages(urls)).not.toThrow();
  });
});
