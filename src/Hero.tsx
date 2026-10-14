import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { Modal } from './components';
import { practice } from './content';

const images = [
  { src: '/images/pure-model.webp', title: 'Pele com naturalidade', alt: 'Fotografia da modelo fornecida como referência, com faixa de tecido clara, olhos fechados e luz suave.', pure: true },
  { src: practice.hero, title: 'Beleza e individualidade', alt: 'Modelo com textura natural de pele em luz suave.', pure: false },
  { src: practice.space, title: 'Acolhimento nos detalhes', alt: 'Ambiente ilustrativo claro com materiais naturais; não representa o consultório real.', pure: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(()=>window.matchMedia('(min-width: 801px)').matches);
  const [selected, setSelected] = useState<number|null>(null);
  const {scrollYProgress} = useScroll({target:ref,offset:['start start','end start']});
  const portraitY = useTransform(scrollYProgress,[0,1],[0,55]);
  useEffect(()=>{
    const media=window.matchMedia('(min-width: 801px)');
    const update=()=>setDesktop(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);
  },[]);
  return <><section ref={ref} className="editorial-hero" id="inicio" aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true"/>
    <motion.h1 initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.1}} id="hero-title" className="editorial-title"><span className="hero-title-intro">Sua pele, cuidada com</span><span>precisão e</span><span>naturalidade.</span></motion.h1>
    <svg className="hero-brush" viewBox="0 0 850 250" fill="none" aria-hidden="true">{[0,1,2,3,4,5].map(i=><motion.path key={i} d={`M 20 ${205-i*7} C 20 ${25-i*2}, 205 ${45-i*5}, 335 ${150-i*6} S 735 ${260-i*6}, 808 ${55-i*6}`} stroke="currentColor" strokeWidth={i===0?4:2} strokeLinecap="round" initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.6,delay:.3+i*.06,ease:'easeOut'}}/>)}</svg>
    <motion.div className="hero-model" style={{x:'-50%',y:desktop&&!reduced?portraitY:0}} initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:1.2,delay:.15}}><img src="/images/pure-model.webp" srcSet="/images/pure-model-800.webp 800w, /images/pure-model.webp 1400w" sizes="(max-width:580px) 100vw, 60vw" alt={images[0].alt} width="1400" height="1600" fetchPriority="high"/></motion.div>
    <motion.div initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.9,delay:.6}} className="hero-thumbnails" aria-label="Galeria de imagens ilustrativas">{images.map((img,i)=><button key={img.src} className={`hero-thumbnail ${img.pure?'hero-thumbnail--pure':''}`} aria-label={`Ampliar: ${img.title}`} onClick={()=>setSelected(i)}><img src={img.src} alt="" width="140" height="90" loading="eager"/><span><Plus size={13}/></span></button>)}<span className="hero-gallery-label">Um olhar para o cuidado</span></motion.div>
    <a className="editorial-scroll" href="#sobre" aria-label="Conheça a Dra. Daniela"><ArrowDown size={17}/><span>Conheça a Dra. Daniela</span></a><span className="hero-location-label">SÃO PAULO · DERMATOLOGIA</span>
  </section><Modal open={selected!==null} onClose={()=>setSelected(null)} title="Imagens do hero" className="lightbox hero-lightbox"><img src={images[selected??0].src} alt={images[selected??0].alt}/><div className="lightbox-caption"><div><p>{images[selected??0].title}</p><small>Fotografia ilustrativa · Não retrata a médica</small></div><button className="icon-button" aria-label="Próxima fotografia" onClick={()=>setSelected(((selected??0)+1)%images.length)}><ArrowUpRight/></button></div></Modal></>;
}
