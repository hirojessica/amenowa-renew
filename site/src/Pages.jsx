import React,{useState} from 'react';
import {CaretDown, Check, MagnifyingGlass} from '@phosphor-icons/react';
import {services,href,formatDate} from './site.js';
import posts from './generated/news.json';
import {Media,Arrow,Button,PageIntro,WorkLinks,ContactCTA} from './App.jsx';
import {TeamSection} from './Team.jsx';
import {ArticleSource} from './ContentPages.jsx';
import {ArrowUpRight} from '@phosphor-icons/react';
export {Contact} from './Contact.jsx';
const companyBusinessActivities = [
  'AquaInsights（水と自然を知るためのプラットフォーム）',
  'MEGURU（環境活動を実行につなげるプラットフォーム）',
  '水・自然資本に関するコンサルティング',
  '現場実装・環境教育',
  '情報開示・ブランディング'
];
export function Works(){return <><PageIntro label="WORKS" title="水の課題に、向き合う。" description="水を知り、使い方を考え、循環を育てる。課題に応じた支援をご提案します。"/><section className="services-index content-width">{services.map((s,i)=><article className="service-index" key={s.slug}><a href={href(`works/${s.slug}/`)} className="service-index-image" aria-label={`${s.name}を見る`}><Media name={s.image}/></a><div><span className="eyebrow">0{i+1} / {s.english}</span><h2><a href={href(`works/${s.slug}/`)}>{s.name}</a></h2><p>{s.intro}</p><a className="text-link" href={href(`works/${s.slug}/`)}>詳しく見る<Arrow/></a></div></article>)}</section><ContactCTA/></>;}
export function Service({service:s}){return <><div className="breadcrumb content-width"><a href={href()}>HOME</a><span>/</span><a href={href('works/')}>WORKS</a><span>/</span><span>{s.name}</span></div><section className="service-hero"><div><span className="eyebrow">{s.english}</span><p className="service-name">{s.name}</p><h1>{s.headline.map(l=><span key={l}>{l}</span>)}</h1><p>{s.intro}</p><a className="text-link" href="#support">支援内容を見る<CaretDown size={20} weight="thin"/></a></div><Media name={s.image}/></section><section className="service-lead content-width"><span className="eyebrow">OUR APPROACH</span><h2>{s.lead}</h2><p>{s.body}</p></section><section id="support" className="support-section content-width"><div className="section-heading"><div><span className="eyebrow">WHAT WE DO</span><h2>支援内容</h2></div></div><div className="support-grid">{s.items.map(([t,b],i)=><article key={t}><span className="support-number">0{i+1}</span><h3>{t}</h3><p>{b}</p></article>)}</div><Media className="service-diagram" name={`${s.name}の説明図`} ratio="2.5"/></section><section className="deliverables content-width"><h2>ご相談いただけること</h2><ul>{s.deliverables.map(t=><li key={t}><Check weight="light" aria-hidden="true"/>{t}</li>)}</ul></section><section className="related-works content-width"><span className="eyebrow">RELATED WORKS</span><h2>その他の事業</h2><WorkLinks except={s.slug}/></section><ContactCTA/></>;}
export function About(){return <><PageIntro label="ABOUT" title="amenowa ― 天の環" description="自然と人、科学と事業、企業と地域をつなぐ。"/><section className="about-mission content-width"><Media name="水・森林・地域の風景"/><div><span className="eyebrow">OUR MISSION</span><h2>水と自然を知る。<br/>守り、育てる。<br/>未来につなぐ。</h2><p>amenowaは「天の環」。「天」は水、「環」は循環。水と自然、人の営みのつながりを見つめています。</p><p>企業や自治体とともに、水や自然の状態を理解し、地域の行動につなげ、その成果を社会へ伝える会社です。</p></div></section><section className="about-message content-width"><div><span className="eyebrow">MESSAGE</span><h2>まず、知ることから。<br/>ともに、未来へ。</h2><p className="signature">株式会社amenowa<br/>代表取締役 <span>岩永 朝陽</span></p></div><img className="representative-photo" src={href('images/representative-asahi.jpg')} alt="株式会社amenowa 代表取締役 岩永 朝陽" width="800" height="800" loading="lazy" decoding="async"/></section><TeamSection/><section className="company-section content-width"><span className="eyebrow">COMPANY</span><h2>会社概要</h2><dl className="information-list"><div><dt>会社名</dt><dd>株式会社amenowa</dd></div><div><dt>代表者</dt><dd>代表取締役 岩永 朝陽</dd></div><div><dt>事業内容</dt><dd><ul className="company-business-list">{companyBusinessActivities.map(activity=><li key={activity}>{activity}</li>)}</ul></dd></div><div><dt>所在地</dt><dd>山梨県北杜市大泉町西井出8240</dd></div><div><dt>設立日</dt><dd><time dateTime="2023-11-23">2023年11月23日</time></dd></div></dl></section><ContactCTA/></>;}
export function NewsRows({items}){return <div className="news-rows">{items.map(p=><a className="news-row" href={p.externalUrl||href(`news/${p.slug}/`)} aria-label={p.externalUrl?`${p.title}（外部記事）`:undefined} key={p.slug}><time dateTime={p.date}>{formatDate(p.date)}</time><span className="category-label">{p.category}</span><h3>{p.title}</h3>{p.externalUrl?<ArrowUpRight size={26} weight="thin" aria-hidden="true"/>:<Arrow size={26}/>}</a>)}</div>;}
export function News(){const[category,setCategory]=useState('すべて'),[query,setQuery]=useState(''),[page,setPage]=useState(1);const cats=['すべて','お知らせ','ブログ','プレスリリース'];const filtered=posts.filter(p=>(category==='すべて'||p.category===category)&&`${p.title} ${p.excerpt}`.includes(query.trim()));const pages=Math.ceil(filtered.length/6);return <><PageIntro label="INSIGHTS" title="お知らせ" description="水と自然を知り、行動につなげる。amenowaからの情報と読みもの。"/><section className="news-section content-width"><div className="news-controls"><div className="category-filters" aria-label="記事カテゴリー">{cats.map(c=><button key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setPage(1);}}>{c}</button>)}</div><label className="news-search"><MagnifyingGlass size={19}/><input type="search" placeholder="記事を検索" aria-label="記事を検索" value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}}/></label></div><p className="result-count" aria-live="polite">{filtered.length}件の記事</p>{filtered.length?<NewsRows items={filtered.slice((page-1)*6,page*6)}/>:<div className="empty-state"><h2>該当する記事がありません。</h2><p>キーワードやカテゴリーを変えてお試しください。</p><button className="text-link" onClick={()=>{setQuery('');setCategory('すべて');}}>条件をリセット<Arrow/></button></div>}{pages>1&&<nav className="pagination" aria-label="記事のページ">{Array.from({length:pages},(_,i)=><button key={i} aria-current={page===i+1?'page':undefined} onClick={()=>setPage(i+1)}>{i+1}</button>)}</nav>}</section><ContactCTA/></>;}
export function Article({post:p}){const img=p.image?.startsWith('/uploads/')?href(p.image):p.image;return <><div className="breadcrumb content-width"><a href={href()}>HOME</a><span>/</span><a href={href('insights/')}>INSIGHTS</a></div><article className="article-content"><header><div className="article-meta"><time dateTime={p.date}>{formatDate(p.date)}</time><span className="category-label">{p.category}</span></div><h1>{p.title}</h1></header>{img?<img className="article-image" src={img} alt={p.imageAlt} width="960" height="540"/>:null}<div className="prose" dangerouslySetInnerHTML={{__html:p.html}}/><ArticleSource url={p.sourceUrl}/><a href={href('insights/')} className="text-link back-link">お知らせ一覧へ<Arrow/></a></article><ContactCTA/></>;}
export function Recruit(){return <><PageIntro label="RECRUIT" title={<>水の未来を、<br/>ともにつくる仲間へ。</>} description="異なる専門性が出会い、地域の水に向き合う。"/><section className="recruit-visual content-width"><Media name="調査・フィールドワーク・チームの写真" ratio="2.2"/></section><section className="recruit-copy content-width"><span className="eyebrow">WORK WITH US</span><h2>現場から考える。<br/>分野を越えて、つながる。</h2><p>水、森林、地質、IoT、データ、地域との対話。自然と社会の両方に向き合う仕事には、多様な視点が必要です。</p><p>経験や専門性を活かし、次世代に水のある風景を残していく。amenowaの取り組みに関心をお持ちの方は、お問い合わせください。</p></section><section className="recruit-info content-width"><h2>採用に関するご相談</h2><p>募集職種・条件は確認のうえ掲載予定です。現在の募集状況については、お問い合わせください。</p><Button to="contact/?subject=recruit">採用について問い合わせる</Button></section><ContactCTA/></>;}
export function Privacy(){return <>
  <PageIntro label="PRIVACY" title="個人情報の取り扱い"/>
  <section className="article-content prose">
    {import.meta.env.VITE_CONTACT_MODE!=='live'&&<p className="form-demo-note">デモのフォームでは入力内容を送信・保存しません。</p>}
    <h2>お問い合わせでお預かりする情報</h2>
    <p>株式会社amenowa（以下「当社」）は、お問い合わせの際に、お名前、メールアドレス、会社名・団体名、お問い合わせの種類・内容など、ご入力いただいた情報を取得します。</p>
    <p>お預かりした情報は、お問い合わせへの回答、ご相談への対応、およびこれらに必要な確認・連絡のために利用します。法令で認められる場合を除き、ご本人の同意なく、これらの目的を超えて利用することはありません。</p>
    <h2>情報の管理</h2>
    <h3>管理責任者と取り扱う担当者</h3>
    <p>当社の代表取締役を個人情報の管理責任者とし、お問い合わせへの対応に必要な担当者に限って情報を取り扱います。業務用のメールアカウントや端末へのアクセスを制限し、個人用のメールや私的な保存先へ転送・複製しません。</p>
    <p>不正アクセス、漏えい、紛失、改ざんなどを防ぐため、アカウントの認証管理、端末の更新、取り扱い手順の共有など、必要な安全管理措置を講じます。</p>
    <h3>当社での保管期間と削除方法</h3>
    <p>お問い合わせの情報は、当社が管理する業務用メールおよび対応に必要な業務用の保存先で保管します。通常のお問い合わせは、対応完了後、原則として1年間保管します。継続的なお取引や紛争への対応、法令上の保存義務がある情報は、必要な範囲・期間に限って別途保管します。</p>
    <p>保管状況は毎月見直し、保管期間を過ぎて不要となった情報を削除します。削除の対象には、受信・送信メール、添付ファイル、業務用端末に保存した複製を含み、ごみ箱に残ったデータも確認します。紙で保管した情報は、裁断など復元しにくい方法で廃棄します。</p>
    <p>メールサービス等のバックアップについては、提供元の保持・削除条件を確認して管理します。削除した情報をバックアップから復元した場合は、当該情報を再び業務に利用しないよう、削除を反映します。</p>
    <h3>外部サービスの利用と保管場所</h3>
    <p>お問い合わせフォームの送信処理には、外部サービス「FormSubmit」を利用しています。入力内容はFormSubmitを経由し、当社のお問い合わせ用メールに送られます。当社は、個人情報の取り扱いを委託する場合、利用目的の達成に必要な範囲に限定し、委託先の取り扱い条件を確認して必要な管理・監督を行います。</p>
    <p>FormSubmitの公式説明では、送信内容のアーカイブを30日間保存するとされています。この期間は、当社が受信したメールの保管期間とは異なります。</p>
    <p>FormSubmitのサーバーの所在国・地域は、確認した公式資料には明記されていません。当社が利用するメールサービスを含め、情報が国内のみで保管されることを保証するものではありません。</p>
    <p>法令で認められる場合を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。</p>
    <p className="small-text">FormSubmitの確認資料：<a href="https://formsubmit.co/documentation" target="_blank" rel="noopener noreferrer">公式ドキュメント</a> ／ <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>（2026年9月8日確認）</p>
    <h2>ご相談窓口</h2>
    <p>個人情報の取り扱いに関するご質問やご相談、開示・訂正・利用停止等のお申し出は、以下のお問い合わせフォームからご連絡ください。当社のお問い合わせ担当者が受け付け、管理責任者のもとで対応します。</p>
    <p>ご本人確認が必要なお申し出については、ご本人であることを確認したうえで、法令に基づき対応します。</p>
    <Button to="contact/?subject=privacy">お問い合わせへ</Button>
  </section>
</>;}
export function Complete(){const live=import.meta.env.VITE_CONTACT_MODE==='live';return <><PageIntro label="CONTACT" title={live?'お問い合わせの送信手続きが完了しました。':'お問い合わせ完了画面（デモ）'}/><section className="complete-page content-width"><p>{live?'内容を確認のうえ、担当者よりご連絡いたします。':'このデモではメールの送信・入力内容の保存は行っていません。'}</p><p className="sample-note">このページの表示だけではメールの到達を確認できません。</p><Button to="">ホームへ戻る</Button></section></>;}
