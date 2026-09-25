# Protocolo Testo Max

Landing page em Vite, React e TypeScript, com preto e vermelho, headline centralizada e fluxo completo de apresentação, prova, entregáveis, bônus, oferta e compra.

## Rodar

```bash
npm install
npm run dev
```

## Estrutura

A página segue a sequência solicitada, incluindo todas as repetições:

- Hero → antes/depois → entregável → detalhes → depoimentos → bônus.
- Antes/depois → detalhes → benefícios → entregável na mão → depoimentos → bônus detalhados.
- Âncora de preço → compra → antes/depois → depoimentos → compra → benefícios → compra → FAQ.

O mapa completo das 20 etapas, as decisões e o prompt da imagem estão em [docs/landing-remodel.md](docs/landing-remodel.md).

## Configurar a venda

Em `src/config.ts`, preencha `checkoutUrl` com o endereço HTTPS do checkout. Os quatro botões compartilham esse destino, na mesma aba. Sem URL, exibem um aviso de indisponibilidade.

Em `src/sales-content.ts`, preencha os valores confirmados de `price`:

```ts
price: {
  reference: null, // Preço de referência, em reais.
  current: null,   // Preço final, em reais.
  paymentTerms: "",
}
```

O preço riscado e a economia aparecem apenas quando ambos os preços estão definidos e a referência é maior que o valor final. Sem preço configurado, o pacote é apresentado sem valores inventados. Os três bônus também são editáveis em `sales-content.ts`.

## Imagens e carrosséis

- Originais de antes/depois: `public/images/antes-depois` — 11 imagens.
- Originais dos prints: `public/images/whatsapp-depoiments` — 10 imagens.
- Versões WebP usadas na página: `public/images/landing`.
- Catálogo de imagens, descrições e dimensões: `src/media-content.ts`.
- Imagem ilustrativa do entregável sendo segurado: `public/images/landing/testo-max-in-hand.webp`.

Os três carrosséis de comparação usam todas as 11 imagens, começando em posições diferentes, com as legendas “Antes” e “Com o Testo Max”. A faixa se move continuamente a 38 pixels por segundo, sem intervalos entre slides. Uma cópia visual da sequência permite repetir o ciclo sem saltos. Passar o mouse pausa o movimento; retirar o mouse retoma do mesmo ponto. A interface não exibe controles, contagem nem instruções abaixo das imagens. Navegação por teclado, gesto de rolagem e suporte a movimento reduzido continuam disponíveis. Modais abertos e aba oculta também suspendem a animação.

As fotos de comparação preenchem cards quadrados de tamanho uniforme, com recorte central e sem distorção. Os prints são distribuídos entre os três blocos de depoimentos, mantêm a proporção vertical e não avançam automaticamente. Não há ampliação ou ação ao clicar nas imagens. Os arquivos fornecidos foram preservados.

## Arquivos principais

- `src/App.tsx`: ordem das seções, hero, CTAs, FAQ, rodapé e modais.
- `src/SalesSections.tsx`: entregável, detalhes, provas, benefícios, bônus e preço.
- `src/ImageCarousel.tsx`: navegação, reprodução automática e acessibilidade.
- `src/styles.css`: estilos e responsividade.
- `src/config.ts`: checkout, imagem de alimentos e objetivo citado nos blocos de benefícios.
- `src/media-content.ts`: mídia utilizada.
- `src/sales-content.ts`: bônus e condições comerciais.

## Build

```bash
npm run build
npm run preview
```

Publique a pasta `dist` em uma hospedagem estática. Não requer backend.

A interface inclui FAQ nativa, navegação por teclado, link para pular ao conteúdo, restauração de foco após fechar os modais e suporte a movimento reduzido. As fontes são carregadas pelo Google Fonts, com fallback do sistema.
