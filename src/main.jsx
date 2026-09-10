import React,{Suspense,useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Canvas} from '@react-three/fiber';
import {Float,Environment,ContactShadows,OrbitControls,Text} from '@react-three/drei';
import {motion,AnimatePresence} from 'framer-motion';
import {Home,UserRound,BriefcaseBusiness,Award,GraduationCap,Mail,Phone,Github,Linkedin,Moon,Sun,ArrowRight,Download,ExternalLink,Menu,X,CheckCircle2,MapPin,Code2,ShieldCheck,BookOpen,School} from 'lucide-react';
import './styles.css';

const A=import.meta.env.BASE_URL+'assets/';
const nav=[['home','Home',Home],['about','About Me',UserRound],['projects','Projects',BriefcaseBusiness],['certifications','Certifications',Award],['education','Education',GraduationCap],['contact','Contact',Mail]];
const skills=[['Flutter',90],['Dart',85],['ITLite',75],['PHP',70],['MySQL',85],['HTML',80],['CSS',75],['JavaScript',70],['Bootstrap',60],['jQuery',80],['React',50]];
const projects=[{title:'MangoRipe',sub:'Mobile App · Computer Vision',desc:"A mobile app that uses on-device image detection to classify a mango's ripeness from camera or uploaded photos.",tech:['Flutter','Dart','On-device ML'],image:'mangoThumbnail.png',screens:['mangoripe-01-splash.png','mangoripe-02-detect.png','mangoripe-03-ripe.png','mangoripe-04-partially-ripe.png','mangoripe-05-unripe.png','mangoripe-06-rotten.png'],link:'https://github.com/Lanshiboi/portfolio-resume/releases/download/v1.0.0/Mangoripe-v1.0.1.apk'},{title:'Portfolio Resume',sub:'Web · HTML + CSS + JavaScript',desc:'Responsive portfolio and resume website showcasing skills, projects, certifications, and experience.',tech:['HTML','CSS','JavaScript'],image:'image8.jpg',link:'https://lanshiboi.github.io/portfolio-resume/'},{title:'PHP / XAMPP System',sub:'Web Application',desc:'A simple web-based system built with PHP and MySQL using XAMPP for local development and testing.',tech:['PHP','MySQL','XAMPP'],image:'image7.jpg'}];
const certs=[{title:'Certificate of Completion — OJT',sub:'ZAMECO I, Corplan Department',date:'Jan 26 – May 22, 2026 · 600 hours',image:'image2.jpg',icon:ShieldCheck},{title:'Exploring JavaScript Essentials',sub:'PRMSU–CCIT ASCII',date:'April 26, 2024',image:'image3.jpg',icon:Award}];
const eduList=[
  {icon:GraduationCap,title:'Bachelor of Science in Computer Science',school:'President Ramon Magsaysay State University, Iba, Zambales',date:'2025 – 2026'},
  {icon:School,title:'Senior High School',school:'Lyceum of Western Luzon Inc., Botolan, Zambales',date:'2020 – 2022'},
  {icon:BookOpen,title:'Junior High School',school:'Porac Integrated School',date:'2016 – 2020'},
  {icon:BookOpen,title:'Elementary',school:'Porac Elementary School',date:'2010 – 2016'}
];
const contactRows=[
  {icon:Mail,label:'Email',value:'lansii0430@gmail.com',href:'mailto:lansii0430@gmail.com'},
  {icon:Phone,label:'Phone',value:'0963 707 9906',href:'tel:+639637079906'},
  {icon:MapPin,label:'Location',value:'Porac, Botolan, Zambales'}
];

/* ---------- Reusable: existing 3D artwork, presented as an integrated floating scene element ---------- */
function ArtStage({src,alt,size='lg',glow='center',tilt=0,className=''}){
  return (
    <div className={`art-stage art-${size} ${className}`}>
      <div className={`art-glow glow-${glow}`}/>
      <motion.img
        src={src}
        alt={alt}
        className="art-image"
        style={{rotate:tilt}}
        initial={{opacity:0,y:24}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true,margin:'-80px'}}
        transition={{duration:.7,ease:'easeOut'}}
        animate={{y:[0,-10,0]}}
        // combine entrance + idle float: idle float runs continuously after mount
      />
      <div className="art-shadow"/>
    </div>
  );
}

function StatsRow(){
  const stats=[['1','Project Shipped',BriefcaseBusiness],['600+','OJT Hours',Award],['2','Certifications',ShieldCheck]];
  return (
    <div className="stats">
      {stats.map(([n,label,Icon])=>
        <div key={label} className="stat-card">
          <span className="icon-box"><Icon size={20}/></span>
          <div><b>{n}</b><span>{label}</span></div>
        </div>
      )}
    </div>
  );
}

function TechStack(){
  return (
    <div className="tech-stack glass">
      <span className="mini-label">My Tech Stack</span>
      <div className="chips">
        {skills.map(([name])=><span key={name}><Code2 size={14}/>{name}</span>)}
      </div>
    </div>
  );
}

/* ---------- Scroll-spy: highlights the active sidebar item as the page scrolls ---------- */
function useActiveSection(ids){
  const [active,setActive]=useState(ids[0]);
  useEffect(()=>{
    const els=ids.map(id=>document.getElementById(id)).filter(Boolean);
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); });
    },{rootMargin:'-40% 0px -50% 0px',threshold:0});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[ids]);
  return active;
}

function App(){
  const [dark,setDark]=useState(true);
  const [mobile,setMobile]=useState(false);
  const [selected,setSelected]=useState(null);
  const sectionIds=nav.map(n=>n[0]);
  const active=useActiveSection(sectionIds);

  return (
    <div className={dark?'app dark':'app'}>
      <div className="ambient"/>

      <aside className={mobile?'sidebar open':'sidebar'}>
        <div className="brand"><img src={A+'leaf.png'}/><span>Lansh</span></div>
        <button className="close" onClick={()=>setMobile(false)}><X/></button>
        <nav>
          {nav.map(([id,label,Icon])=>
            <a key={id} href={'#'+id} onClick={()=>setMobile(false)} className={active===id?'navitem active':'navitem'}>
              <Icon size={17}/><span>{label}</span>
              {active===id&&<motion.span layoutId="navdot" className="navdot"/>}
            </a>
          )}
        </nav>
        <div className="side-bottom">
          <button onClick={()=>setDark(!dark)} className="theme"><span>{dark?<Moon size={16}/>:<Sun size={16}/>}</span>{dark?'Dark Mode':'Light Mode'}</button>
          <div className="social">
            <a href="https://github.com/lanshiboi"><Github/></a>
            <a href="https://www.linkedin.com/in/lansh-christian-herrera-43a061431"><Linkedin/></a>
          </div>
        </div>
      </aside>

      <button className="mobile-menu" onClick={()=>setMobile(true)}><Menu/></button>

      <main>
        {/* ===== HOME ===== */}
        <section id="home" className="hero page">
          <div className="hero-top">
            <motion.div className="hero-copy" initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{duration:.7}}>
              <div className="eyebrow">Junior Software Developer</div>
              <h1>Hi, I'm <span>Lansh Christian A. Herrera</span></h1>
              <p className="hero-role">I build simple, functional, and user-friendly applications that solve real problems.</p>
              <div className="actions">
                <a href="#projects" className="btn primary">View My Projects <ArrowRight/></a>
                <a href={A+'LanshHerrera_Resume.pdf'} target="_blank" className="btn ghost">Download Resume <Download/></a>
              </div>
              <div className="tech-row">{['Flutter','Dart','ITLite','React'].map(x=><span key={x}><Code2 size={14}/>{x}</span>)}</div>
            </motion.div>
            <div className="hero-scene">
              <ArtStage src={A+'Robot.png'} alt="Lansh at his coding workspace" size="hero" glow="center"/>
              <div className="scene-label">Build · Learn · Improve</div>
            </div>
          </div>

          <TechStack/>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="page">
          <Header title="About Me" text="A quick profile record covering my objective, strengths, and practical experience."/>
          <div className="about-grid">
            <div className="glass about-card">
              <span className="mini-label">Who I Am</span>
              <div className="profile">
                <img src={A+'image1.jpg'}/>
                <p>Fresh graduate with a Bachelor of Science in Computer Science, seeking an entry-level opportunity to apply my education, training, and projects while continuing to learn and grow as a developer.</p>
              </div>
              <a href={A+'LanshHerrera_Resume.pdf'} target="_blank" className="btn primary">View Resume <ArrowRight/></a>
            </div>
            <div className="glass objective">
              <span className="icon-box"><CheckCircle2 size={20}/></span>
              <span className="mini-label">Objective</span>
              <h3>Ready to learn. Ready to build.</h3>
              <p>Strong computer literacy, accuracy under pressure, fast learning ability, and an interest in software development, data entry, and administrative work.</p>
              <div className="chips">{['Teamwork','Problem Solving','Adaptability','Attention to Detail'].map(x=><span key={x}>{x}</span>)}</div>
            </div>
          </div>

          <StatsRow/>

          <div className="experience glass experience-split">
            <div className="experience-art">
              <ArtStage src={A+'desk.png'} alt="Workspace" size="md" glow="soft"/>
            </div>
            <div className="experience-copy">
              <span className="mini-label">Experience</span>
              <h3>On-the-Job Trainee · ZAMECO I</h3>
              <span className="date">Jan 2026 – May 2026</span>
              <ul>
                <li><CheckCircle2 size={16}/>Performed data entry and encoding of member and billing records.</li>
                <li><CheckCircle2 size={16}/>Processed and organized paper-based documents for daily workflow.</li>
                <li><CheckCircle2 size={16}/>Automated repetitive data tasks with Microsoft Excel VBA.</li>
                <li><CheckCircle2 size={16}/>Assisted staff with general clerical and office support tasks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="page">
          <Header title="My Projects" text="Selected work that demonstrates my practical skills and what I can build."/>
          <div className="featured glass">
            <div className="featured-media">
              <ArtStage src={A+projects[0].image} alt="MangoRipe 3D artwork" size="featured" glow="strong"/>
              <motion.div className="float-phone" animate={{y:[0,-9,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}>
                <img src={A+'mangoripe-03-ripe.png'}/>
              </motion.div>
            </div>
            <div className="featured-copy">
              <span className="badge">Featured Project</span>
              <h3>{projects[0].title}</h3>
              <p className="sub">{projects[0].sub}</p>
              <p>{projects[0].desc}</p>
              <ul>{['Camera / Gallery Image Input','Machine Learning Detection','Real-time Prediction','Clean & Simple UI'].map(x=><li key={x}><CheckCircle2 size={16}/>{x}</li>)}</ul>
              <div className="chips">{projects[0].tech.map(x=><span key={x}>{x}</span>)}</div>
              <button className="btn primary" onClick={()=>setSelected(projects[0])}>View Project <ArrowRight/></button>
            </div>
          </div>
          <div className="project-grid">
            {projects.slice(1).map(p=>
              <motion.article whileHover={{y:-6}} className="glass project-card" key={p.title}>
                <img src={A+p.image}/>
                <h3>{p.title}</h3>
                <p className="sub">{p.sub}</p>
                <p>{p.desc}</p>
                <div className="chips">{p.tech.map(x=><span key={x}>{x}</span>)}</div>
                <button className="text-btn" onClick={()=>setSelected(p)}>View Project <ArrowRight size={15}/></button>
              </motion.article>
            )}
          </div>
        </section>

        {/* ===== CERTIFICATIONS ===== */}
        <section id="certifications" className="page">
          <Header title="Certifications" text="Verified records supporting my technical training and learning."/>
          <div className="cert-layout glass">
            <div className="cert-art">
              <ArtStage src={A+'certificate.png'} alt="Certification artwork" size="md" glow="soft"/>
            </div>
            <div className="cert-grid">
              {certs.map(c=>
                <motion.article whileHover={{y:-6}} className="glass cert-card" key={c.title}>
                  <span className="icon-box"><c.icon size={20}/></span>
                  <div>
                    <h3>{c.title}</h3>
                    <p className="sub">{c.sub}</p>
                    <span className="date">{c.date}</span>
                    <button className="text-btn" onClick={()=>setSelected(c)}>View Certificate <ExternalLink size={15}/></button>
                  </div>
                </motion.article>
              )}
            </div>
          </div>
        </section>

        {/* ===== EDUCATION ===== */}
        <section id="education" className="page">
          <Header title="Education" text="My academic background and training that built my foundation."/>
          <div className="education glass">
            <div className="edu-visual">
              <ArtStage src={A+'graduation.png'} alt="Graduation artwork" size="md" glow="soft"/>
              <span>Learn<br/>Build<br/>Grow</span>
            </div>
            <div className="timeline">
              {eduList.map(e=>
                <div className="timeline-item glass" key={e.title}>
                  <span className="icon-box"><e.icon size={18}/></span>
                  <div><h3>{e.title}</h3><p>{e.school}</p><span className="date">{e.date}</span></div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="page contact">
          <Header title="Let's Work Together" text="Open to IT support, data entry, administrative, and software development opportunities."/>
          <div className="contact-grid">
            <div className="glass contact-card">
              {contactRows.map(r=>{
                const Tag=r.href?'a':'div';
                return <Tag key={r.label} href={r.href}><span className="icon-box"><r.icon size={18}/></span><div><span>{r.label}</span><b>{r.value}</b></div></Tag>;
              })}
              <a className="btn primary" href="mailto:lansii0430@gmail.com">Send Message <ArrowRight/></a>
            </div>
            <div className="glass contact-art">
              <div className="contact-art-bg">
                <ArtStage src={A+'city.png'} alt="Contact artwork" size="md" glow="soft"/>
              </div>
              <div className="contact-art-copy">
                <span className="mini-label">Find Me On</span>
                <h3>Let's connect.</h3>
                <p>See my work, professional profile, and latest projects.</p>
                <div className="big-social">
                  <a href="https://github.com/lanshiboi"><Github/></a>
                  <a href="https://www.linkedin.com/in/lansh-christian-herrera-43a061431"><Linkedin/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>© 2026 Lansh Christian A. Herrera <span>Build · Learn · Improve</span></footer>
      </main>

      {selected&&
        <AnimatePresence>
          <motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}>
            <motion.div className="modal-box glass" initial={{y:30,scale:.96}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()}>
              <button className="modal-close" onClick={()=>setSelected(null)}><X/></button>
              {selected.image&&<img className="modal-image" src={A+selected.image}/>}
              <span className="mini-label">{selected.sub}</span>
              <h2>{selected.title}</h2>
              <p>{selected.desc||selected.sub}</p>
              {selected.screens&&<div className="screens">{selected.screens.map(s=><img key={s} src={A+s}/>)}</div>}
              {selected.link&&<a className="btn primary" href={selected.link} target="_blank">{selected.link.includes('apk')?'Download APK':'Open Project'} <ExternalLink/></a>}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      }
    </div>
  );
}

function Header({title,text}){
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
