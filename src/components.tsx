import { useEffect, useRef, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowUpRight, Menu, X, Star, ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { navItems, practice } from './content';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import ScrollAnimation from './components/ui/scroll-animation';
import type { Direction } from './components/ui/scroll-animation';

export function Logo({footer = false}: {footer?: boolean}) {
  return <a className={`brand ${footer ? 'brand--footer' : ''}`} href="#inicio" aria-label="Dra. Daniela Gakiya, início">
    <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 5c20 0 27 10 27 19S34 43 14 43V5Z" stroke="currentColor" strokeWidth="1"/><path d="M34 12C14 12 7 19 7 28c0 9 9 15 21 15V26h-9" stroke="currentColor" strokeWidth="1"/><path d="M5 5h15M6 43h18" stroke="currentColor" strokeWidth="1"/></svg>
    <span><span className="brand-name">Dra. Daniela Gakiya</span><span className="brand-specialty">DERMATOLOGIA</span></span>
  </a>;
}
export function Button({children, className='', arrow=true, ...props}: ComponentProps<'a'> & {arrow?: boolean}) {
  return <a className={`button ${className}`} {...props}>{children}{arrow && <ArrowUpRight size={17} aria-hidden="true" />}</a>;
}
export function WhatsAppButton({children='Agende sua consulta', className=''}: {children?: ReactNode; className?: string}) {
  return <Button href={practice.whatsapp} target="_blank" rel="noopener noreferrer" className={className}>{children}</Button>;
}
export function Eyebrow({children, light=false}: {children:ReactNode;light?:boolean}) {
  return <p className={`eyebrow ${light?'eyebrow--light':''}`}><span aria-hidden="true"/>{children}</p>;
}
export function Header() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll=()=>setScrolled(window.scrollY>40);
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus();}};
    const onClick=(e:PointerEvent)=>{if(open&&!header.current?.contains(e.target as Node))setOpen(false);};
    const onResize=()=>{if(window.innerWidth>1120)setOpen(false);};
    window.addEventListener('keydown',onKey);window.addEventListener('pointerdown',onClick);window.addEventListener('resize',onResize);
    return()=>{window.removeEventListener('keydown',onKey);window.removeEventListener('pointerdown',onClick);window.removeEventListener('resize',onResize);};
  },[open]);
  return <header ref={header} className={`site-header ${scrolled?'is-scrolled':''} ${open?'menu-is-open':''}`}>
    <div className="header-inner"><Logo/><nav className="desktop-nav" aria-label="Navegação principal">{navItems.map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <WhatsAppButton className="button--header">Agendar consulta</WhatsAppButton>
      <a className="header-whatsapp" href={practice.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp"><MessageCircle size={21}/></a>
      <button ref={toggle} className="menu-toggle" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Navegação para celular">{navItems.map(([label,id])=><a href={`#${id}`} key={id} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}<WhatsAppButton className="button--olive">Agendar consulta</WhatsAppButton></nav>
    {!reducedMotion&&<motion.div className="scroll-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>}
  </header>;
}
export function Stars() {
  return <span className="stars" aria-label="5 de 5 estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={14} fill="currentColor" aria-hidden="true"/>)}</span>;
}
export function Reveal({children,className='',delay=0,direction='down'}: {children:ReactNode;className?:string;delay?:number;direction?:Direction}) {
  const axis=direction==='left'||direction==='right'?'x':'y';
  const offset=direction==='up'||direction==='left'?-28:28;
  return <ScrollAnimation direction={direction} delay={delay} className={className}
    viewport={{amount:.08,margin:'0px 0px -28px 0px',once:true}}
    variants={{hidden:{opacity:0,filter:'blur(5px)',x:axis==='x'?offset:0,y:axis==='y'?offset:0},visible:{opacity:1,filter:'blur(0px)',x:0,y:0,transition:{duration:.7,ease:[.22,.61,.36,1]}}}}>{children}</ScrollAnimation>;
}
export function Modal({open,onClose,title,children,className=''}:{open:boolean;onClose:()=>void;title:string;children:ReactNode;className?:string}) {
  const ref=useRef<HTMLDialogElement>(null);
  const previous=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const dialog=ref.current;if(!dialog)return;
    if(open){previous.current=document.activeElement as HTMLElement;dialog.showModal();document.body.style.overflow='hidden';}
    else if(dialog.open){dialog.close();document.body.style.overflow='';previous.current?.focus();}
    return()=>{document.body.style.overflow='';};
  },[open]);
  return <dialog ref={ref} className={`modal ${className}`} aria-label={title} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="modal-inner"><button className="modal-close icon-button" onClick={onClose} aria-label="Fechar janela"><X/></button>{children}</div></dialog>;
}
export function Gallery() {
  const [selected,setSelected]=useState<number|null>(null);
  const images=[{src:practice.hero,title:'A beleza da naturalidade',alt:'Modelo com textura natural de pele, em luz suave.'},{src:practice.space,title:'A calma de um espaço de cuidado',alt:'Ambiente ilustrativo claro com cadeira, mesa e um ramo de oliveira.'}];
  const index=selected??0;
  return <><div className="gallery"><div className="gallery-intro"><Eyebrow>Nosso olhar</Eyebrow><h3>O cuidado está<br/>nos <em>detalhes.</em></h3><p>Pele natural. Luz suave. Uma pausa para cuidar de você.</p><span className="image-note">Imagens ilustrativas. Espaço preparado para fotos reais do consultório.</span></div>{images.map((img,i)=><button className={`gallery-image gallery-image--${i}`} key={img.src} onClick={()=>setSelected(i)} aria-label={`Ampliar imagem: ${img.title}`}><img src={img.src} alt={img.alt} loading="lazy" width={i===0?1536:1024} height={i===0?1024:1280}/><span>{img.title}<ArrowUpRight size={20}/></span></button>)}</div>
    <Modal open={selected!==null} onClose={()=>setSelected(null)} title="Galeria de imagens ilustrativas" className="lightbox"><img src={images[index].src} alt={images[index].alt}/><div className="lightbox-caption"><button className="icon-button" aria-label="Imagem anterior" onClick={()=>setSelected((index+1)%2)}><ChevronLeft/></button><div><p>{images[index].title}</p><small>Imagem ilustrativa · {index+1} / 2</small></div><button className="icon-button" aria-label="Próxima imagem" onClick={()=>setSelected((index+1)%2)}><ChevronRight/></button></div></Modal></>;
}
export function Privacy({open,onClose}:{open:boolean;onClose:()=>void}) {
  return <Modal open={open} onClose={onClose} title="Política de privacidade"><div className="privacy-content"><Eyebrow>Transparência</Eyebrow><h2>Política de <em>privacidade.</em></h2><p>Esta versão demonstrativa não possui um serviço de envio de formulários. Os dados preenchidos são usados somente para validar e simular a solicitação no seu navegador; não são enviados ao consultório nem salvos pelo formulário.</p><h3>Contato pelo WhatsApp</h3><p>Ao abrir o WhatsApp, você acessa um serviço externo, sujeito às políticas de privacidade dessa plataforma. Os dados que você decidir compartilhar por esse canal serão usados para tratar seu contato e agendamento.</p><h3>Links e imagens</h3><p>Os links de localização abrem o Google Maps. As imagens ilustrativas e as fontes são hospedadas junto ao site. Esta página não utiliza ferramentas de análise de visitantes nem cookies de publicidade adicionados pela aplicação.</p><h3>Seus dados</h3><p>Evite incluir informações clínicas sensíveis no formulário ou em um primeiro contato. Para esclarecer o tratamento de seus dados ou solicitar acesso, correção ou exclusão dos dados compartilhados com o consultório, entre em contato pelo telefone {practice.phone}.</p><p className="privacy-note">Antes de ativar um envio real, esta política deverá ser revisada conforme os serviços e práticas de atendimento adotados.</p><button className="button button--olive" onClick={onClose}>Entendi<ArrowRight size={17}/></button></div></Modal>;
}
