# Imagens do hero Testo Max

Ferramenta de criação dos recortes: `image_gen`, modo integrado (não CLI).

## Composição final

- MacBook: `public/images/landing/testo-max-hero-macbook.webp` (1460 × 954).
- iPhone: `public/images/landing/testo-max-hero-iphone.webp` (640 × 1284).
- Os PNGs originais de cada recorte estão na mesma pasta.
- Os aparelhos têm fundo transparente e são posicionados e recebem sombras separadamente pelo CSS.
- Após a orientação de usar as mesmas imagens de “O protocolo completo”, as telas geradas dos recortes foram cobertas no componente por imagens originais do aplicativo.
- MacBook: uma única versão horizontal da tela Início, recomposta para desktop a partir da mesma identidade e dos mesmos módulos. iPhone: Alimentação.
- As duas seções usam `src/app-screens.ts`. Os arquivos `public/images/imgs-app/testo-max-*.webp` são conversões lossless dos quatro PNGs fornecidos, sem alteração dos pixels das telas.

## Referência dos recortes

`public/images/landing/testo-max-app-hero.png`

## Prompt final — MacBook

Use case: background-extraction.
Asset type: separate transparent MacBook product image for the Testo Max website hero.
Input image 1: edit target and reference for the exact MacBook hardware and Testo Max dashboard.
Primary request: recreate ONLY the open MacBook Pro from the supplied photo as a complete, polished, photorealistic isolated product cutout. Remove the phone, room, desk, plants, books, cups and ALL background objects. Reconstruct any hidden laptop edges cleanly.
Scene/backdrop: genuinely transparent background with alpha, including the area below and around the device. No solid background, no checkerboard baked into the pixels, no floor, no scene.
Subject: one open dark space-gray MacBook, full screen, keyboard, trackpad and entire thin front edge visible. Near-front view as in the reference, slightly from above so the keyboard is visible, balanced upright display and natural product perspective. Horizontally centered landscape composition, full device in frame, tight useful framing with approximately 4% empty margin on each side.
Screen: preserve the reference Testo Max dark app dashboard and its layout as faithfully as possible: TESTO MAX white/red wordmark at top left, mountain sunrise banner with male portrait, daily habits on the left, daily progress red ring and meal cards below, grocery card on the right. Clear crisp small Portuguese interface, dark charcoal and vivid red accents.
Lighting: premium soft studio key light from upper left, restrained warm highlights on metal edges, subtle red rim reflection. Realistic black glass, premium metal, dimensional but not exaggerated.
Constraints: ONLY ONE LAPTOP. No phone, no unrelated props, no backdrop, no external text, no captions, no invented watermarks. Keep the complete device unclipped and do not warp the display. No external cast shadow; website CSS will add the shadow. Output a high quality landscape PNG cutout with real transparency.

## Prompt final — iPhone

Use case: background-extraction.
Asset type: separate transparent iPhone product image for the Testo Max website hero.
Input image 1: edit target and reference for the iPhone hardware and Testo Max nutrition app screen.
Primary request: recreate ONLY the iPhone from the supplied photo as a complete, polished, photorealistic isolated product cutout. Remove laptop, room, desk, plants, books, cups and ALL background objects.
Scene/backdrop: genuinely transparent background with alpha, including all space around the phone. No solid backdrop, no checkerboard baked into pixels, no floor, no scene.
Subject: ONE upright modern dark titanium iPhone, complete phone in portrait orientation, full screen facing the viewer almost straight-on with a slight three-quarter perspective so its thin right metal edge is visible. Keep it vertically upright; CSS will tilt it later. Rounded black bezel, Dynamic Island, realistic premium hardware, no bent geometry.
Screen: closely preserve the nutrition screen from the supplied photo, dark charcoal interface with vivid red accent. Top title "Alimentação" and food photo, "MACROS DO DIA" with a red circular calorie graph, "PLANO DO DIA" below with meal photos and rows for "Café da manhã", "Almoço", "Lanche da tarde", "Jantar", bottom navigation with Alimentação highlighted red. Sharp readable Portuguese UI, detailed appetizing small food photos.
Composition: single phone centered, entire device visible with approximately 5% transparent space above and below, tightly framed portrait asset, natural tall iPhone proportions.
Lighting: premium soft studio key light from upper left, restrained warm highlights on the metal edge, subtle red rim reflection. Glossy realistic black glass with no glare obscuring screen.
Constraints: ONLY ONE PHONE. No MacBook, no laptop, no unrelated props, no backdrop, no extra text outside the device, no caption, no watermarks. Preserve screen layout and red/dark palette. No external cast shadow; website CSS will add the shadow. Output high quality portrait PNG with real transparency.

## Prompt final — tela horizontal do MacBook

Use case: ui-mockup.
Asset type: wide landscape application screen displayed inside the MacBook in a landing-page hero.
Input image 1: the exact Testo Max “Início” app screen used in the section “O protocolo completo”; this is the sole source of truth for visual identity, content, cards, typography, imagery, icons, colors, and wording.
Primary request: adapt this one portrait dashboard into one coherent native desktop dashboard in a wide 16:9 landscape canvas. Reflow the same interface responsively; do not place multiple phone screenshots side by side and do not repeat the app.
Composition/framing: fill the full 16:9 screen edge to edge. Keep the top hero/header spanning the full width, with TESTO MAX at upper left, the same mountain sunrise and male athlete, and the same supporting text. Arrange the dashboard modules below in a desktop grid: “PROTOCOLO DE HOJE” wide at left, the habits/results image card at right, then “PLANO ALIMENTAR”, “PROGRESSO DIÁRIO”, “LISTA DE MERCADO”, and “SEQUÊNCIA” as coordinated panels. Keep a single bottom navigation bar spanning the width.
Style/medium: high-fidelity production UI screenshot, dark charcoal/black glass surfaces, subtle borders, white type, vivid Testo Max red, same photographic imagery and visual system as the reference.
Constraints: one continuous landscape app screen only. No phone frame, no laptop frame, no browser chrome, no mockup scene, no transparent area, no external shadow, no watermark. Do not create separate duplicated screens. Do not stretch the original portrait screenshot. Recompose its modules naturally for desktop while preserving the same content and visual identity.
