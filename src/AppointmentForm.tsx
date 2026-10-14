import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { WhatsAppButton } from './components';

type Fields = {name:string;phone:string;email:string;reason:string;date:string;time:string;message:string;consent:boolean};
type Errors = Partial<Record<keyof Fields,string>>;
const initial:Fields={name:'',phone:'',email:'',reason:'',date:'',time:'',message:'',consent:false};
export default function AppointmentForm({onPrivacy}:{onPrivacy:()=>void}) {
  const [fields,setFields]=useState(initial);
  const [errors,setErrors]=useState<Errors>({});
  const [status,setStatus]=useState<'idle'|'sending'|'success'>('idle');
  const form=useRef<HTMLFormElement>(null);
  const today=new Date(); const minDate=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  function validate(key:keyof Fields):string|undefined {
    if(key==='name'&&fields.name.trim().length<2)return 'Informe seu nome, com pelo menos 2 caracteres.';
    if(key==='phone'&&!/^\d{10,11}$/.test(fields.phone.replace(/\D/g,'')))return 'Informe um telefone com DDD e 10 ou 11 dígitos.';
    if(key==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))return 'Informe um e-mail válido.';
    if(key==='reason'&&!fields.reason)return 'Selecione o motivo do contato.';
    if(key==='date'&&fields.date&&fields.date<minDate)return 'Selecione hoje ou uma data futura.';
    if(key==='consent'&&!fields.consent)return 'Seu consentimento é necessário para solicitar contato.';
  }
  function update(e:ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
    const key=e.target.name as keyof Fields;
    const value=e.target instanceof HTMLInputElement&&e.target.type==='checkbox'?e.target.checked:e.target.value;
    setFields(prev=>({...prev,[key]:value}));
    if(errors[key])setErrors(prev=>({...prev,[key]:undefined}));
  }
  function blur(key:keyof Fields) {setErrors(prev=>({...prev,[key]:validate(key)}));}
  async function submit(e:FormEvent) {
    e.preventDefault();if(status==='sending')return;
    const next:Errors={};(Object.keys(fields) as (keyof Fields)[]).forEach(key=>{const error=validate(key);if(error)next[key]=error;});
    setErrors(next);
    if(Object.keys(next).length){const first=Object.keys(next)[0];(form.current?.elements.namedItem(first) as HTMLElement)?.focus();return;}
    setStatus('sending');await new Promise(resolve=>setTimeout(resolve,900));setStatus('success');
  }
  function props(key: keyof Fields) {return {id:key,name:key,onChange:update,onBlur:()=>blur(key),'aria-invalid':!!errors[key],'aria-describedby':errors[key]?`${key}-error`:undefined};}
  function error(key:keyof Fields){return errors[key]&&<span className="field-error" id={`${key}-error`}>{errors[key]}</span>;}
  return <div className="appointment-form"><div className="form-status" role="status" aria-live="polite">{status==='success'&&<div className="success-state"><span className="success-icon"><Check size={30}/></span><h3>Demonstração concluída.</h3><p>Os campos foram validados, mas nenhuma solicitação foi enviada e nenhum horário foi reservado. Para agendar de verdade, converse pelo WhatsApp.</p><WhatsAppButton className="button--olive">Agendar pelo WhatsApp</WhatsAppButton><button className="text-link" onClick={()=>{setStatus('idle');setFields(initial);setErrors({});}}>Preencher novamente<ArrowUpRight size={16}/></button></div>}</div>
    {status!=='success'&&<form ref={form} noValidate onSubmit={submit} aria-busy={status==='sending'}><div className="form-heading"><h3>Vamos começar pelo seu contato.</h3><p>Os campos com <span aria-label="asterisco">*</span> são obrigatórios.</p></div>
      <fieldset disabled={status==='sending'}><legend className="sr-only">Informações para solicitar agendamento</legend><div className="form-grid">
        <div className="field"><label htmlFor="name">Nome <span>*</span></label><input {...props('name')} value={fields.name} autoComplete="name" required placeholder="Seu nome" maxLength={120}/>{error('name')}</div>
        <div className="field"><label htmlFor="phone">Telefone <span>*</span></label><input {...props('phone')} value={fields.phone} type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="(11) 99999-9999" maxLength={20}/>{error('phone')}</div>
        <div className="field"><label htmlFor="email">E-mail <span>*</span></label><input {...props('email')} value={fields.email} type="email" autoComplete="email" required placeholder="voce@exemplo.com" maxLength={180}/>{error('email')}</div>
        <div className="field"><label htmlFor="reason">Motivo do contato <span>*</span></label><select {...props('reason')} value={fields.reason} required><option value="">Selecione uma opção</option><option>Dermatologia clínica</option><option>Dermatologia estética</option><option>Saúde e prevenção da pele</option><option>Avaliação personalizada</option><option>Outras informações</option></select>{error('reason')}</div>
        <div className="field"><label htmlFor="date">Data de preferência <span className="optional">opcional</span></label><input {...props('date')} value={fields.date} type="date" min={minDate}/>{error('date')}</div>
        <div className="field"><label htmlFor="time">Horário de preferência <span className="optional">opcional</span></label><input {...props('time')} value={fields.time} type="time"/>{error('time')}</div>
        <div className="field field--full"><label htmlFor="message">Mensagem <span className="optional">opcional</span></label><textarea {...props('message')} value={fields.message} placeholder="Como podemos ajudar? Evite incluir informações clínicas sensíveis." rows={3} maxLength={2000}/></div>
      </div><div className="consent"><input {...props('consent')} checked={fields.consent} type="checkbox" required/><label htmlFor="consent">Autorizo o contato para tratar minha solicitação de agendamento. <span>*</span></label></div>{error('consent')}<button className="privacy-link" type="button" onClick={onPrivacy}>Leia a política de privacidade</button>
      </fieldset><button className="button button--olive submit-button" type="submit" disabled={status==='sending'}>{status==='sending'?<><LoaderCircle className="spinner" size={18}/>Simulando envio…</>:<>Solicitar agendamento<ArrowUpRight size={18}/></>}</button><p className="demo-notice"><ShieldCheck size={16} aria-hidden="true"/><span>Formulário de demonstração: nenhum dado será enviado. O agendamento real é feito pelo WhatsApp.</span></p><p className="medical-form-note">O preenchimento deste formulário não substitui uma consulta médica.</p>
    </form>}
  </div>;
}
