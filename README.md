# Dra. Daniela Gakiya · Dermatologia

Site institucional em português do Brasil, implementado com React, TypeScript, Vite, Tailwind CSS 4 e Motion. O CSS está organizado em módulos de tokens, base, componentes, seções e responsividade, com estrutura compatível com shadcn/ui.

## Desenvolvimento

Requer Node.js 22.12 ou superior e pnpm.

```sh
pnpm install
pnpm dev
```

Para gerar a versão de produção: `pnpm build`. Para revisar o build localmente: `pnpm preview`.

O ZIP inclui `dist/` já compilado. Para abrir essa versão sem instalar dependências, use `node serve-preview.mjs` e acesse `http://127.0.0.1:4173/`.

## Conteúdo e fotos

As informações de contato, imagens e textos recorrentes ficam em `src/content.ts`. Para inserir o retrato real da médica, coloque a fotografia em `public/images/` e configure `practice.portrait`. Substitua também `practice.hero` e `practice.space` por fotografias autorizadas, atualizando os textos alternativos, srcset e os avisos de imagem ilustrativa.

O hero utiliza a fotografia da modelo da referência Pure enviada pelo usuário. O recorte foi preparado com ImageGen para remover a interface de referência e usar os textos da Dra. Daniela. As outras duas fotografias demonstrativas foram criadas com ImageGen e otimizadas em WebP. Elas não retratam a Dra. Daniela nem o seu consultório. Os prompts completos estão em `ASSETS.md`.

## Agendamento

Os links do WhatsApp e do Google Maps funcionam como links externos. O formulário valida os campos, apresenta erros acessíveis, exibe o estado de envio e simula o sucesso localmente. Ele não envia, armazena ou reserva nada. A demonstração informa esse comportamento antes e depois do envio.

Para receber solicitações pelo formulário, será necessário conectar um serviço de backend, definir o tratamento de dados e revisar a política de privacidade antes da ativação.

## Interações

- Header sólido ao rolar; menu acessível no celular com fechamento por Escape e clique externo.
- Navegação por âncoras, foco visível e link para pular ao conteúdo.
- Entradas ao rolar usando o componente solicitado, desfoque suave, direções e atrasos configuráveis, com `prefers-reduced-motion`.
- Hero com tipografia em camadas, traço orgânico animado, entrada da fotografia e paralaxe discreta no desktop.
- Indicador de leitura no cabeçalho e miniaturas interativas no hero.
- Galeria com ampliação, navegação, fechamento por Escape e retorno do foco.
- Política de privacidade em diálogo acessível.

Nenhum CRM, RQE, procedimento adicional, tecnologia, certificação ou resultado clínico foi criado. A nota, o número de avaliações e os três depoimentos são os fornecidos no briefing.

## Estrutura shadcn e animação

`components.json` define o caminho de componentes em `src/components/ui`, acessível pelo alias `@/components/ui`. Essa pasta centraliza os componentes reutilizáveis e é o destino padrão de comandos futuros do shadcn CLI. Os estilos globais ficam em `src/styles.css`; os tokens shadcn são definidos em `src/styles/shadcn.css`. O utilitário `cn` fica em `src/lib/utils.ts`.

O componente pedido está em `src/components/ui/scroll-animation.tsx`, e a demonstração fornecida está em `scroll-animation-demo.tsx`. A demonstração técnica não aparece na página institucional. O wrapper `Reveal` aplica entradas mais curtas e um viewport adequado ao celular, com animação única por seção. Não é necessário um provider de estado.

As dependências e os aliases já estão configurados. Para adicionar um componente no futuro: `pnpm dlx shadcn@latest add nome-do-componente`. Para conferir a configuração: `pnpm dlx shadcn@latest info --json`.
