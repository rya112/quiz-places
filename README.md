# 🌍 IA Quiz Places

Aplicação web interativa de Quiz de Lugares e Monumentos Famosos ao redor do mundo, desenvolvida em **React 18**, **TypeScript**, **Vite** e estilizada com **Vanilla CSS (Glassmorphism)**. O projeto foi totalmente construído utilizando a metodologia **Test-Driven Development (TDD)** com **Vitest** e **React Testing Library**.

---

## 📌 Índice

- [Funcionalidades e Casos de Uso](#-funcionalidades-e-casos-de-uso)
- [Melhorias de Performance e Processamento](#-melhorias-de-performance-e-processamento)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Metodologia TDD](#-metodologia-tdd)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Casos de Uso Detalhados](#-casos-de-uso-detalhados)

---

## 🚀 Melhorias de Performance e Processamento

Foram implementadas diversas técnicas avançadas de otimização de rede, renderização e estado:

1. **Pré-carregamento Assíncrono de Imagens (`imagePreloader`):**
   - A imagem da próxima pergunta é baixada em segundo plano no cache do navegador enquanto o usuário responde a pergunta atual, eliminando a latência de exibição ao clicar em "Próxima Pergunta".
   - `decoding="async"` e `loading="eager"` nas imagens ativas para priorizar a renderização sem bloquear a thread principal.

2. **Otimização de Renderização (React Memoization):**
   - Componentes (`Header`, `WelcomeCard`, `QuizCard`) foram envolvidos em `React.memo` para impedir re-renderizações desnecessárias.
   - Handlers de ação no `App.tsx` foram estabilizados com `useCallback` para manter referências de memória constantes.

3. **In-Memory Caching (`storageService`):**
   - Leitura de estatísticas do `localStorage` otimizada com um cache em memória. Evita parsing repetido de JSON a cada renderização ou ação de clique.

4. **Resource Hints de Rede (`index.html`):**
   - Inclusão de `<link rel="preconnect">` e `<link rel="dns-prefetch">` para os domínios de CDN de imagens (`images.unsplash.com`) e fontes (`fonts.googleapis.com`), reduzindo o tempo de handshake TLS.

5. **Otimização de Bundling & Vendor Splitting (`vite.config.ts`):**
   - Separação de arquivos por *chunks* (`react-vendor` isolado de `8.2kB` da aplicação), permitindo cache HTTP prolongado no navegador e tempo de carregamento inicial ultrarrápido (`< 450ms` de build).

---

## 🎯 Funcionalidades e Casos de Uso

O projeto foi construído atendendo 100% aos requisitos de negócio definidos em `use-cases.txt`:

1. **Página Inicial:** Exibe mensagem de boas-vindas e botão para iniciar o quiz.
2. **Navegação do Quiz:** Transição fluida para a tela do quiz ao clicar no botão.
3. **Card do Quiz:** Pergunta "Qual país é?", exibição de imagem do monumento em alta resolução e seletor com opções de países.
4. **Responder Pergunta:** Permite ao usuário escolher uma opção e submeter a resposta.
5. **Feedback Visual:** Retorna mensagem de "Resposta correta!" ou "Resposta incorreta" com indicação do país correto.
6. **Início no Título:** Botão "Iniciar Quiz" estrategicamente posicionado no cabeçalho ao lado do título.
7. **Contador & Persistência (localStorage):** Exibe placar de acertos e total de perguntas respondidas no topo da página, mantendo o progresso mesmo ao recarregar a página.
8. **Reiniciar Quiz:** Botão ao lado do contador para zerar o placar e reiniciar as estatísticas.
9. **Sair do Quiz:** Botão ao lado do botão de reiniciar para encerrar o quiz e retornar à tela inicial.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/) (com Rollup Chunk Splitting)
- **Testes (TDD):** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + `@testing-library/jest-dom` + `jsdom`
- **Estilização:** Vanilla CSS3 (Glassmorphism, gradientes HSL, CSS Variables, Flexbox/Grid e animações CSS)
- **Fonte:** Google Fonts ([Outfit](https://fonts.google.com/specimen/Outfit))

---

## 📂 Estrutura do Projeto

```text
ia-quiz-places/
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Cabeçalho memoizado com título, ações e placar
│   │   ├── Header.test.tsx       # Testes unitários do Header (UC6, UC7, UC8, UC9)
│   │   ├── QuizCard.tsx          # Card da pergunta com pré-carregador de imagem
│   │   ├── QuizCard.test.tsx     # Testes unitários do QuizCard (UC3, UC4, UC5)
│   │   ├── WelcomeCard.tsx       # Tela inicial memoizada de boas-vindas
│   │   └── WelcomeCard.test.tsx  # Testes unitários do WelcomeCard (UC1)
│   ├── data/
│   │   └── placesData.ts         # Lista de perguntas e fotos de lugares famosos
│   ├── services/
│   │   ├── imagePreloader.ts     # Pré-carregador de imagens em segundo plano
│   │   ├── imagePreloader.test.ts# Testes unitários do preloader
│   │   ├── storageService.ts     # Gerenciador de localStorage com in-memory cache
│   │   └── storageService.test.ts# Testes unitários do storageService (UC7, UC8)
│   ├── test/
│   │   └── setup.ts              # Configuração do ambiente de testes (jest-dom)
│   ├── types/
│   │   └── quiz.ts               # Tipos e interfaces TypeScript
│   ├── App.tsx                   # Componente principal otimizado com useCallback
│   ├── App.test.tsx              # Testes de integração do fluxo completo (UC1 ao UC9)
│   ├── index.css                 # Estilos globais e Design System
│   └── main.tsx                  # Ponto de entrada da aplicação React
├── index.html                    # HTML5 otimizado com resource hints (preconnect)
├── package.json                  # Scripts e dependências do projeto
├── tsconfig.json                 # Configurações do TypeScript
├── use-cases.txt                 # Especificação dos casos de uso originais
└── vite.config.ts                # Configuração do Vite com Rollup Chunk Splitting
```

---

## 🧪 Metodologia TDD

Todas as funcionalidades do projeto foram desenvolvidas seguindo a metodologia **TDD (Test-Driven Development)**:

- **🔴 Red:** Criação dos testes de especificação que inicialmente falhavam.
- **🟢 Green:** Implementação do código mínimo necessário para fazer os testes passarem.
- **🔵 Refactor:** Refatoração do código garantindo tipagem estrita e otimização de performance.

A suíte conta com **25 testes automatizados** aprovados em **6 arquivos de teste**.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

### Instalação

Clone o repositório ou navegue até a pasta do projeto e instale as dependências:

```bash
npm install
```

### Executar em Modo de Desenvolvimento

Inicie o servidor local de desenvolvimento do Vite:

```bash
npm run dev
```

### Executar os Testes (Vitest)

Para rodar todos os testes automatizados uma única vez:

```bash
npm test
```

### Gerar Build de Produção Otimizado

Para gerar a compilação com minificação esbuild e divisão de vendors:

```bash
npm run build
```
