"use client";
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DS {
  nombre: string; industria: string; equipo: string; ticket: string;
  leads_mes: string; velocidad: string[]; seguimiento: string;
  organizacion: string[]; dolores: string[]; dependencia: string;
  intentos_prev: string[]; meta_principal: string[]; inversion: string; notas: string;
}
const INIT: DS = {
  nombre:"", industria:"", equipo:"", ticket:"", leads_mes:"",
  velocidad:[], seguimiento:"", organizacion:[], dolores:[],
  dependencia:"", intentos_prev:[], meta_principal:[], inversion:"", notas:""
};

// ─── Plans ────────────────────────────────────────────────────────────────────
const PLANS: Record<string, { name:string; price:string; setup:string; tag:string; why:string; features:string[] }> = {
  starter: {
    name:"Plan Starter", price:"$497/mo", setup:"+ $2,497 setup único",
    tag:"Punto de entrada ideal",
    why:"El negocio necesita construir su base primero: un sistema centralizado de captura, CRM operativo y seguimiento automático. El Plan Starter cubre exactamente eso — sin sobrecargarlo de tecnología antes de tener los fundamentos correctos.",
    features:["Website profesional conectado al CRM — listo en 7 días","CRM con pipelines para organizar leads y clientes","Widget de AI chat en el sitio — captura leads 24/7","Sistema de agendamiento online — sin llamadas de coordinación","Seguimiento automático por email + SMS — nunca más perseguir leads","Hosting y mantenimiento incluido"]
  },
  pro: {
    name:"Plan Pro", price:"$997/mo", setup:"+ $3,997 setup único",
    tag:"Recomendado para este negocio",
    why:"Los dolores identificados requieren automatizaciones ilimitadas, nurturing inteligente y un sistema que mueva los leads solo. El Plan Pro fue diseñado exactamente para este momento.",
    features:["Todo lo del Plan Starter — sin límite de pipelines ni flujos","Automatizaciones ilimitadas para back-office completo","AI Chat avanzado conectado al CRM — califica y agenda","Pipeline de ventas con nurturing automático","Integración de calendario + recordatorios automáticos — cero no-shows","Reactivación de base de datos existente","Funnels de captación y seguimiento multicanal"]
  },
  growth: {
    name:"Plan Growth", price:"$1,797/mo", setup:"+ $5,997 setup único",
    tag:"Solución potente para este caso",
    why:"El diagnóstico muestra que este negocio está perdiendo leads por llamadas sin responder — y eso es ingreso directo que se va a la competencia. El Plan Growth agrega un AI Voice Agent que contesta cada llamada, califica el prospecto y agenda la cita automáticamente.",
    features:["Todo lo del Plan Pro como base operativa","AI Voice Agent contesta cada llamada entrante 24/7","Calificación de leads con preguntas personalizadas por voz","Agendamiento directo al calendario desde la llamada","Outbound automático a leads nuevos — el primero en llamar gana","Nunca más un lead perdido por no contestar el teléfono","Sistema de reportes automáticos del rendimiento"]
  },
  enterprise: {
    name:"Plan Enterprise", price:"Cotización personalizada", setup:"Scoped & quoted para su operación",
    tag:"Infraestructura a medida para máximo impacto",
    why:"Por el tamaño del equipo, el ticket promedio, el volumen de leads y la complejidad de la operación, este negocio requiere una solución completamente personalizada. Un plan estándar no alcanza para cubrir todos los flujos, integraciones y necesidades específicas.",
    features:["Todo el Plan Growth como base operativa","Workflows 100% personalizados a la operación exacta","AI Agent entrenado con los datos y procesos del negocio","Onboarding automatizado de clientes nuevos","Sistema de referidos automático y escalable","Integraciones con todos los sistemas existentes","Infraestructura para múltiples equipos, ubicaciones o líneas de negocio","Soporte VIP dedicado y optimización continua","Garantía de ROI personalizada por operación"]
  }
};

// ─── Scoring ─────────────────────────────────────────────────────────────────
function calcScore(d: DS) {
  let s = 0;
  if (d.ticket === "medio")   s += 5;
  if (d.ticket === "alto")    s += 12;
  if (d.ticket === "premium") s += 18;
  if (d.equipo === "pequeno") s += 8;
  if (d.equipo === "mediano") s += 16;
  if (d.leads_mes === "moderado") s += 6;
  if (d.leads_mes === "alto")     s += 12;
  if (d.leads_mes === "muy_alto") s += 18;
  if (d.velocidad.includes("sin_proceso")) s += 14;
  else if (d.velocidad.includes("lento"))  s += 8;
  else if (d.velocidad.includes("moderado")) s += 3;
  if (d.seguimiento === "informal")        s += 8;
  if (d.seguimiento === "sin_seguimiento") s += 14;
  if (d.organizacion.includes("nada"))   s += 18;
  else if (d.organizacion.includes("cabeza"))  s += 14;
  else if (d.organizacion.includes("sheets"))  s += 8;
  s += d.dolores.length * 5;
  if (d.dolores.includes("llamadas_perdidas")) s += 8;
  if (d.dolores.includes("escala_lenta"))      s += 5;
  if (d.dolores.includes("dependencia_dueno")) s += 5;
  if (d.dependencia === "mucho")   s += 10;
  if (d.dependencia === "parcial") s += 5;
  if (d.meta_principal.includes("escalar") || d.meta_principal.includes("mas_clientes")) s += 5;
  return s;
}

function getPlan(d: DS, score: number) {
  if (d.equipo === "mediano") return "enterprise";
  if (d.ticket === "premium") return "enterprise";
  if (d.leads_mes === "muy_alto") return "enterprise";
  if (d.dependencia === "mucho" && d.dolores.length >= 4) return "enterprise";
  if (d.velocidad.includes("sin_proceso") && d.seguimiento === "sin_seguimiento" && d.organizacion.includes("nada")) return "enterprise";
  if (d.meta_principal.includes("escalar") && d.equipo !== "solo") return "enterprise";
  if (score >= 95) return "enterprise";
  if (score >= 80 || d.dolores.includes("llamadas_perdidas")) return "growth";
  if (score >= 45) return "pro";
  return "starter";
}

function getScoreCriteria(d: DS) {
  return [
    { criterio:"¿Hay dolor real y urgente?", obs: d.dolores.length>=3 ? `Sí — ${d.dolores.length} dolores identificados` : d.dolores.length>=1 ? `Moderado — ${d.dolores.length} dolor(es)` : "No identificado", score: d.dolores.length>=3?5:d.dolores.length>=1?3:1 },
    { criterio:"¿El negocio tiene volumen de actividad?", obs: ({poco:"Bajo — flujo limitado",moderado:"Moderado",alto:"Alto — hay demanda real",muy_alto:"Muy alto — necesita sistema sólido"} as Record<string,string>)[d.leads_mes]||"—", score: ({poco:2,moderado:3,alto:4,muy_alto:5} as Record<string,number>)[d.leads_mes]||1 },
    { criterio:"¿El proceso actual tiene fugas claras?", obs: d.velocidad.includes("sin_proceso")?"Sí — sin proceso de respuesta":d.seguimiento==="sin_seguimiento"?"Sí — sin seguimiento":d.organizacion.includes("nada")?"Sí — sin organización":"Parcial", score:(d.velocidad.includes("sin_proceso")||d.seguimiento==="sin_seguimiento"||d.organizacion.includes("nada"))?5:3 },
    { criterio:"¿Hay fit con los servicios de LPS?", obs: d.dolores.includes("llamadas_perdidas")?"Fit alto — AI Voice Agent clave":d.dolores.includes("trabajo_manual")?"Fit alto — automatización urgente":"Fit moderado", score:(d.dolores.includes("llamadas_perdidas")||d.dolores.includes("trabajo_manual"))?5:3 },
    { criterio:"¿El dueño está abierto al cambio?", obs: ({activo:"Sí — listo para invertir",cauteloso:"Parcialmente — necesita claridad",evaluando:"Evaluando opciones",no_ahora:"No es el momento ideal"} as Record<string,string>)[d.inversion]||"—", score:({activo:5,cauteloso:3,evaluando:3,no_ahora:1} as Record<string,number>)[d.inversion]||2 },
    { criterio:"¿El ticket justifica la inversión?", obs: ({bajo:"Ticket bajo — ROI más ajustado",medio:"Ticket medio — ROI razonable",alto:"Ticket alto — ROI fuerte",premium:"Ticket premium — ROI muy alto"} as Record<string,string>)[d.ticket]||"—", score:({bajo:2,medio:3,alto:4,premium:5} as Record<string,number>)[d.ticket]||2 },
    { criterio:"¿Hay urgencia o timing favorable?", obs: (d.intentos_prev.includes("herramientas")||d.intentos_prev.includes("agencia"))?"Sí — frustración previa activa":d.inversion==="activo"?"Sí — listo para moverse":"Moderada", score:(d.intentos_prev.includes("herramientas")||d.intentos_prev.includes("agencia")||d.inversion==="activo")?4:2 },
  ];
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InternalDiagnostic() {
  const [clicks, setClicks]       = useState(0);
  const [showGate, setShowGate]   = useState(false);
  const [authed, setAuthed]       = useState(false);

  // ── Keyboard shortcut: Shift+Alt+D ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === "D") {
        setShowGate(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const [pw, setPw]               = useState("");
  const [pwErr, setPwErr]         = useState(false);
  const [step, setStep]           = useState(0);
  const [tab, setTab]             = useState<"interno"|"prospecto"|"email">("interno");
  const [showMore, setShowMore]   = useState(false);
  const [copied, setCopied]       = useState(false);
  const [d, setD]                 = useState<DS>(INIT);

  // ── Hidden trigger ──
  const handleDot = () => {
    const n = clicks + 1;
    if (n >= 5) { setShowGate(true); setClicks(0); }
    else setClicks(n);
  };

  // ── Password ──
  const tryPw = () => {
    if (pw === "Latinprime2026") { setAuthed(true); setShowGate(false); setPwErr(false); }
    else setPwErr(true);
  };

  // ── Select option ──
  const sel = (field: keyof DS, val: string, multi = false) => {
    if (multi) {
      const arr = d[field] as string[];
      setD(prev => ({ ...prev, [field]: arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val] }));
    } else {
      setD(prev => ({ ...prev, [field]: prev[field] === val ? "" : val }));
    }
  };

  const isSelected = (field: keyof DS, val: string) =>
    Array.isArray(d[field]) ? (d[field] as string[]).includes(val) : d[field] === val;

  // ── Compute results ──
  const rawScore  = calcScore(d);
  const planKey   = getPlan(d, rawScore);
  const plan      = PLANS[planKey];
  const criteria  = getScoreCriteria(d);
  const totalScore= criteria.reduce((a,c)=>a+c.score,0);
  const maxScore  = criteria.length * 5;
  const fitPct    = Math.min(100, Math.round(totalScore/maxScore*100));
  const fitColor  = fitPct>=75?"#1A8A5A":fitPct>=50?"#E86C2C":"#6B7C93";
  const fitLabel  = fitPct>=75?"Fit Alto":fitPct>=50?"Fit Moderado":"Fit Bajo";

  const ticketMap: Record<string,number> = {bajo:700,medio:2500,alto:9000,premium:20000};
  const leadMap:   Record<string,number> = {poco:15,moderado:35,alto:100,muy_alto:200};
  const avgTicket  = ticketMap[d.ticket]||1500;
  const leadsMonth = leadMap[d.leads_mes]||30;
  const recovRev   = Math.round(leadsMonth*avgTicket*0.10);
  const planCost   = {starter:497,pro:997,growth:1797,enterprise:2997}[planKey] || 997;
  const netRoi     = recovRev - planCost;
  const roiX       = netRoi>0 ? (recovRev/planCost).toFixed(1)+"x" : "—";

  const ns = {activo:{step:"Proceder con propuesta formal",icon:"🚀"},cauteloso:{step:"Enviar propuesta + agendar call de cierre",icon:"📅"},evaluando:{step:"Enviar contenido educativo + seguimiento en 7 días",icon:"📩"},no_ahora:{step:"Registrar para seguimiento a 30 días",icon:"📌"}}[d.inversion]||{step:"Definir próximo paso",icon:"📌"};

  // ── Email template ──
  const emailBody = `Hola ${d.nombre ? d.nombre.split("—")[0].trim() : ""},

Fue un placer hablar contigo hoy. Quería hacerte llegar un resumen rápido de lo que conversamos y la recomendación que tenemos para tu negocio.

Basándonos en tu situación actual — ${d.leads_mes ? `${d.leads_mes === "poco" ? "menos de 20" : d.leads_mes === "moderado" ? "20–60" : d.leads_mes === "alto" ? "60–150" : "más de 150"} leads al mes` : "tu volumen de actividad"} y los retos operativos que mencionaste — te recomendamos el ${plan.name}.

POR QUÉ ESTE PLAN PARA TI:
${plan.why}

LO QUE INCLUYE:
${plan.features.map(f => `• ${f}`).join("\n")}

INVERSIÓN:
${plan.price} ${planKey !== "enterprise" ? `· ${plan.setup}` : "— cotización personalizada según tu operación"}

${netRoi > 0 ? `RETORNO ESTIMADO:
Basado en tu ticket promedio de $${avgTicket.toLocaleString()} y tu volumen de leads, estimamos que el sistema puede recuperar $${recovRev.toLocaleString()}/mes en ingresos — un ROI de ${roiX} sobre el costo del plan.

` : ""}Si tienes preguntas o quieres avanzar, puedes agendar tu call de estrategia aquí:
https://link.latinprimesystems.com/widget/bookings/latin-prime-demo

Estamos listos para empezar cuando tú lo estés.

Carlos
Latin Prime Systems
+1 (971) 400-6390 | latinprimesystems.com`;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(()=>setCopied(false), 2500);
  };

  const close = () => { setAuthed(false); setStep(0); setTab("interno"); setD(INIT); };

  // ── Option card helper ──
  const Opt = ({ field, val, multi=false, title, desc }: { field:keyof DS; val:string; multi?:boolean; title:string; desc:string }) => (
    <div onClick={()=>sel(field,val,multi)} style={{ border:`2px solid ${isSelected(field,val)?"#1A5CA8":"#D8E2EF"}`, borderRadius:12, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"flex-start", gap:12, background:isSelected(field,val)?"rgba(26,92,168,0.06)":"white", transition:"all 0.15s" }}>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:700,color:"#0D1B2A"}}>{title}</div>
        <div style={{fontSize:11,color:"#6B7C93",marginTop:3,lineHeight:1.4}}>{desc}</div>
      </div>
      <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${isSelected(field,val)?"#1A5CA8":"#D8E2EF"}`,flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",background:isSelected(field,val)?"#1A5CA8":"transparent",transition:"all 0.15s" }}>
        {isSelected(field,val) && <span style={{fontSize:11,color:"white",fontWeight:900}}>✓</span>}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Hidden trigger dot — bottom-right corner (faint gold dot, only LPS knows it's here) ── */}
      <div
        onClick={handleDot}
        title=""
        style={{ position:"fixed", bottom:14, right:14, width:10, height:10, cursor:"default", zIndex:9998, borderRadius:"50%", background:"rgba(212,165,58,0.25)", border:"1px solid rgba(212,165,58,0.35)", transition:"opacity 0.2s", opacity: clicks > 0 ? 1 : 0.6 }}
        aria-hidden="true"
      />

      {/* ── Password gate ── */}
      {showGate && !authed && (
        <div style={{ position:"fixed",inset:0,background:"rgba(13,27,42,0.85)",backdropFilter:"blur(6px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"white",borderRadius:16,padding:"40px 48px",maxWidth:380,width:"90%",textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize:32,marginBottom:12 }}>🔒</div>
            <div style={{ fontSize:18,fontWeight:800,color:"#0D1B2A",marginBottom:6 }}>Acceso Interno LPS</div>
            <div style={{ fontSize:13,color:"#6B7C93",marginBottom:24 }}>Ingresa la contraseña para acceder al diagnóstico interno.</div>
            <input
              type="password"
              value={pw}
              onChange={e=>{ setPw(e.target.value); setPwErr(false); }}
              onKeyDown={e=>e.key==="Enter"&&tryPw()}
              placeholder="Contraseña"
              autoFocus
              style={{ width:"100%",padding:"12px 16px",border:`2px solid ${pwErr?"#e53e3e":"#D8E2EF"}`,borderRadius:10,fontSize:15,marginBottom:8,outline:"none",textAlign:"center",letterSpacing:"0.1em" }}
            />
            {pwErr && <div style={{fontSize:12,color:"#e53e3e",marginBottom:8}}>Contraseña incorrecta. Inténtalo de nuevo.</div>}
            <button onClick={tryPw} style={{ width:"100%",padding:"13px",background:"#1A5CA8",color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:8 }}>
              Entrar →
            </button>
            <button onClick={()=>{setShowGate(false);setPw("");setPwErr(false);}} style={{ background:"none",border:"none",fontSize:13,color:"#6B7C93",cursor:"pointer" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ── Main overlay ── */}
      {authed && (
        <div style={{ position:"fixed",inset:0,background:"#F2F5F9",zIndex:99998,overflowY:"auto",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#1A1A2E" }}>

          {/* Header */}
          <div style={{ background:"#0D1B2A",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10 }}>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:"white",letterSpacing:0.5}}>LATIN PRIME SYSTEMS</div>
              <div style={{fontSize:11,color:"#A0B8D8",marginTop:1}}>Diagnóstico Interno de Negocio</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{background:"#E86C2C",color:"white",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:20}}>USO INTERNO</div>
              <button onClick={close} style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"white",padding:"6px 14px",borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600 }}>
                ✕ Cerrar
              </button>
            </div>
          </div>

          <div style={{maxWidth:860,margin:"0 auto",padding:"28px 16px 60px"}}>

            {/* Step indicator */}
            {step < 4 && (
              <>
                <div style={{display:"flex",alignItems:"center",marginBottom:16}}>
                  {["Perfil","Operación","Dolores","Metas","Resultado"].map((label,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                      {i < 4 && <div style={{position:"absolute",top:16,left:"50%",width:"100%",height:2,background:i<step?"#1A5CA8":"#D8E2EF",zIndex:0}}/>}
                      <div style={{ width:32,height:32,borderRadius:"50%",background:i===step?"#1A5CA8":i<step?"#1A8A5A":"#D8E2EF",color:i<=step?"white":"#6B7C93",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1,position:"relative",transition:"all 0.3s" }}>
                        {i < step ? "✓" : i+1}
                      </div>
                      <div style={{fontSize:10,color:i===step?"#1A5CA8":i<step?"#1A8A5A":"#6B7C93",marginTop:6,fontWeight:600,textTransform:"uppercase",letterSpacing:0.3}}>{label}</div>
                    </div>
                  ))}
                </div>
                {/* Progress bar */}
                <div style={{height:4,background:"#D8E2EF",borderRadius:4,marginBottom:24,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(step+1)/5*100}%`,background:"linear-gradient(90deg,#1A5CA8,#E86C2C)",borderRadius:4,transition:"width 0.4s ease"}}/>
                </div>
              </>
            )}

            {/* ══ STEP 0 — Perfil ══ */}
            {step === 0 && (
              <Card header="Perfil del Negocio" sub="Paso 1 de 4" desc="Información básica del prospecto para personalizar el diagnóstico.">
                <Field label="Nombre del prospecto / negocio">
                  <input type="text" value={d.nombre} onChange={e=>setD(p=>({...p,nombre:e.target.value}))} placeholder="Ej: Juan García — García Consulting" style={inputStyle} />
                </Field>

                <Field label="Industria / tipo de negocio">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[
                      ["coach_consultor","🎯 Coach / Consultor","Coaching, consultoría estratégica"],
                      ["legal","⚖️ Firma Legal","Abogados, notarios, servicios legales"],
                      ["contabilidad","📊 Contabilidad / Tax","Contadores, CPA, asesoría fiscal"],
                      ["dental_healthcare","🏥 Dental & Healthcare","Consultorios, clínicas, centros médicos"],
                      ["real_estate","🏠 Real Estate & Brokers","Agentes inmobiliarios, corredores"],
                      ["restaurantes","🍽️ Restaurantes & Negocio Local","Bares, cafés, negocios de comida"],
                      ["agencia_digital","💻 Agencia Digital / Marketing","Diseño, desarrollo, agencias de marketing"],
                      ["contratistas","🔧 Contratistas & Servicios","Construcción, reparaciones, mantenimiento"],
                      ["salones_spas","✂️ Salones & Spas","Peluquerías, estéticas, spas"],
                      ["seguros","🛡️ Seguros","Agentes y brokers de seguros"],
                      ["servicios_financieros","💰 Servicios Financieros","Asesoramiento, seguros, inversiones"],
                      ["consultoria","📈 Consultoría Empresarial","Asesoría de negocios, estrategia"],
                      ...(showMore ? [
                        ["educacion","🎓 Educación","Colegios, academias, cursos online"],
                        ["fitness","💪 Fitness & Wellness","Gimnasios, yoga, entrenamiento"],
                        ["veterinaria","🐾 Veterinaria","Clínicas veterinarias, tiendas mascotas"],
                        ["psicologia","🧠 Psicología & Terapia","Psicólogos, terapeutas, coaching"],
                        ["eventos","🎉 Eventos & Catering","Organizadores de eventos, catering"],
                        ["turismo","✈️ Turismo & Hospitalidad","Hoteles, agencias de viajes, tours"],
                        ["ecommerce","🛍️ E-commerce & Tiendas","Tiendas online, retail, dropshipping"],
                        ["logistica","📦 Logística & Transporte","Envíos, distribución, logística"],
                        ["solar","☀️ Energía Solar","Ventas e instalación de paneles solares"],
                        ["inmigracion","🌎 Inmigración","Consultoría migratoria, visas"],
                        ["otro","🎯 Otro","Industria no listada arriba"],
                      ] : [])
                    ].map(([val,title,desc])=>(
                      <Opt key={val} field="industria" val={val} title={title} desc={desc} />
                    ))}
                  </div>
                  <button onClick={()=>setShowMore(p=>!p)} style={{ width:"100%",marginTop:10,padding:"10px",background:"#F2F5F9",border:"2px solid #D8E2EF",borderRadius:10,fontSize:13,color:"#6B7C93",cursor:"pointer",fontWeight:600 }}>
                    {showMore ? "− Mostrar menos" : "+ Mostrar más industrias"}
                  </button>
                </Field>

                <Field label="Tamaño del equipo">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                    <Opt field="equipo" val="solo"    title="Solo / Socios"    desc="1–2 personas" />
                    <Opt field="equipo" val="pequeno" title="Equipo pequeño"   desc="3–10 personas" />
                    <Opt field="equipo" val="mediano" title="Equipo mediano"   desc="11+ personas" />
                  </div>
                </Field>

                <Field label="Valor promedio por cliente / proyecto">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="ticket" val="bajo"    title="Menos de $1,000"    desc="Servicios de entrada o paquetes cortos" />
                    <Opt field="ticket" val="medio"   title="$1,000 – $5,000"    desc="Proyectos o retainers medianos" />
                    <Opt field="ticket" val="alto"    title="$5,000 – $15,000"   desc="Proyectos de alto valor" />
                    <Opt field="ticket" val="premium" title="Más de $15,000"     desc="Enterprise / contratos anuales" />
                  </div>
                </Field>

                <BtnRow next={()=>setStep(1)} nextLabel="Continuar →" />
              </Card>
            )}

            {/* ══ STEP 1 — Operación ══ */}
            {step === 1 && (
              <Card header="Operación y Seguimiento Actual" sub="Paso 2 de 4" desc="Entendemos cómo funciona el negocio hoy — sin filtros.">
                <Field label="¿Cuántos leads o consultas nuevas reciben por mes?">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="leads_mes" val="poco"     title="Menos de 20"   desc="Flujo bajo o inconsistente" />
                    <Opt field="leads_mes" val="moderado" title="20 – 60"        desc="Flujo moderado y manejable" />
                    <Opt field="leads_mes" val="alto"     title="60 – 150"       desc="Flujo alto — se siente la presión" />
                    <Opt field="leads_mes" val="muy_alto" title="Más de 150"     desc="Alto volumen — necesita sistema sólido" />
                  </div>
                </Field>

                <Field label="¿Qué tan rápido responden a un lead nuevo?" hint="Puede seleccionar varias">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="velocidad" val="rapido"      multi title="⚡ Menos de 5 minutos" desc="Respuesta casi inmediata siempre" />
                    <Opt field="velocidad" val="moderado"    multi title="🕐 5 min – 2 horas"    desc="Respuesta el mismo día generalmente" />
                    <Opt field="velocidad" val="lento"       multi title="🐌 Más de 2 horas"     desc="A veces tarda — depende del momento" />
                    <Opt field="velocidad" val="sin_proceso" multi title="❓ No hay proceso"      desc="Responde cuando puede — sin estructura" />
                  </div>
                </Field>

                <Field label="¿Tienen proceso de seguimiento a leads que no cerraron?">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                    <Opt field="seguimiento" val="estructurado"    title="✅ Sí — estructurado" desc="Documentado y ejecutado consistentemente" />
                    <Opt field="seguimiento" val="informal"        title="⚠️ Sí — informal"     desc="Existe pero no siempre se ejecuta" />
                    <Opt field="seguimiento" val="sin_seguimiento" title="❌ No existe"          desc="Los leads fríos se olvidan" />
                  </div>
                </Field>

                <Field label="¿Cómo está organizada la información de clientes?" hint="Puede seleccionar varias">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="organizacion" val="crm"    multi title="🗂️ CRM activo"       desc="Usamos un CRM y está al día" />
                    <Opt field="organizacion" val="sheets" multi title="📊 Excel / Sheets"   desc="Hojas de cálculo manuales" />
                    <Opt field="organizacion" val="cabeza" multi title="🧠 En la cabeza"     desc="Notas dispersas o memoria del dueño" />
                    <Opt field="organizacion" val="nada"   multi title="❌ Sin sistema"      desc="No hay organización centralizada" />
                  </div>
                </Field>

                <BtnRow prev={()=>setStep(0)} next={()=>setStep(2)} nextLabel="Continuar →" />
              </Card>
            )}

            {/* ══ STEP 2 — Dolores ══ */}
            {step === 2 && (
              <Card header="Dolores Reales y Prioridades" sub="Paso 3 de 4" desc="Identificamos dónde están las fugas y qué duele más hoy.">
                <Field label="¿Cuáles son los principales dolores operativos?" hint="Selecciona todos los que apliquen">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="dolores" val="llamadas_perdidas"     multi title="📞 Llamadas sin responder"       desc="Leads que llaman y no hay quien conteste" />
                    <Opt field="dolores" val="trabajo_manual"        multi title="⏰ Demasiado trabajo manual"      desc="Tareas repetitivas que consumen tiempo" />
                    <Opt field="dolores" val="sin_seguimiento"       multi title="📉 Leads que se enfrían"         desc="Falta de seguimiento consistente" />
                    <Opt field="dolores" val="dependencia_dueno"     multi title="🔗 Todo depende del dueño"       desc="Sin el dueño, la operación se detiene" />
                    <Opt field="dolores" val="herramientas_desconectadas" multi title="🔌 Herramientas desconectadas" desc="Sistemas que no hablan entre sí" />
                    <Opt field="dolores" val="no_shows"              multi title="🚫 No-shows y cancelaciones"     desc="Citas perdidas sin aviso" />
                    <Opt field="dolores" val="sin_reportes"          multi title="📊 Sin visibilidad de datos"     desc="No saben cuántos leads entran ni cierran" />
                    <Opt field="dolores" val="escala_lenta"          multi title="📈 No pueden escalar"            desc="Crecer implica contratar más personas" />
                  </div>
                </Field>

                <Field label="¿El negocio depende demasiado de la presencia del dueño?">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                    <Opt field="dependencia" val="mucho"   title="Sí, totalmente" desc="Sin mí, se para todo" />
                    <Opt field="dependencia" val="parcial" title="En parte"       desc="Algunas áreas van solas" />
                    <Opt field="dependencia" val="poco"    title="No mucho"       desc="Tenemos sistemas y equipo" />
                  </div>
                </Field>

                <Field label="¿Han intentado resolver esto antes?" hint="Puede seleccionar varias">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="intentos_prev" val="nunca"       multi title="No, es la primera vez"      desc="No han buscado solución" />
                    <Opt field="intentos_prev" val="herramientas" multi title="Compraron herramientas"     desc="Pero no funcionó como esperaban" />
                    <Opt field="intentos_prev" val="agencia"     multi title="Contrataron una agencia"     desc="Con resultados mixtos o malos" />
                    <Opt field="intentos_prev" val="interno"     multi title="Lo intentaron internamente"  desc="No tuvieron tiempo ni expertise" />
                  </div>
                </Field>

                <BtnRow prev={()=>setStep(1)} next={()=>setStep(3)} nextLabel="Continuar →" />
              </Card>
            )}

            {/* ══ STEP 3 — Metas ══ */}
            {step === 3 && (
              <Card header="Metas, Visión e Inversión" sub="Paso 4 de 4" desc="Entendemos hacia dónde quieren ir y si están listos para moverse.">
                <Field label="¿Cuál es la meta principal en los próximos 12 meses?" hint="Puede seleccionar varias">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="meta_principal" val="mas_clientes"  multi title="📈 Conseguir más clientes"  desc="Crecer en volumen de negocios" />
                    <Opt field="meta_principal" val="mas_eficiencia" multi title="⚙️ Operar más eficiente"   desc="Hacer lo mismo con menos esfuerzo" />
                    <Opt field="meta_principal" val="escalar"       multi title="🚀 Escalar sin contratar"   desc="Crecer sin aumentar la nómina" />
                    <Opt field="meta_principal" val="recuperar_tiempo" multi title="🕐 Recuperar tiempo"     desc="Salir de la operación diaria" />
                  </div>
                </Field>

                <Field label="¿En qué momento de inversión está el negocio?">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <Opt field="inversion" val="activo"    title="🟢 Listo para invertir"   desc="Si la solución tiene sentido, avanzo" />
                    <Opt field="inversion" val="cauteloso" title="🟡 Cauteloso"              desc="Necesito ver claridad antes de decidir" />
                    <Opt field="inversion" val="evaluando" title="🔵 Evaluando opciones"     desc="Comparando alternativas" />
                    <Opt field="inversion" val="no_ahora"  title="⚪ No es el momento"       desc="Quiero entender para el futuro" />
                  </div>
                </Field>

                <Field label="Notas adicionales (opcional)">
                  <textarea
                    value={d.notas}
                    onChange={e=>setD(p=>({...p,notas:e.target.value}))}
                    placeholder="Observaciones, contexto adicional, impresiones de la conversación..."
                    rows={4}
                    style={{ width:"100%",border:"2px solid #D8E2EF",borderRadius:10,padding:"12px 16px",fontSize:13,fontFamily:"inherit",color:"#1A1A2E",resize:"vertical",outline:"none" }}
                  />
                </Field>

                <BtnRow prev={()=>setStep(2)} next={()=>setStep(4)} nextLabel="Ver Resultado →" nextColor="#E86C2C" />
              </Card>
            )}

            {/* ══ STEP 4 — Resultado ══ */}
            {step === 4 && (
              <div style={{background:"white",borderRadius:16,boxShadow:"0 4px 24px rgba(13,27,42,0.10)",overflow:"hidden"}}>

                {/* Tabs */}
                <div style={{display:"flex",borderBottom:"2px solid #D8E2EF"}}>
                  {([["interno","🔒 Resumen Interno LPS"],["prospecto","📋 Vista para el Prospecto"],["email","📧 Email de Seguimiento"]] as [string,string][]).map(([key,label])=>(
                    <button key={key} onClick={()=>setTab(key as typeof tab)} style={{ padding:"14px 22px",fontSize:13,fontWeight:700,cursor:"pointer",border:"none",background:"transparent",color:tab===key?"#1A5CA8":"#6B7C93",borderBottom:`3px solid ${tab===key?"#1A5CA8":"transparent"}`,marginBottom:-2,transition:"all 0.2s" }}>
                      {label}
                    </button>
                  ))}
                  <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,paddingRight:20}}>
                    <button onClick={()=>setStep(3)} style={{...btnStyle,background:"#F2F5F9",color:"#6B7C93",border:"2px solid #D8E2EF"}}>← Editar</button>
                    <button onClick={()=>{setStep(0);setTab("interno");setD(INIT);}} style={{...btnStyle,background:"#F2F5F9",color:"#6B7C93",border:"2px solid #D8E2EF"}}>↺ Nuevo</button>
                  </div>
                </div>

                {/* ── TAB: INTERNO ── */}
                {tab === "interno" && (
                  <div style={{padding:"28px 32px"}}>
                    {/* Name bar */}
                    <div style={{background:"rgba(26,92,168,0.06)",border:"1px solid #D8E2EF",borderRadius:10,padding:"12px 18px",display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                      <div><div style={{fontSize:11,color:"#6B7C93",fontWeight:600,textTransform:"uppercase"}}>Prospecto</div><div style={{fontSize:15,fontWeight:800,color:"#0D1B2A"}}>{d.nombre||"Sin nombre"}</div></div>
                      <div style={{marginLeft:"auto"}}><span style={{background:`${fitColor}20`,color:fitColor,fontSize:13,fontWeight:700,padding:"5px 14px",borderRadius:20}}>{fitLabel} — {fitPct}%</span></div>
                    </div>

                    {/* Plan card */}
                    <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:12}}>Plan Recomendado</div>
                    <PlanCard planKey={planKey} plan={plan} price={plan.price} setup={plan.setup} />

                    {/* ROI Box */}
                    <div style={{background:"#0D1B2A",borderRadius:14,padding:"22px 26px",color:"white",marginBottom:24}}>
                      <div style={{fontSize:13,color:"#A0B8D8",marginBottom:14}}>ROI Estimado — {leadsMonth} leads/mes · ticket prom. ${avgTicket.toLocaleString()}</div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,textAlign:"center"}}>
                        <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>${recovRev.toLocaleString()}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>Ingreso recuperado/mes</div></div>
                        <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>{roiX}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>ROI potencial</div></div>
                        <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>{netRoi>0?`$${netRoi.toLocaleString()}`:"—"}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>Neto sobre plan</div></div>
                      </div>
                      <div style={{fontSize:11,color:"#A0B8D8",marginTop:12}}>* Estimado conservador basado en 10% de mejora. La mayoría de negocios supera estos números.</div>
                    </div>

                    {/* Score table */}
                    <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:12}}>Tabla de Evaluación de Fit</div>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,marginBottom:24}}>
                      <thead><tr>{["Criterio","Observación","Score"].map(h=><th key={h} style={{background:"#0D1B2A",color:"white",padding:"10px 14px",textAlign:"left",fontSize:11,textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>)}</tr></thead>
                      <tbody>
                        {criteria.map((c,i)=>(
                          <tr key={i}><td style={{padding:"10px 14px",borderBottom:"1px solid #D8E2EF",fontWeight:700,color:"#0D1B2A"}}>{c.criterio}</td><td style={{padding:"10px 14px",borderBottom:"1px solid #D8E2EF",color:"#6B7C93"}}>{c.obs}</td><td style={{padding:"10px 14px",borderBottom:"1px solid #D8E2EF",textAlign:"center"}}><span style={{display:"inline-block",width:36,height:36,borderRadius:"50%",lineHeight:"36px",textAlign:"center",fontSize:12,fontWeight:800,background:c.score>=4?"rgba(26,138,90,0.12)":c.score>=3?"rgba(232,108,44,0.12)":"rgba(107,124,147,0.1)",color:c.score>=4?"#1A8A5A":c.score>=3?"#E86C2C":"#6B7C93"}}>{c.score}/5</span></td></tr>
                        ))}
                        <tr><td colSpan={2} style={{padding:"10px 14px",fontWeight:800,color:"#0D1B2A"}}>TOTAL</td><td style={{padding:"10px 14px",textAlign:"center",fontSize:16,fontWeight:900,color:"#1A5CA8"}}>{totalScore}/{maxScore}</td></tr>
                      </tbody>
                    </table>

                    {/* Dolores */}
                    <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:10}}>Dolores Identificados</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
                      {d.dolores.length ? d.dolores.map(v=><span key={v} style={{background:"rgba(26,92,168,0.1)",color:"#1A5CA8",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{v.replace(/_/g," ")}</span>) : <span style={{color:"#6B7C93",fontSize:13}}>Ninguno seleccionado</span>}
                    </div>

                    {/* Próximo paso */}
                    <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:10}}>Recomendación de Próximo Paso</div>
                    <div style={{background:"rgba(26,92,168,0.07)",border:"1px solid rgba(26,92,168,0.2)",borderRadius:10,padding:"14px 18px",fontSize:14,fontWeight:700,color:"#1A5CA8",marginBottom:24}}>
                      {ns.icon} &nbsp;{ns.step}
                    </div>

                    {d.notas && <>
                      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:10}}>Notas del Ejecutivo</div>
                      <div style={{background:"#F8FAFC",borderRadius:10,padding:16,borderLeft:"4px solid #6B7C93",fontSize:13,color:"#1A1A2E",lineHeight:1.6,marginBottom:24}}>{d.notas}</div>
                    </>}

                    {/* Objeciones */}
                    <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1,color:"#6B7C93",marginBottom:12}}>Manejo de Objeciones Probables</div>
                    {[
                      d.inversion==="no_ahora" && { q:"No es el momento correcto", a:"Entiendo — pero cada mes sin sistema es ingreso que se pierde. Si el ticket promedio es $"+avgTicket.toLocaleString()+" y solo recuperamos un lead al mes, ya cubrimos el costo. La pregunta real es: ¿cuánto más cuesta no tenerlo?" },
                      d.inversion==="cauteloso" && { q:"Necesito pensarlo más", a:"Perfecto. ¿Qué parte te genera más duda — el ROI, el proceso de implementación o el compromiso? Si me dices qué necesitas ver para avanzar, lo preparamos para ti." },
                      d.intentos_prev.includes("herramientas") && { q:"Ya probé herramientas antes y no funcionó", a:"La diferencia es que nosotros no te vendemos una herramienta — te entregamos el sistema funcionando. El problema con GHL, HubSpot, etc. es que alguien tiene que configurarlos. Nosotros hacemos eso por ti." },
                      d.intentos_prev.includes("agencia") && { q:"Contraté una agencia y no me dio resultados", a:"La mayoría de agencias miden éxito en métricas de vanidad — impresiones, clics, seguidores. Nosotros medimos leads capturados, citas agendadas e ingresos recuperados. Si el sistema no genera ROI en 90 días, seguimos trabajando sin costo adicional." },
                      d.dolores.includes("llamadas_perdidas") && { q:"¿El AI voice agent suena robotizado?", a:"No. Usamos ElevenLabs + VAPI — tecnología de voz natural entrenada con el negocio. Los prospectos regularmente no saben que están hablando con IA hasta que se les dice. Puedes escuchar una demo antes de aprobar." },
                    ].filter(Boolean).map((obj,i) => obj && (
                      <details key={i} style={{border:"1px solid #D8E2EF",borderRadius:12,marginBottom:8,overflow:"hidden"}}>
                        <summary style={{background:"#F2F5F9",padding:"12px 16px",cursor:"pointer",fontSize:13,fontWeight:700,color:"#0D1B2A",listStyle:"none",display:"flex",alignItems:"center",gap:8}}>
                          <span style={{background:"rgba(232,108,44,0.1)",color:"#E86C2C",fontSize:11,fontWeight:800,padding:"2px 10px",borderRadius:20}}>OBJECIÓN</span>
                          {obj.q}
                        </summary>
                        <div style={{padding:"14px 16px",fontSize:13,lineHeight:1.65,color:"#1A1A2E",borderTop:"1px solid #D8E2EF"}}>{obj.a}</div>
                      </details>
                    ))}
                  </div>
                )}

                {/* ── TAB: PROSPECTO ── */}
                {tab === "prospecto" && (
                  <div style={{padding:"28px 32px"}}>
                    <div style={{background:"linear-gradient(135deg,#0D1B2A 0%,#1A3A5C 100%)",borderRadius:14,padding:28,textAlign:"center",marginBottom:24}}>
                      <div style={{fontSize:20,color:"white",fontWeight:800,marginBottom:8}}>
                        Hola{d.nombre ? ", " + d.nombre.split("—")[0].trim() : ""} — aquí está nuestra recomendación
                      </div>
                      <div style={{fontSize:13,color:"#A0B8D8"}}>Basado en nuestra conversación, esto es lo que recomendamos para tu situación específica.</div>
                    </div>
                    <PlanCard planKey={planKey} plan={plan} price={plan.price} setup={plan.setup} showFeatures />
                    {netRoi > 0 && (
                      <div style={{background:"#0D1B2A",borderRadius:14,padding:"22px 26px",color:"white",marginBottom:24}}>
                        <div style={{fontSize:13,color:"#A0B8D8",marginBottom:14}}>¿Qué puede significar esto para tu negocio?</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,textAlign:"center"}}>
                          <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>${recovRev.toLocaleString()}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>Ingreso potencial recuperado/mes</div></div>
                          <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>{roiX}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>ROI estimado</div></div>
                          <div><div style={{fontSize:24,fontWeight:900,color:"#E86C2C"}}>{planCost<=recovRev ? Math.ceil(planCost/recovRev*30)+" días" : "—"}</div><div style={{fontSize:11,color:"#A0B8D8",marginTop:4}}>Tiempo de recuperación</div></div>
                        </div>
                      </div>
                    )}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:8}}>
                      {[["1","Agendar llamada","Confirmamos detalles y hacemos preguntas finales de setup."],["2","Setup en 7–30 días","Nuestro equipo configura todo — tú no tocas nada."],["3","Sistema en vivo","Empieza a capturar leads y responder llamadas automáticamente."]].map(([n,t,d])=>(
                        <div key={n} style={{background:"#F2F5F9",borderRadius:12,padding:16,textAlign:"center",border:"2px solid #D8E2EF"}}>
                          <div style={{width:32,height:32,background:"#1A5CA8",color:"white",borderRadius:"50%",fontSize:14,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}>{n}</div>
                          <div style={{fontSize:13,fontWeight:700,color:"#0D1B2A",marginBottom:4}}>{t}</div>
                          <div style={{fontSize:12,color:"#6B7C93",lineHeight:1.5}}>{d}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── TAB: EMAIL ── */}
                {tab === "email" && (
                  <div style={{padding:"28px 32px"}}>
                    <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"center"}}>
                      <button onClick={copyEmail} style={{...btnStyle,background:"#1A5CA8",color:"white"}}>📋 Copiar al portapapeles</button>
                      <span style={{fontSize:12,color:"#6B7C93"}}>Listo para pegar en Gmail, Outlook o WhatsApp</span>
                    </div>
                    {copied && <div style={{background:"rgba(26,138,90,0.1)",border:"1px solid #1A8A5A",color:"#1A8A5A",borderRadius:8,padding:"10px 16px",textAlign:"center",fontSize:13,fontWeight:700,marginBottom:12}}>✓ Email copiado al portapapeles</div>}
                    <div style={{background:"#FAFBFC",border:"2px solid #D8E2EF",borderRadius:14,overflow:"hidden",fontFamily:"Georgia,'Times New Roman',serif"}}>
                      <div style={{background:"#F0F2F5",borderBottom:"1px solid #D8E2EF",padding:"10px 16px",display:"flex",gap:8,alignItems:"center"}}>
                        {["#FF5F57","#FEBC2E","#28C840"].map(c=><span key={c} style={{width:12,height:12,borderRadius:"50%",background:c,display:"inline-block"}}/>)}
                        <span style={{fontSize:12,color:"#6B7C93",marginLeft:4,fontFamily:"system-ui"}}>Nuevo mensaje</span>
                      </div>
                      <div style={{padding:"12px 18px",borderBottom:"1px solid #D8E2EF",background:"white"}}>
                        <div style={{fontSize:12,padding:"3px 0",fontFamily:"system-ui"}}><span style={{fontWeight:700,color:"#6B7C93",minWidth:40,display:"inline-block"}}>Para:</span> <span style={{color:"#1A1A2E"}}>{d.nombre||"[nombre del prospecto]"}</span></div>
                        <div style={{fontSize:12,padding:"3px 0",fontFamily:"system-ui"}}><span style={{fontWeight:700,color:"#6B7C93",minWidth:40,display:"inline-block"}}>Asunto:</span> <span style={{color:"#1A1A2E"}}>Tu plan de automatización personalizado — Latin Prime Systems</span></div>
                      </div>
                      <pre style={{padding:"20px 22px",background:"white",fontSize:13,lineHeight:1.85,color:"#1A1A2E",whiteSpace:"pre-wrap",fontFamily:"Georgia,serif",margin:0}}>{emailBody}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Card({ header, sub, desc, children }: { header:string; sub:string; desc:string; children:React.ReactNode }) {
  return (
    <div style={{background:"white",borderRadius:16,boxShadow:"0 4px 24px rgba(13,27,42,0.10)",overflow:"hidden"}}>
      <div style={{background:"#0D1B2A",padding:"26px 32px"}}>
        <div style={{fontSize:11,color:"#E86C2C",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{sub}</div>
        <div style={{fontSize:22,color:"white",fontWeight:800,lineHeight:1.3}}>{header}</div>
        <div style={{fontSize:13,color:"#A0B8D8",marginTop:6}}>{desc}</div>
      </div>
      <div style={{padding:"28px 32px"}}>{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label:string; hint?:string; children:React.ReactNode }) {
  return (
    <div style={{marginBottom:24}}>
      <label style={{display:"block",fontSize:13,fontWeight:700,color:"#0D1B2A",marginBottom:hint?4:8}}>
        {label}
        {hint && <span style={{fontSize:11,color:"#6B7C93",fontWeight:400,marginLeft:6}}>({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function BtnRow({ prev, next, nextLabel="Continuar →", nextColor="#1A5CA8" }: { prev?:()=>void; next:()=>void; nextLabel?:string; nextColor?:string }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28}}>
      {prev ? <button onClick={prev} style={{...btnStyle,background:"#F2F5F9",color:"#6B7C93",border:"2px solid #D8E2EF"}}>← Atrás</button> : <div />}
      <button onClick={next} style={{...btnStyle,background:nextColor,color:"white"}}>{nextLabel}</button>
    </div>
  );
}

function PlanCard({ planKey, plan, price, setup, showFeatures=true }: { planKey:string; plan:{ name:string; tag:string; why:string; features:string[] }; price:string; setup:string; showFeatures?:boolean }) {
  const isEnt = planKey === "enterprise";
  return (
    <div style={{border:`3px solid ${isEnt?"#8B5A3C":"#1A5CA8"}`,borderRadius:16,overflow:"hidden",marginBottom:24,position:"relative"}}>
      {isEnt && <div style={{background:"linear-gradient(90deg,#8B5A3C,#A67C52)",color:"white",padding:6,fontSize:11,fontWeight:800,textAlign:"center",letterSpacing:1}}>👑 PLAN RECOMENDADO</div>}
      <div style={{background:isEnt?"linear-gradient(135deg,#8B5A3C,#A67C52)":"#0D1B2A",padding:"20px 26px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:11,color:isEnt?"#FFD580":"#E86C2C",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{plan.tag}</div>
          <div style={{fontSize:22,fontWeight:900,color:"white"}}>{plan.name}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:26,fontWeight:900,color:isEnt?"#FFD580":"#E86C2C"}}>{price}</div>
          {planKey!=="enterprise" && <div style={{fontSize:12,color:"#A0B8D8"}}>por mes</div>}
          <div style={{fontSize:12,color:"#A0B8D8",marginTop:2}}>{setup}</div>
        </div>
      </div>
      <div style={{padding:"20px 26px"}}>
        <div style={{fontSize:14,color:"#1A1A2E",lineHeight:1.65,marginBottom:showFeatures?18:0,padding:16,background:isEnt?"rgba(139,90,60,0.06)":"#F2F5F9",borderRadius:10,borderLeft:`4px solid ${isEnt?"#8B5A3C":"#1A5CA8"}`}}>
          {plan.why}
        </div>
        {showFeatures && (
          <ul style={{listStyle:"none",display:"grid",gap:8}}>
            {plan.features.map((f,i)=>(
              <li key={i} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:13,color:"#1A1A2E"}}>
                <span style={{color:"#1A8A5A",fontWeight:900,flexShrink:0,marginTop:1}}>✓</span>{f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width:"100%",padding:"12px 16px",border:"2px solid #D8E2EF",borderRadius:10,fontSize:14,color:"#1A1A2E",background:"white",outline:"none" };
const btnStyle:   React.CSSProperties = { padding:"12px 24px",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",border:"none",transition:"all 0.2s" };
