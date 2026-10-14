# Verificação da versão

- TypeScript estrito: aprovado.
- Build de produção com Vite: aprovado.
- Layout inspecionado no navegador em desktop e celular. Dimensões verificadas: 1440, 1024, 768, 390 e 320 CSS px. Na revisão de 320 px, foi removida uma largura mínima que causava rolagem horizontal com a barra vertical presente; a largura final do documento corresponde à área disponível.
- Menu mobile: abertura, fechamento por Escape e navegação para uma seção verificados.
- Formulário: campos obrigatórios, telefone inválido, e-mail inválido, preservação de entradas, foco no primeiro erro, consentimento, bloqueio durante envio e sucesso demonstrativo verificados. Envio por teclado testado.
- Privacidade: abertura, fechamento por Escape e retorno do foco verificados.
- Galeria: abertura, troca de imagem, fechamento por Escape e retorno do foco verificados.
- WhatsApp: destino conferido conforme o briefing. Nenhuma mensagem foi enviada durante a verificação.
- Responsividade do agendamento: formulário em uma coluna e botão de WhatsApp no cabeçalho em telas pequenas.
- `prefers-reduced-motion`: implementado no componente Motion e nas regras CSS. Não foi realizado teste com leitor de tela nem auditoria completa de acessibilidade.

O formulário continua local e demonstrativo. O retrato real da médica e as fotografias reais do consultório ainda devem ser fornecidos para substituir as áreas reservadas e imagens ilustrativas.
