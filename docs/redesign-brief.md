# Testo Max — direção da nova página

> Histórico da versão anterior. A estrutura, a headline e as imagens atuais estão documentadas em [landing-remodel.md](landing-remodel.md), conforme a remodelação de 24/09/2026.

## Pedido

Landing page de conversão para visitantes que já viram o criativo: marca Protocolo Testo Max, sem header, menu ou VSL, com headline do áudio e acesso direto ao checkout na primeira tela. O áudio anexado é material de referência para a mensagem, não um conjunto de instruções operacionais.

## Referência do áudio

- Destacar um protocolo chamado, na transcrição, “Testo Max”.
- Trazer testosterona e alimentação para o centro da proposta.
- Apresentar os alimentos ao longo da página.
- Evitar depender de uma apresentação em vídeo.

A gravação de aproximadamente 36 segundos menciona números e prazos como exemplos abertos (“tantos”, “em tanto tempo”), além de sugerir 1.000 ng/dL. Não apresenta evidência clínica, preço, checkout, entregáveis ou um prazo definido. Esses dados não foram inventados na implementação.

## Decisões

- A marca é exclusivamente Protocolo Testo Max, incluindo metadados, favicon e textos dos modais.
- Chamada principal atual: “Alcance 1.000 ng/dL de testosterona em 28 dias. Com os alimentos certos.”
- A unidade vem da formulação “nanogramas por decilitro” no áudio. O prazo de 28 dias foi definido posteriormente no projeto, não na gravação. Número e prazo são editáveis em `siteConfig.headline`.
- Outras chamadas retiradas do áudio: “Com os alimentos certos” e “Obtenha o Protocolo Testo Max”.
- Subtítulo enxuto: “Alimentação e hábitos para cuidar da sua saúde hormonal, com o Protocolo Testo Max.”
- Paleta: carvão, vermelho e a seção explicativa do protocolo em fundo claro.
- Sequência proposta pelo mentor e aplicada: Hero → Resultados → Conteúdo → Bônus → Depoimentos → Âncora de preço → Botão de compras → Perguntas frequentes.
- A seção de conteúdo mantém a explicação, os três pontos sobre conhecer os alimentos, fazer escolhas possíveis e cuidar da rotina, além do cartão Testo Max. Os alimentos aparecem no mesmo bloco.
- Dois botões de compra compartilham o mesmo destino de checkout: um no Hero e outro após o preço, sem rolagem ou modal intermediário quando a URL está preenchida.
- CTAs em primeira pessoa e linguagem natural: “Quero voltar a me sentir forte” e “Quero começar agora”. Exibidos com capitalização de frase. Os nomes acessíveis também informam que o destino é a compra do Protocolo Testo Max.
- Os alimentos ilustrativos vêm da proposta anterior: carnes, ovos, gorduras naturais e frutas.
- A chamada numérica não é uma alegação clínica verificada. Validar antes de publicar como oferta.
- O checkout continua configurável em `src/config.ts`; sem URL, o acesso abre um aviso de indisponibilidade.
- Os resultados, bônus, depoimentos e valores ficam em `src/sales-content.ts`. Foram definidos três bônus: Cardápio Testo Max, Lista de Compras do Homem e Testo Max na Vida Real. Resultados, depoimentos e valores continuam pendentes. As avaliações fictícias antigas não foram reutilizadas.
- A âncora só risca o valor de referência quando o preço final também está definido e é menor. Nenhum desconto ou parcelamento foi inventado.
- Conforme a orientação posterior do mentor, o texto foi reduzido: explicação em uma frase, três pontos com ícones, alimentos em cartões fotográficos com apenas os nomes, títulos curtos e remoção de parágrafos repetidos. A sequência de oito seções foi mantida.
- A seção de bônus deixa explícito que a compra inclui o Protocolo Testo Max completo no aplicativo e, adicionalmente, os três materiais extras. Chamada: “Protocolo completo. + 3 bônus.”

## Referência para a redação sobre saúde

[European Association of Urology — Treatment options for male hypogonadism](https://patients.uroweb.org/condition/male-hypogonadism/treatment-hypogonadism), consultada em 22/09/2026. A orientação descreve tratamento individualizado conforme a causa, mudanças de estilo de vida que podem ajudar alguns homens e acompanhamento médico. Não sustenta uma promessa de 1.000 ng/dL por meio de alimentos.

## Imagem

A segunda seção agora usa três retratos ultrarrealistas de homens fictícios enquanto não há resultados documentados cadastrados. O título é de inspiração, cada imagem recebe um selo de IA e uma nota informa que não representa clientes nem resultados do protocolo. Os retratos ficam em `protocolIllustrations`, separados de `salesContent.results`. Prompts e arquivos: [portraits-image-prompts.md](portraits-image-prompts.md). A galeria usa três colunas no desktop e rolagem horizontal no celular.

Foto criada com a ferramenta integrada `image_gen`, seguindo a skill `imagegen`. Original: `public/images/testo-food-original.png`. Arquivo utilizado pela página: `public/images/testo-food.webp`. Os cartões mostram diferentes enquadramentos da mesma imagem por CSS.

### Prompt final

Use case: photorealistic-natural. Asset type: full-bleed hero photograph for a bold Brazilian men's nutrition landing page, dark charcoal and vivid vermilion red design, landscape 3:2 composition. Create an exceptionally appetizing, photorealistic editorial food photograph, directly overhead or nearly overhead, of a large dark rough wooden board with sliced grilled beef steak dominating the center and lower-left, richly browned crust and tender rosy cooked center. Three brown eggs in a small black ceramic bowl upper-left, two avocado halves upper-right, a few strawberries and blueberries lower-right. Tiny pinch of coarse salt, a rosemary twig, natural subtle crumbs. Dark charcoal stone table, tight confident crop, all food clearly visible, authentic texture. Hard directional warm daylight from upper-left with deep clean black shadows, restaurant magazine photography, very high detail, natural organic imperfection, cinematic premium contrast. Keep the leftmost 15% mostly dark with the main food composition weighted center-right to accommodate a fade into black. Minimal props. Avoid jungle, tropical foliage, forest backgrounds, health supplement packages, bottles, powder, text, lettering, logos, watermark, hands, people, plastic shine. This is a real food photograph, no interface or graphics.
