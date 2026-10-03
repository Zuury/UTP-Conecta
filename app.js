const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const jobs=[
{id:1,ini:'BG',t:'Diseñador/a UX/UI Junior',co:'Banco General',loc:'Ciudad de Panamá · Híbrido',lvl:'Sin experiencia',tags:['Primer empleo','Empresa'],cats:['Primer empleo','Tecnología'],pay:'$1,200 – $1,600',ago:'Hace 2 horas',ok:1},
{id:2,ini:'D',t:'Practicante de Ingeniería de Software',co:'Dell Technologies',loc:'Remoto · Panamá',lvl:'Estudiante',tags:['Pasantía','Empresa'],cats:['Pasantía','Tecnología'],pay:'$800 – $1,000',ago:'Hace 5 horas',ok:1},
{id:3,ini:'UTP',t:'Asistente de investigación en IA',co:'Universidad Tecnológica de Panamá',loc:'Campus Víctor Levi Sasso',lvl:'Estudiante',tags:['Proyecto','Profesor'],cats:['Proyecto','Tecnología'],pay:'Proyecto académico',ago:'Ayer',ok:1},
{id:4,ini:'C',t:'Analista de Datos Junior',co:'Copa Airlines',loc:'Ciudad de Panamá · Presencial',lvl:'0–1 años',tags:['Primer empleo','Empresa'],cats:['Primer empleo','Tecnología'],pay:'$1,300 – $1,700',ago:'Ayer',ok:1},
{id:5,ini:'FI',t:'Seminario: Innovación sostenible',co:'Facultad de Ingeniería Industrial',loc:'Campus central · Presencial',lvl:'Todos los niveles',tags:['Seminario','Profesor'],cats:['Seminario'],pay:'Gratuito',ago:'Hace 2 días',ok:0}];
let threads=[
{id:1,cat:'Entrevistas',t:'¿Cómo prepararse para una entrevista técnica en Panamá?',au:'María G.',role:'Egresada 2024',v:42,c:18,ago:'Hace 2 horas'},
{id:2,cat:'Salarios',t:'Compartamos rangos salariales para puestos junior en tecnología',au:'Anónimo',role:'Egresado UTP',v:36,c:24,ago:'Hace 5 horas'},
{id:3,cat:'Reseñas de Empresas',t:'Mi experiencia trabajando en una empresa de tecnología local',au:'Carlos R.',role:'Egresado 2023',v:28,c:12,ago:'Ayer'},
{id:4,cat:'Recomendaciones',t:'Recursos gratuitos para aprender análisis de datos',au:'Prof. Elena M.',role:'Docente UTP',v:19,c:9,ago:'Ayer'},
{id:5,cat:'Referencias Laborales',t:'¿Alguien puede referirme para una pasantía en desarrollo?',au:'Jorge P.',role:'Estudiante',v:14,c:7,ago:'Hace 2 días'}];
const resources=[
['file-text','Plantilla de CV','Plantilla de CV profesional','Un formato claro y moderno para destacar tus habilidades y experiencia.','DOCX · 120 KB'],
['message-circle','Guías de carrera','Guía para entrevistas de trabajo','Preguntas frecuentes, consejos prácticos y cómo responder con confianza.','PDF · 2.4 MB'],
['building','Convenios','Convenios empresariales UTP','Conoce las organizaciones aliadas y sus beneficios para la comunidad UTP.','PDF · 1.8 MB'],
['pen-line','Plantilla de CV','Plantilla de carta de presentación','Presenta tu historia profesional y causa una excelente primera impresión.','DOCX · 85 KB'],
['globe','Guías de carrera','Prepara tu perfil de LinkedIn','Optimiza tu presencia profesional paso a paso, desde el titular hasta la red.','PDF · 1.1 MB'],
['briefcase','Convenios','Directorio de empresas aliadas','Explora empresas que apuestan por el talento de la Universidad Tecnológica.','PDF · 950 KB']];
const events=[['28','MAY','Taller','Tu primer CV que destaca','3:00 p.m. · En línea'],['03','JUN','Webinar','Entrevistas técnicas con egresados','5:00 p.m. · En línea']];
let saved=store.get('saved',[2]), votes=store.get('votes',[]), state={jf:'Todas',q:'',tf:'Todos',rf:'Todos',pt:'Actividad',form:'op',role:'Estudiante'};
const ico=n=>`<i data-lucide="${n}"></i>`;
const tagCls=t=>({'Primer empleo':'c-p','Pasantía':'c-b','Seminario':'c-o'}[t]||'');
const jobCard=j=>`<article class="card job"><div class="job-h"><span class="logo">${j.ini}</span><button class="save ${saved.includes(j.id)?'on':''}" data-a="save" data-id="${j.id}" aria-label="Guardar">${ico('bookmark')}</button></div>
<h3>${j.t}${j.ok?ico('circle-check'):''}</h3><div class="meta">${j.co}</div>
<div class="meta">${ico('map-pin')}${j.loc}</div><div class="meta">${ico('briefcase')}${j.lvl}</div>
<div>${j.tags.map(t=>`<span class="chip ${tagCls(t)}">${t}</span>`).join(' ')}</div>
<div class="job-f"><div><b>${j.pay}</b><small>${j.ago}</small></div><a class="go" href="#" data-a="apply" data-id="${j.id}">${ico('arrow-right')}</a></div></article>`;
const filtered=()=>jobs.filter(j=>(state.jf==='Todas'||j.cats.includes(state.jf))&&(j.t+j.co+j.tags).toLowerCase().includes(state.q.toLowerCase()));
const threadRow=t=>`<div class="thread"><button class="vote ${votes.includes(t.id)?'on':''}" data-a="vote" data-id="${t.id}">▲<br>${t.v+(votes.includes(t.id)?1:0)}</button>
<div style="flex:1"><span class="chip c-p">${t.cat}</span><h3>${t.t}</h3><div class="meta"><span>${t.au} · ${t.role}</span><span>${ico('message-circle')} ${t.c}</span></div></div><small class="meta">${t.ago}</small></div>`;
const head=(e,t,s,x='')=>`<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap"><div><p class="eyebrow">${e}</p><h1>${t}<span>.</span></h1><p class="sub">${s}</p></div>${x}</div>`;
const filters=(list,cur,k)=>`<div class="filters">${list.map(f=>`<button class="f ${f===cur?'on':''}" data-a="filter" data-k="${k}" data-v="${f}">${f}</button>`).join('')}</div>`;

const views={
inicio:()=>`<p class="eyebrow" style="color:var(--m)">${new Date().toLocaleDateString('es-PA',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
<div class="grid g2" style="margin-top:16px"><div><section class="hero"><span class="chip" style="background:rgba(255,255,255,.15);color:#fff">✦ Tu siguiente paso comienza aquí</span>
<h1 style="margin-top:16px">Conecta con lo que <span>viene.</span></h1><p>Oportunidades, personas y recursos para llevar tu talento más lejos.</p>
<form class="search" data-a="hsearch">${ico('search')}<input name="q" placeholder="Busca empleos, habilidades o empresas..." aria-label="Buscar"><button class="btn">Buscar ${ico('arrow-right')}</button></form>
<div class="filters" style="margin:16px 0 0"><small>Explora:</small>${['Pasantía','Primer empleo','Convenios UTP','Seminario'].map(c=>`<a class="f" href="#oportunidades" data-a="quick" data-v="${c}">${c}</a>`).join('')}</div></section>
<div class="grid g3" style="margin:20px 0">${[['briefcase','1,240+','Oportunidades activas'],['users','8,500+','Miembros conectados'],['building','320+','Empresas aliadas']].map(s=>`<div class="card stat"><span class="ico">${ico(s[0])}</span><div><b>${s[1]}</b><small>${s[2]}</small></div></div>`).join('')}</div>
<p class="eyebrow">Recomendadas</p><h2>Oportunidades para ti</h2><div class="grid g32">${jobs.slice(0,2).map(jobCard).join('')}</div>
<p class="eyebrow" style="margin-top:28px">Aprende en comunidad</p><h2>Conversaciones que inspiran</h2><div class="card">${threads.slice(0,3).map(threadRow).join('')}</div></div>
<aside><p class="eyebrow">Para ti</p><div class="card" style="margin:12px 0 24px"><span class="av">AC</span><h3 style="margin-top:12px">¡Vas por buen camino, Andrea!</h3><p class="sub" style="margin:6px 0">Un perfil completo abre más puertas.</p><div class="bar"><i style="width:75%"></i></div><a class="link" href="#perfil">Completar mi perfil →</a></div>
<p class="eyebrow">Próximos eventos</p>${events.map(e=>`<div class="card stat" style="margin-top:12px"><span class="ico" style="flex-direction:column;font-weight:800;line-height:1">${e[0]}<small style="font-size:10px">${e[1]}</small></span><div><span class="chip c-o">${e[2]}</span><br><b style="font-size:14px">${e[3]}</b><small>${e[4]}</small></div></div>`).join('')}
<div class="card" style="margin-top:20px;background:var(--soft)"><h3>El futuro se construye en comunidad.</h3><p class="sub">Conoce a quienes ya recorrieron tu camino.</p><a class="link" href="#comunidad">Explorar comunidad →</a></div></aside></div>`,

oportunidades:()=>{const l=filtered();return head('Explora tu próximo paso','Oportunidades para ti','Encuentra el lugar donde tus ideas y tu talento pueden crecer.',`<a href="#publicar" class="btn b1">+ Publicar oportunidad</a>`)+
`<div class="card search" style="padding:10px">${ico('search')}<input id="q" value="${state.q}" placeholder="Cargo, empresa o palabra clave" aria-label="Buscar"><span class="meta">${ico('map-pin')}Panamá y remoto</span></div>
<div class="filters"><small>Filtrar por:</small>${['Todas','Primer empleo','Pasantía','Tecnología','Seminario','Proyecto'].map(f=>`<button class="f ${f===state.jf?'on':''}" data-a="filter" data-k="jf" data-v="${f}">${f}</button>`).join('')}</div>
<h2>${l.length} oportunidades encontradas</h2><p class="sub">Publicaciones de empresas y docentes de la comunidad UTP</p>
<div class="grid g3" id="jobs">${l.map(jobCard).join('')||'<p class="sub">Sin resultados.</p>'}</div>
<div class="banner" style="background:var(--soft);color:var(--t);margin-top:28px"><div><b>¿Buscas tu primera experiencia?</b><p class="sub" style="margin:0">Descubre oportunidades creadas para dar el primer paso.</p></div><button class="btn bw" data-a="quick" data-v="Primer empleo">Explorar primer empleo</button></div>`},

comunidad:()=>{const l=threads.filter(t=>state.tf==='Todos'||t.cat===state.tf);return head('Conexiones que importan','La comunidad UTP','Pregunta, comparte y aprende de quienes están en tu mismo camino.',`<a class="btn b1" href="#publicar" data-a="forum">+ Crear tema</a>`)+
`<div class="banner"><div><b>Tu experiencia puede abrirle puertas a alguien más.</b></div><a class="btn bw" href="#publicar" data-a="forum">Iniciar conversación →</a></div>
<p class="eyebrow">Conversaciones recientes</p><h2>Explora los temas</h2>${filters(['Todos','Entrevistas','Salarios','Referencias Laborales','Reseñas de Empresas','Recomendaciones'],state.tf,'tf')}
<div class="grid g2"><div class="card">${l.map(threadRow).join('')||'<p class="sub">No hay temas.</p>'}</div>
<aside><div class="card"><p class="eyebrow">Nuestra comunidad</p><h3 style="margin:8px 0">Un lugar para avanzar juntos</h3><p class="meta" style="padding:10px 0">${ico('users')}<b>8,500+</b> miembros</p><p class="meta" style="padding:10px 0">${ico('message-circle')}<b>2,400+</b> conversaciones</p><p class="meta" style="padding:10px 0">${ico('heart')}<b>100%</b> ganas de ayudar</p></div>
<div class="card" style="background:var(--soft);margin-top:16px;color:var(--m)">Sé amable, comparte con respeto y haz de este un espacio para todos.</div></aside></div>`},

recursos:()=>{const l=resources.filter(r=>state.rf==='Todos'||r[1]===state.rf);return head('Aprende y prepárate','Recursos para crecer','Herramientas prácticas para cada etapa de tu camino profesional.')+
`<div class="feat"><span class="chip c-p">✦ Recurso destacado</span><h2 style="margin-top:14px">Tu mejor versión empieza con un gran CV.</h2><p class="sub">Crea un perfil que cuente tu historia y abra nuevas oportunidades.</p><a class="btn b1" href="#perfil" data-a="cv">→ Crear mi CV</a></div>
<p class="eyebrow">Biblioteca UTP</p><h2>Encuentra lo que necesitas</h2>${filters(['Todos','Plantillas de CV','Guías de carrera','Convenios'],state.rf,'rf')}
<div class="grid g3">${l.map((r,i)=>`<article class="card res"><span class="ico">${ico(r[0])}</span><br><span class="chip" style="margin-top:12px">${r[1]}</span><h3>${r[2]}</h3><p>${r[3]}</p><div class="job-f"><small>${r[4]}</small><button class="go" data-a="download" data-n="${r[2]}" aria-label="Descargar">${ico('download')}</button></div></article>`).join('')}</div>`},

perfil:()=>{const sv=jobs.filter(j=>saved.includes(j.id));const tabs={
Actividad:`<h3>Tu camino hasta ahora</h3><ul class="tl" style="margin-top:20px"><li><b>Perfil verificado por UTP</b><p>Ya eres parte de nuestra comunidad profesional.</p><small>Hoy</small></li><li><b>Postulación enviada a Dell Technologies</b><p>Practicante de Ingeniería de Software</p><small>18 de mayo de 2026</small></li><li><b>Te uniste a UTP-Conecta</b><p>El primer paso hacia nuevas oportunidades.</p><small>12 de mayo de 2026</small></li></ul>`,
Postulaciones:`<p>1 postulación activa: <b>Dell Technologies</b> — En revisión.</p>`,
Guardados:sv.length?`<div class="grid g32">${sv.map(jobCard).join('')}</div>`:'<p class="sub">Aún no guardas oportunidades.</p>'};
return `<div class="grid g2"><div><div class="card"><div class="cover"></div><span class="av big-av">AC</span><span class="chip c-g" style="float:right;margin-top:-20px">✔ Verificada UTP</span>
<h2 style="margin-top:12px;font-size:26px">Andrea Castillo</h2><p class="sub" style="margin:0">Estudiante de Ingeniería en Sistemas Computacionales</p><p class="meta" style="margin:8px 0 14px">${ico('map-pin')}Ciudad de Panamá · Universidad Tecnológica de Panamá</p>
<span class="chip c-p">Diseño UX/UI</span> <span class="chip c-b">React</span> <span class="chip c-o">Investigación</span> <button class="chip" data-a="skill" style="border:1px dashed var(--m)">+ Agregar habilidad</button>
<div class="card" style="box-shadow:none;background:var(--bg);margin-top:18px;padding:16px"><b>Tu perfil está al 75%</b><div class="bar"><i style="width:75%"></i></div></div></div>
<div class="tabs">${['Actividad','Postulaciones','Guardados'].map(t=>`<button class="${t===state.pt?'on':''}" data-a="ptab" data-v="${t}">${t}${t==='Guardados'?` <span class="chip c-p">${sv.length}</span>`:''}</button>`).join('')}</div><div class="card">${tabs[state.pt]}</div></div>
<aside><div class="card"><span class="ico">${ico('file-text')}</span><h3 style="margin:12px 0 6px">Tu CV, tu mejor carta de presentación.</h3><p class="sub">Crea un CV profesional con la información de tu perfil.</p><button class="btn b1" style="width:100%;justify-content:center" data-a="cv">→ Crear mi CV</button></div>
<div class="card" style="margin-top:20px"><h3>Acerca de mí</h3><p class="sub" style="margin:8px 0">Me apasiona crear experiencias digitales que resuelvan problemas reales.</p><p class="meta" style="padding:6px 0">${ico('mail')}andrea.castillo@utp.ac.pa</p><p class="meta">${ico('link')}linkedin.com/in/andreacastillo</p></div></aside></div>`},

publicar:()=>{const op=state.form==='op';return head('Comparte con la comunidad','Crear publicación','Las buenas oportunidades y conversaciones comienzan aquí.')+
`<div class="filters"><button class="f ${op?'on':''}" data-a="ftab" data-v="op">${ico('briefcase')} Oportunidad</button><button class="f ${!op?'on':''}" data-a="ftab" data-v="foro">${ico('message-circle')} Tema en el foro</button></div>
<div class="grid g2"><form class="card" id="form" novalidate>${op?`<h2>Publica una oportunidad</h2>
<label>Título de la oportunidad <b>*</b></label><input name="titulo" required placeholder="Ej. Pasantía en desarrollo de software">
<div class="row"><div><label>Tipo de oportunidad <b>*</b></label><select name="tipo" required><option value="">Selecciona una opción</option><option>Pasantía</option><option>Full-time</option><option>Seminario</option><option>Proyecto</option></select></div><div><label>Empresa o facultad <b>*</b></label><input name="empresa" required placeholder="Nombre de la organización"></div></div>
<div class="row"><div><label>Ubicación</label><input name="ubi" placeholder="Ej. Ciudad de Panamá"></div><div><label>Modalidad</label><select><option>Híbrido</option><option>Presencial</option><option>Remoto</option></select></div></div>
<label>Descripción y requisitos <b>*</b></label><textarea name="desc" required rows="6" placeholder="Cuéntale a la comunidad sobre el rol, responsabilidades y habilidades necesarias..."></textarea>
<div class="switch"><div><b>Convenio UTP</b><br><small>Esta oportunidad forma parte de un convenio institucional.</small></div><input type="checkbox" role="switch"></div>`
:`<h2>Crea un tema en el foro</h2><label>Tema <b>*</b></label><select name="tema" required><option value="">Selecciona un tema</option>${['Entrevistas','Salarios','Referencias Laborales','Reseñas de Empresas','Recomendaciones'].map(c=>`<option>${c}</option>`).join('')}</select>
<label>Título <b>*</b></label><input name="titulo" required placeholder="¿Sobre qué quieres conversar?">
<label>Contenido <b>*</b></label><div class="tools"><button type="button" data-a="fmt" data-c="bold"><b>B</b></button><button type="button" data-a="fmt" data-c="italic"><i>I</i></button><button type="button" data-a="fmt" data-c="insertUnorderedList">• Lista</button></div><div class="editor" id="ed" contenteditable="true" role="textbox" aria-label="Contenido"></div>
<div class="switch"><div><b>Publicar de forma anónima</b><br><small>Recomendado para salarios y reseñas de empresas.</small></div><input type="checkbox" role="switch"></div>`}
<div class="acts"><a href="#inicio" class="btn b4">Cancelar</a><button class="btn b1">${op?'Enviar a revisión':'Publicar tema'}</button></div></form>
<aside><div class="card"><span class="ico">${ico('sparkles')}</span><h3 style="margin:12px 0">Consejos para una gran publicación</h3><p class="sub">Un título claro y una descripción detallada ayudan a conectar con las personas adecuadas.</p><ul style="padding-left:18px;color:var(--m);line-height:1.9"><li>Usa un lenguaje claro e inclusivo.</li><li>Comparte los detalles importantes.</li><li>Revisa antes de publicar.</li></ul></div>
<p class="meta" style="margin-top:14px;color:#15803D">${ico('circle-check')}Las oportunidades son revisadas para mantener segura a nuestra comunidad.</p></aside></div>`},

kit:()=>`<div class="hero" style="margin-bottom:32px"><p class="eyebrow" style="color:#E9A8F3">UTP-Conecta</p><h1 style="font-size:36px">Del primer paso a nuevas posibilidades.</h1><p style="margin:0">Un ecosistema para descubrir oportunidades, compartir conocimiento y construir una carrera con propósito.</p></div>
<p class="eyebrow">01 / Experiencia</p><h2>Mapa de flujo de usuario</h2><div class="grid g4">${[['user','Acceso','Registro por rol e inicio de sesión con SSO UTP y correo.'],['layout-grid','Descubrimiento','Inicio personalizado con búsqueda, filtros y recomendaciones.'],['briefcase','Acción','Guardar, postularse, participar en temas o publicar oportunidades.'],['trending-up','Seguimiento','Crear CV, mejorar el perfil y seguir cada postulación.']].map((s,i)=>`<div class="card step"><small>0${i+1}</small><br><span style="color:var(--p)">${ico(s[0])}</span><h3 style="margin:10px 0 6px">${s[1]}</h3><p class="sub" style="font-size:12px;margin:0">${s[2]}</p></div>`).join('')}</div>
<p class="eyebrow" style="margin-top:32px">02 / Identidad</p><div class="grid g32" style="margin-top:12px"><div class="card"><h3 style="margin-bottom:16px">Paleta de color</h3>${[['#5B1463','Púrpura UTP · Primario'],['#9C27B0','Violeta vibrante · Acento'],['#F8F9FA','Blanco cálido · Superficie'],['#1E293B','Pizarra oscuro · Texto']].map(c=>`<div class="pal"><i style="background:${c[0]}"></i><div><b>${c[1].split(' · ')[0]}</b><br><small class="sub">${c[0]} · ${c[1].split(' · ')[1]}</small></div></div>`).join('')}</div>
<div class="card"><h3>Tipografía & forma</h3><p style="font-size:72px;font-weight:800;color:var(--p);line-height:1.1">Aa</p><b>Inter</b><p class="sub">Una voz clara y cercana, desde el titular hasta el detalle.</p><span class="chip c-p">Tarjetas redondeadas · 16px</span></div></div>
<p class="eyebrow" style="margin-top:32px">03 / Componentes</p><h2>Elementos reutilizables</h2><div class="grid g3"><div class="card"><h3>Botones</h3><div style="display:grid;gap:10px;justify-items:start;margin-top:14px"><button class="btn b1">Acción principal →</button><button class="btn b2">Acción secundaria</button><button class="btn b3">Acción alternativa</button><button class="btn b4">Acción de texto</button></div></div>
<div class="card"><h3>Campos & etiquetas</h3><label>Correo electrónico</label><input placeholder="nombre@utp.ac.pa"><label>Buscar</label><input placeholder="Encuentra tu oportunidad"><p style="margin-top:14px"><span class="chip c-g">✔ Verificado UTP</span> <span class="chip c-p">Primer empleo</span> <span class="chip c-b">Pasantía</span> <span class="chip c-o">Seminario</span></p></div>
<div class="card"><h3>Navegación & superficies</h3><nav style="margin:12px 0"><a class="on" href="#kit">${ico('layout-grid')}Inicio</a><a href="#kit">${ico('briefcase')}Vacantes</a><a href="#kit">${ico('users')}Foro</a></nav><button class="btn b3" data-a="demo">Ver ejemplo de modal</button></div></div>`};

const titles={inicio:'Inicio',oportunidades:'Oportunidades',comunidad:'Comunidad',recursos:'Recursos',perfil:'Mi perfil',publicar:'Crear publicación',kit:'Mapa y UI kit'};
function render(){const r=(location.hash||'#inicio').slice(1);const k=views[r]?r:'inicio';
 $('#view').innerHTML=views[k]();$('#crumb').textContent=titles[k];document.title=titles[k]+' · UTP-Conecta';
 $$('nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===k));$('#sidebar').classList.remove('open');
 if(window.lucide)lucide.createIcons();}
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.id);toast.id=setTimeout(()=>t.hidden=true,2600)}
function modal(html){const m=$('#modal');m.innerHTML=`<div class="card" role="dialog" aria-modal="true">${html}</div>`;m.hidden=false;if(window.lucide)lucide.createIcons()}
const close=()=>$('#modal').hidden=true;
const loginHtml=()=>`<h2>Bienvenido a UTP-Conecta</h2><p class="sub">Elige tu rol para continuar.</p><div class="roles">${['Estudiante','Empresa','Profesor'].map(r=>`<button class="${r===state.role?'on':''}" data-a="role" data-v="${r}">${r==='Estudiante'?'Estudiante / Egresado':r}</button>`).join('')}</div>
<button class="btn b1" style="width:100%;justify-content:center" data-a="sso">Continuar con SSO UTP</button><p class="sub" style="text-align:center;margin:14px 0">o con tu correo</p>
<form data-a="loginf"><input type="email" required placeholder="nombre@utp.ac.pa" aria-label="Correo"><input type="password" required placeholder="Contraseña" style="margin-top:10px" aria-label="Contraseña"><div class="acts"><button type="button" class="btn b4" data-a="close">Cancelar</button><button class="btn b1">Ingresar</button></div></form>`;

document.addEventListener('click',e=>{
 const el=e.target.closest('[data-a]');if(!el){if(e.target.id==='modal')close();return}
 const a=el.dataset.a,v=el.dataset.v,id=+el.dataset.id;
 if(a==='menu')return $('#sidebar').classList.toggle('open');
 if(a==='login'){e.preventDefault();state.role='Estudiante';return modal(loginHtml())}
 if(a==='role'){state.role=v;return modal(loginHtml())}
 if(a==='close')return close();
 if(a==='sso'){close();return toast('Sesión iniciada con SSO UTP (demo)')}
 if(a==='demo')return modal(`<h2>Una oportunidad te espera</h2><p class="sub">Tarjetas · sombras suaves · acciones claras.</p><div class="acts"><button class="btn b4" data-a="close">Cerrar</button><button class="btn b1" data-a="close">Entendido</button></div>`);
 if(a==='save'){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];store.set('saved',saved);toast(saved.includes(id)?'Oportunidad guardada':'Quitada de guardados');return render()}
 if(a==='apply'){e.preventDefault();const j=jobs.find(x=>x.id===id);return modal(`<h2>${j.t}</h2><p class="sub">${j.co} · ${j.loc}</p><p>¿Deseas postularte con tu perfil actual?</p><div class="acts"><button class="btn b4" data-a="close">Cancelar</button><button class="btn b1" data-a="sent">Postularme</button></div>`)}
 if(a==='sent'){close();return toast('¡Postulación enviada!')}
 if(a==='vote'){votes=votes.includes(id)?votes.filter(x=>x!==id):[...votes,id];store.set('votes',votes);return render()}
 if(a==='filter'){state[el.dataset.k]=v;return render()}
 if(a==='quick'){state.jf=v;state.q='';if(location.hash!=='#oportunidades')return;return render()}
 if(a==='ptab'){state.pt=v;return render()}
 if(a==='ftab'){state.form=v;return render()}
 if(a==='forum'){state.form='foro';return}
 if(a==='download'){return toast('Descargando: '+el.dataset.n+' (demo)')}
 if(a==='cv'){return toast('Constructor de CV próximamente')}
 if(a==='skill'){const s=prompt('Nueva habilidad:');if(s)toast('Habilidad agregada: '+s)}
 if(a==='fmt'){e.preventDefault();document.execCommand(el.dataset.c)}
});
document.addEventListener('input',e=>{if(e.target.id==='q'){state.q=e.target.value;const p=e.target.selectionStart;$('#jobs').innerHTML=filtered().map(jobCard).join('')||'<p class="sub">Sin resultados.</p>';lucide.createIcons()}});
document.addEventListener('submit',e=>{
 e.preventDefault();const f=e.target,a=f.dataset.a;
 if(a==='hsearch'){state.q=f.q.value;state.jf='Todas';location.hash='#oportunidades';return}
 if(a==='loginf'){close();return toast('Sesión iniciada como '+state.role)}
 if(f.id==='form'){let ok=true;$$('[required]',f).forEach(x=>{const bad=!x.value.trim();x.classList.toggle('err',bad);if(bad)ok=false});
  const ed=$('#ed');if(ed){const bad=!ed.textContent.trim();ed.classList.toggle('err',bad);if(bad)ok=false}
  if(!ok)return toast('Completa los campos obligatorios');
  toast(state.form==='op'?'Enviada a revisión. ¡Gracias!':'Tema publicado');f.reset();if(ed)ed.innerHTML=''}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
addEventListener('hashchange',render);addEventListener('DOMContentLoaded',render);
addEventListener('load',()=>window.lucide&&lucide.createIcons());
