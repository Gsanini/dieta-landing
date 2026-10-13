# Protocolo Testo Max

Landing page em Vite, React e TypeScript, com preto e vermelho, headline centralizada e fluxo completo de apresentação, prova, entregáveis, bônus, oferta e compra.

## Rodar

```bash
npm install
npm run dev
```

## Estrutura

A página segue: hero → resultados → protocolo no aplicativo → depoimentos → bônus → mais resultados → benefícios → preço → compra → resultados finais → FAQ.

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

- Originais das comparações: `public/images/antes-depois` — 17 imagens (11 anteriores e 6 novas).
- Originais dos prints: `public/images/whatsapp-depoiments` — 10 imagens.
- Versões WebP das 11 imagens iniciais: `public/images/landing`; as seis imagens novas usam os JPGs originais.
- Catálogo de imagens, descrições e dimensões: `src/media-content.ts`.
- Imagem ilustrativa do entregável sendo segurado: `public/images/landing/testo-max-in-hand.webp`.

O primeiro carrossel usa oito imagens. O segundo, após os bônus, usa três. O terceiro fica entre a última chamada de compra e o FAQ, reunindo as seis imagens retiradas dos dois anteriores. Não há repetição entre eles. Todos usam as legendas “Antes” e “Com o Testo Max”. As faixas se movem continuamente a 38 pixels por segundo, sem intervalos entre slides. Uma cópia visual da sequência permite repetir o ciclo sem saltos. Passar o mouse pausa o movimento; retirar o mouse retoma do mesmo ponto. A interface não exibe controles, contagem nem instruções abaixo das imagens. Navegação por teclado, gesto de rolagem e suporte a movimento reduzido continuam disponíveis. Modais abertos e aba oculta também suspendem a animação.

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

O controle de acesso após a compra usa um projeto Supabase separado. Os arquivos
da Edge Function, da migração SQL e as instruções de implantação estão em
[`docs/cakto-supabase.md`](docs/cakto-supabase.md).

A interface inclui FAQ nativa, navegação por teclado, link para pular ao conteúdo, restauração de foco após fechar os modais e suporte a movimento reduzido. As fontes são carregadas pelo Google Fonts, com fallback do sistema.
