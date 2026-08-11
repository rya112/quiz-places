Projeto criado com assistente de IA seguindos passos, melhorias e boas práticas.  

# 🌍 Quiz Places

Aplicação web interativa de Quiz de Lugares e Monumentos Famosos ao redor do mundo, desenvolvida em **React 18**, **TypeScript**, **Vite** e estilizada com **Vanilla CSS (Glassmorphism)**. O projeto foi totalmente construído utilizando a metodologia **Test-Driven Development (TDD)** com **Vitest** e **React Testing Library**.

---

## 📌 Índice

- [Funcionalidades e Casos de Uso](#-funcionalidades-e-casos-de-uso)
- [Pipeline de CI/CD e Deploy (Vercel)](#-pipeline-de-cicd-e-deploy-vercel)
- [Melhorias de Performance e Processamento](#-melhorias-de-performance-e-processamento)
- [Linter e Qualidade de Código (ESLint)](#-linter-e-qualidade-de-código-eslint)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Metodologia TDD](#-metodologia-tdd)
- [Como Executar o Projeto](#-como-executar-o-projeto)

---

## ⚙️ Pipeline de CI/CD e Deploy (Vercel)

O projeto possui uma esteira automatizada de Integração e Entrega Contínua via **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) contemplando rigorosamente as 6 etapas de deploy:

1. **Checkout & Setup:** Clonagem do repositório e preparação do ambiente Node.js (v20).
2. **Validação de Código:** Execução do ESLint (`npm run lint`) e checagem de tipos estáticos (`npx tsc --noEmit`).
3. **Execução de Testes:** Suíte de 29 testes automatizados (`npm test`).
4. **Verificação de Vulnerabilidades:** Análise de segurança de pacotes com `npm audit --audit-level=high`.
5. **Build de Produção:** Compilação do bundle de produção com Vite (`npm run build`).
6. **Deploy Automático na Vercel:** Publicação automática no ambiente de produção Vercel em cada push para a branch `main`.

---

## 🚀 Melhorias de Performance e Processamento

1. **Pré-carregamento Assíncrono de Imagens (`imagePreloader`):** Baixa a imagem da próxima pergunta em segundo plano.
2. **Otimização de Renderização (React Memoization):** Uso de `React.memo` nos componentes e `useCallback` nos handlers.
3. **In-Memory Caching (`storageService`):** Cache em memória para evitar releitura contínua do `localStorage`.
4. **Resource Hints de Rede (`index.html`):** `<link rel="preconnect">` para CDN de imagens e fontes.
5. **Vendor Splitting (`vite.config.ts`):** Divisão de chunks (`react-vendor` isolado de `8.2kB` da aplicação).

---

## 🛡️ Linter e Qualidade de Código (ESLint)

O repositório possui **ESLint v9** configurado (`eslint.config.js`) com regras estritas para análise estática:

```bash
npm run lint
```

---

## 🎯 Funcionalidades e Casos de Uso

1. **Página Inicial:** Exibe mensagem de boas-vindas e botão para iniciar o quiz.
2. **Navegação do Quiz:** Transição fluida para a tela do quiz ao clicar no botão.
3. **Card do Quiz:** Pergunta "Qual país é?", exibição de imagem do monumento e seletor de países.
4. **Responder Pergunta:** Permite ao usuário escolher uma opção e submeter a resposta.
5. **Feedback Visual:** Retorna mensagem de resposta correta ou incorreta com gabarito.
6. **Início no Título:** Cabeçalho limpo com título da aplicação e placar interativo.
7. **Contador & Persistência (localStorage):** Exibe placar de acertos e total de perguntas respondidas.
8. **Reiniciar Quiz:** Botão para zerar o placar e reiniciar as estatísticas.
9. **Sair do Quiz:** Botão para encerrar o quiz, zerar o placar e retornar à tela inicial.

---

## 🚀 Como Executar o Projeto

```bash
# Instalação
npm install

# Modo de desenvolvimento
npm run dev

# Suíte de testes automatizados
npm test

# Linter e qualidade de código
npm run lint

# Build de produção otimizado
npm run build
```
