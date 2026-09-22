# Dieta da Selva

Landing page responsiva em **Vite + React + TypeScript + Tailwind CSS**, voltada a maridos e pais que querem cuidar de si e estar presentes para a família. A página conecta a pergunta “se sua família precisasse de você hoje, seu corpo acompanharia?” aos sinais da rotina, à motivação familiar e à proposta de voltar à comida de verdade.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

## Conectar a VSL e a compra

Edite `src/config.ts`:

```ts
export const siteConfig = {
  videoUrl: 'https://www.youtube.com/watch?v=SEU_VIDEO_ID',
  checkoutUrl: 'https://sua-plataforma.com/seu-checkout',
  poster: '/images/selva-poster.webp',
}
```

- **Vídeo:** aceita links HTTPS do YouTube, Vimeo (inclusive vídeos não listados com hash) ou arquivo direto `.mp4`, `.webm` ou `.ogg`. O player é carregado apenas após o clique. URLs vazias ou não reconhecidas exibem a apresentação de pré-lançamento.
- **Compra:** quando o link estiver preenchido, a chamada final “Quero conhecer a Dieta da Selva” direciona para ele. Sem link, abre o aviso de lançamento em breve.
- **Capa:** substitua `public/images/selva-poster.webp` para trocar a foto do vídeo e do bloco de convite.
- **Textos, perguntas e modais:** em `src/App.tsx`.
- **Layout, cores, tipografia e responsividade:** classes Tailwind nos componentes `src/App.tsx` e `src/Reviews.tsx`; o tema global fica em `src/styles.css`.
- **Título e metadados:** em `index.html`.

O molde inclui três avaliações fictícias identificadas como ilustrativas, com avatares gerados por IA. Não contém preços ou resultados de saúde inventados, nem coleta dados. Os links do rodapé abrem textos informativos da versão atual; atualize-os conforme a operação real, plataforma de compra e ferramentas de análise antes de publicar. As fontes são carregadas via Google Fonts, com fontes de sistema como fallback.

## Avaliações

- Edite nomes, notas e comentários em `src/review-data.ts`.
- Os avatares otimizados estão em `public/images/avatars/`.
- Componente e estilos Tailwind: `src/Reviews.tsx`.
- As avaliações são exemplos fictícios, não compradores verificados. Para publicar relatos reais, substitua o conteúdo e as fotos com autorização dos autores e atualize os rótulos de demonstração em `src/Reviews.tsx`.
- Os prompts usados na geração integrada de imagens estão em `docs/avatar-prompts.md`.

## Publicação

```bash
npm run build
npm run preview
```

Publique a pasta `dist` em qualquer hospedagem estática, como Vercel, Netlify ou Cloudflare Pages. Não requer backend.

## Imagem

A capa foi gerada com a ferramenta integrada de geração de imagens, usando a skill `imagegen`. O arquivo otimizado está em `public/images/selva-poster.webp`; o original está em `public/images/selva-poster.png`. Prompt e origem: `docs/image-prompt.md`.
