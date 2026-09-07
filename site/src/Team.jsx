import {useEffect} from 'react';
import {ArrowRight} from '@phosphor-icons/react';
import {href} from './site.js';
import './team.css';

const advisors = [
  {name:'岩永 朝陽',role:'代表取締役',details:['紹介文：未定'],image:'../representative-asahi.jpg',size:800},
  {
    name: '蔵治 光一郎',
    role: '技術アドバイザー',
    details: ['東京大学大学院', '農学生命科学研究科 教授'],
    image: 'kuraji-koichiro.jpg',
    size: 520,
  },
  {
    name: '髙嶋 洋',
    role: '技術アドバイザー',
    specialty: '環境地質学・水文地質学',
    details: ['第一工科大学 工学部', '環境エンジニアリング学科 教授', 'NPO法人 日本地質汚染審査機構 理事長'],
    image: 'takashima-hiroshi.jpg',
    size: 512,
  },
  {
    name: '久松 慎一',
    role: 'ITアドバイザー',
    details: ['データ解析・UX', 'ITプロフェッショナル'],
    image: 'hisamatsu-shinichi.png',
    size: 512,
  },
];

advisors.push({name:'深本 南',role:'役割：未定',details:['紹介文：未定'],image:'fukamoto-minami.jpg',size:1108,height:1477});

export function TeamSection() {
  useEffect(()=>{
    if(window.location.hash!=='#team')return;
    let active=true;
    // The Vite preview renders after the browser's initial fragment lookup.
    document.fonts.ready.then(()=>{
      if(active&&window.location.hash==='#team'&&window.scrollY===0){
        const section=document.getElementById('team');
        section?.scrollIntoView({block:'start',behavior:'instant'});
        section?.focus({preventScroll:true});
      }
    });
    return ()=>{active=false;};
  },[]);
  return <section id="team" className="about-team content-width" aria-labelledby="team-heading" tabIndex={-1}>
    <header className="team-heading">
      <span className="eyebrow">TEAM &amp; ADVISORS</span>
      <h2 id="team-heading">チーム・アドバイザー</h2>
      <p>多様な専門性をつなぎ、水と自然に向き合う。</p>
    </header>
    <div className="advisor-grid">
      {advisors.map(advisor=><article className="advisor" key={advisor.name}>
        <img className="advisor-photo" src={href(`images/team/${advisor.image}`)} alt={`${advisor.name}（${advisor.role}）`} width={advisor.size} height={advisor.height||advisor.size} loading="lazy" decoding="async"/>
        <div className="advisor-info">
          <h3>{advisor.name}</h3>
          <p className="advisor-role">{advisor.role}</p>
          {advisor.specialty&&<p className="advisor-specialty">{advisor.specialty}</p>}
          <p className="advisor-details">{advisor.details.map(line=><span key={line}>{line}</span>)}</p>
        </div>
      </article>)}
    </div>
  </section>;
}

export function TeamIntro() {
  return <section className="home-team content-width" aria-labelledby="home-team-heading">
    <div>
      <span className="eyebrow">TEAM &amp; ADVISORS</span>
      <h2 id="home-team-heading">専門家とともに、<br className="mobile-only"/>水と自然に向き合う。</h2>
      <p>水と森林、地質、IT。それぞれの知見を持ち寄ります。</p><span className="home-team-names">岩永 朝陽 ／ 蔵治 光一郎 ／ 髙嶋 洋 ／ 久松 慎一 ／ 深本 南</span>
    </div>
    <a className="text-link team-link" href={href('about/#team')}>チームを知る<ArrowRight size={24} weight="thin" aria-hidden="true"/></a>
  </section>;
}
