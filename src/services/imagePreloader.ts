const preloadedSet = new Set<string>();

/**
 * Pré-carrega uma imagem no cache do navegador.
 * Evita recarregar imagens já presentes no Set em memória.
 */
export const preloadImage = (url: string): Promise<void> => {
  if (!url || preloadedSet.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      preloadedSet.add(url);
      resolve();
    };
    img.onerror = () => {
      // Resolve mesmo em erro para não travar o fluxo
      resolve();
    };
    img.src = url;
  });
};

/**
 * Pré-carrega uma lista de URLs de imagens em segundo plano.
 */
export const preloadNextImages = (urls: string[]): void => {
  urls.forEach((url) => {
    preloadImage(url);
  });
};
