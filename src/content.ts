export const practice = {
  name: 'Dra. Daniela Gakiya',
  phone: '(18) 99776-6068',
  whatsapp: 'https://wa.me/5518997766068',
  maps: 'https://www.google.com/maps/search/?api=1&query=R.%20Maria%20Figueiredo%2C%20202%2C%20S%C3%A3o%20Paulo%20SP%2004002-001',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=R.%20Maria%20Figueiredo%2C%20202%2C%20S%C3%A3o%20Paulo%20SP%2004002-001',
  // Substitua pelo caminho da fotografia real, por exemplo: '/images/dra-daniela.webp'.
  portrait: null as string | null,
  // Imagens ilustrativas geradas para esta demonstração. Não retratam o consultório real.
  hero: '/images/naturalidade.webp',
  space: '/images/acolhimento.webp',
};
export const navItems = [
  ['Sobre', 'sobre'], ['Tratamentos', 'tratamentos'], ['Abordagem', 'abordagem'],
  ['Avaliações', 'avaliacoes'], ['Contato', 'contato'],
] as const;
export const careAreas = [
  { title: 'Dermatologia clínica', text: 'Avaliação e acompanhamento das necessidades de saúde da pele.', icon: 'clinical' },
  { title: 'Dermatologia estética', text: 'Planejamento individualizado para melhorar a aparência da pele com naturalidade.', icon: 'aesthetic' },
  { title: 'Saúde e prevenção da pele', text: 'Orientações personalizadas para manter uma rotina de cuidado adequada.', icon: 'prevention' },
  { title: 'Avaliação personalizada', text: 'Consulta médica para compreender queixas, objetivos e possibilidades de tratamento.', icon: 'personal' },
] as const;
export const steps = [
  { title: 'Escuta', text: 'Compreensão das queixas, rotina e objetivos da paciente.' },
  { title: 'Avaliação', text: 'Análise médica individualizada das condições e características da pele.' },
  { title: 'Plano de cuidado', text: 'Orientações e possibilidades de tratamento adequadas ao caso.' },
  { title: 'Acompanhamento', text: 'Revisão da evolução e ajustes quando necessários.' },
];
export const testimonials = [
  'Sempre tive ótimas experiências e resultados muito naturais.',
  'Muito profissional, uma pessoa admirável!',
  'Fiz um procedimento com a Dra. de preenchimento e simplesmente amei.',
];
