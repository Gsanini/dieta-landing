# Remodelação da landing page — 24/09/2026

A página segue os 20 blocos do pedido, em ordem. O atributo `data-sales-step` permite localizar cada etapa no HTML:

1. Hero com headline simples e centralizada e compra na primeira tela.
2. Antes e depois em carrossel automático.
3. Entregável.
3.1. Detalhes do entregável.
3.2. Prints de depoimentos, imagens 1–4.
4. Três bônus.
5. Antes e depois novamente.
5.1. Como aplicar o entregável.
5.2. Objetivos de bem-estar.
5.3. Entregável sendo segurado.
5.4. Prints de depoimentos, imagens 5–7.
5.5. Bônus com detalhes.
6. Pacote completo e âncora de preço configurável.
7. Compra.
7.1. Antes e depois.
7.2. Prints de depoimentos, imagens 8–10.
7.3. Compra.
7.4. Objetivos de bem-estar novamente.
7.5. Compra.
8. Perguntas frequentes.

## Mídia e interação

As 11 imagens de `public/images/antes-depois` aparecem nos três carrosséis, com ordens iniciais diferentes. Os 10 prints vêm de `public/images/whatsapp-depoiments`. Os arquivos originais foram preservados; versões WebP estão em `public/images/landing` e o catálogo fica em `src/media-content.ts`.

Os carrosséis se movem continuamente a 38 pixels por segundo enquanto visíveis, sem pausa entre slides. As legendas são “Antes” e “Com o Testo Max”. Uma segunda cópia visual das imagens torna a passagem do fim para o começo imperceptível. As cópias não adicionam paradas de teclado nem conteúdo repetido ao leitor de tela. Passar o mouse pausa imediatamente; retirar o mouse retoma do mesmo ponto. A preferência de movimento reduzido desativa o movimento automático e utiliza a galeria manual sem cópias. Navegação por teclado e gesto de rolagem continuam disponíveis. Prints são navegados manualmente para dar tempo de leitura.

Conforme o ajuste solicitado, foram removidos controles, contagem, instruções e a nota abaixo dos carrosséis de comparação. A ampliação foi removida de todas as imagens. As fotos usam uma área quadrada uniforme com `object-fit: cover` e recorte central; os prints mantêm sua proporção vertical original. Nenhum arquivo de imagem foi alterado para aplicar esse enquadramento.

## Conteúdo comercial

Os quatro CTAs usam `siteConfig.checkoutUrl`. Sem URL, abrem a mensagem de indisponibilidade já existente. O preço riscado, o preço final e a economia dependem de `salesContent.price`; os valores não foram inventados. A âncora só exibe desconto se referência e preço final estiverem preenchidos e a referência for maior.

A headline atual é “O homem que você vê no espelho ainda te dá orgulho?”, com a pergunta final em vermelho e alinhamento centralizado. O CTA é “Quero voltar a me sentir forte”. O objetivo de 1.000 continua nos blocos de benefícios, sem promessas de efeitos garantidos a partir de um número hormonal. Os prints são exibidos como fornecidos, sem acrescentar selos de verificação, nomes, resultados laboratoriais ou relatos inventados.

## Imagem do entregável na mão

Criada com a ferramenta integrada `image_gen`, seguindo a skill `imagegen`. Representação ilustrativa de produto digital, identificada na legenda. Não é um depoimento ou uma captura da interface real.

- Arquivo usado: `public/images/landing/testo-max-in-hand.webp`.
- Original preservado: `C:/Users/55519/.codex/generated_images/01a0d549-91ae-7440-96cf-3df4b10d7cd2/exec-4d295d78-42af-45d3-b76f-cfcb43348b0e.png`.

### Prompt final

Use case: product-mockup. Asset type: editorial product photograph for the "segurando o entregável" section of a Brazilian Protocolo Testo Max landing page. Primary request: realistic close-up of an adult masculine hand naturally holding a modern black smartphone upright, screen angled only slightly and facing camera, showing a digital nutrition guide. No face or person other than hand and forearm. On screen: a premium very minimal charcoal and vermilion red cover, exact large legible condensed white typography "PROTOCOLO", "TESTO", "MAX.", small text "ALIMENTAÇÃO E HÁBITOS", and an editorial photograph of steak, eggs and avocado in the lower half. This is a conceptual product mockup, not a customer testimonial. Scene/backdrop: dark warm charcoal studio, faint blurred wooden table, subtle warm sunlight. Composition: 4:5 portrait, phone fills 70% of height, hand enters from lower right, entire phone and fingers visible, roomy margins. Lighting: cinematic soft natural light, premium authentic material texture and skin, no neon. Palette: charcoal #111110, warm ivory and vermilion red #f04438. Avoid extra fingers, medical numbers or results, health guarantees, review quotes, people faces, decorative UI, charts, watermarks, extraneous words.
