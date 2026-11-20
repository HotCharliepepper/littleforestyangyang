(()=>{
'use strict';
const config=window.OFFER_CONFIG||{mode:'showcase',client:'비공개 콘셉트',pricing:{}};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let guest='family',tier='group',stage=0,method=0,goal=null;
const guestData={
 family:{label:'가족·부부 모임',eye:'FAMILY / COUPLES',photo:'gathering',alt:'가족 모임을 표현한 가상의 데크 사진',head:'같이 모이는 저녁,\n각자 편안한 밤.',sub:'함께할 데크와 각자가 쉴 객실을 한눈에 이해하도록.',journey:['데크에서 함께할 시간을 보여줍니다.','객실별 인원을 확인합니다.','바비큐·주차·이용 규칙을 확인합니다.','날짜와 인원으로 문의합니다.']},
 company:{label:'소규모 회사·워크숍',eye:'TEAM / WORKSHOP',photo:'walkway',alt:'숲속 숙소의 단체 이용을 떠올리게 하는 콘셉트 사진',head:'함께하는 일정과,\n편안하게 끝나는 하루.',sub:'모임 준비에 필요한 인원·일정·공용 공간 정보를 먼저.',journey:['워크숍 인원과 팀의 일정에 맞는 공간을 발견합니다.','팀별 객실 배정과 공용 공간의 구성을 비교합니다.','체크인·행사 가능 시간·주차·비용증빙 가능 여부를 확인합니다.','날짜·인원·견적 조건을 한 번에 문의할 수 있게 합니다.']},
 club:{label:'동호회·친구 모임',eye:'FRIENDS / CLUB',photo:'dinner',alt:'친구들의 바비큐 모임을 표현한 콘셉트 사진',head:'취향은 함께,\n휴식은 자유롭게.',sub:'함께 즐길 공간과 서로 배려할 이용 규칙을 먼저.',journey:['바비큐·모임에 적합한 공용 공간을 먼저 발견합니다.','각자 쉬는 객실과 인원별 공간 구성을 확인합니다.','주차·소음·이용 시간과 모임 규칙을 확인합니다.','모임 성격·날짜·인원으로 문의를 준비합니다.']}
};
const tierData={
 signature:{label:'SIGNATURE · 브랜드 경험형',short:'SIGNATURE',head:'공간의 철학을,\n브랜드의 경험으로.',desc:'사진과 타이포, 움직임이 하나의 이야기로.',features:['브랜드 메시지·경험 구조','시네마틱 모션·전환','맞춤 시각 자산','PC·모바일 퍼포먼스 검수'],image:'walkway',alt:'브랜드 경험형 공간 이미지 콘셉트',refs:[['MASHCORE','https://mashcore.co.kr/']]},
 group:{label:'GROUP · 통대관 전환형',short:'GROUP',head:'필요한 질문이,\n예약 문의로 연결되게.',desc:'고객의 목적에 따라 안내와 문의 순서가 달라집니다.',features:['고객군별 안내 변화','공용 공간·객실 이해','인원·날짜 문의 동선','문의와 확정 예약 구분'],image:'dinner',alt:'통대관 전환형 홈페이지의 시각 콘셉트',refs:[['ARVO HOTEL','https://arvosacheon.netlify.app/'],['WEPLACE','https://withweplace.kr/'],['상권나침반','https://localscopekorea.netlify.app/']]},
 essential:{label:'ESSENTIAL · 공식 안내형',short:'ESSENTIAL',head:'찾아야 할 답이,\n가장 먼저 보이도록.',desc:'사진·객실·이용 조건·예약 경로를 명료하게.',features:['정보 중심 반응형 화면','사진·객실·시설 안내','FAQ와 운영 조건','명확한 문의·예약 링크'],image:'room',alt:'공식 안내형 홈페이지의 시각 콘셉트',refs:[['다로산펜션 (외부 참고)','https://darosan.com/'],['단체 대관 안내 (외부 참고)','https://darosan.com/group-workshop/']]}
};
const goalData={
  essential:{label:'공식 정보 정리',tier:'essential',title:'공식 안내형부터 비교',copy:'사진·객실·FAQ만 명확히 해도 문의 전 질문이 줄어들 수 있습니다.',boundary:'모임 유형별 안내·맞춤 예약 문의는 별도 범위입니다.',purpose:'기본 안내와 문의 경로를 분명하게 합니다.',check:'실제 객실·시설·예약 안내 원본이 필요합니다.'},
  group:{label:'통대관 문의 구조',tier:'group',title:'통대관 전환형부터 비교',copy:'가족·회사·동호회가 날짜와 인원을 정리해 문의하도록 설계합니다.',boundary:'실시간 예약·결제·운영 성과는 기본 포함 또는 보장 사항이 아닙니다.',purpose:'모임 목적에 맞는 정보부터 보여주고 문의 준비를 돕습니다.',check:'실제 객실 구성·이용 규칙·기본형 포함 여부를 확인해야 합니다.'},
  signature:{label:'브랜드 경험 강화',tier:'signature',title:'브랜드 경험형부터 비교',copy:'사진·타이포·입체 모션을 묶어 공간의 고유한 인상을 설계합니다.',boundary:'영상·촬영·외부 연동·유지관리는 별도 견적이 될 수 있습니다.',purpose:'공간의 분위기를 기억하기 쉬운 브랜드 경험으로 구성합니다.',check:'브랜드 핵심 메시지와 제작 범위·에셋 권리를 먼저 확정해야 합니다.'}
};
const tierValue={
  essential:{purpose:'기본 정보를 쉽게 찾고 문의할 수 있게 정리합니다.',check:'고객군별 선택·실시간 예약 연결은 포함 여부를 별도 확인합니다.'},
  group:{purpose:'모임 목적에 맞는 정보부터 보여주고 문의 준비를 돕습니다.',check:'객실 구성·이용 규칙·기본형 포함 여부를 확인해야 합니다.'},
  signature:{purpose:'공간의 개성을 영상·모션·타이포와 연결합니다.',check:'촬영·맞춤 콘텐츠·연동·월 관리 범위는 견적에서 확인해야 합니다.'}
};
const methodData=[
 {caption:'VISUAL METHOD / FIRST LOOK',photo:'room',head:'한 장의 첫 사진으로,\n이곳이 어떤 공간인지.',note:'첫 사진으로 공간을 이해합니다.'},
 {caption:'VISUAL METHOD / ROOM DETAILS',photo:'bedroom',head:'관심이 생겼다면,\n객실 차이를 이해하도록.',note:'관심이 생기면 객실을 비교합니다.'},
 {caption:'VISUAL METHOD / NEXT STEP',photo:'walkway',head:'이해가 끝난 자리에서,\n다음 예약 경로로.',note:'예약 채널로 안전하게 이어집니다.'}
];
function multiLines(s){return s.split('\n').map(v=>document.createTextNode(v)).reduce((acc,v,i)=>{if(i)acc.append(document.createElement('br'));acc.append(v);return acc;},document.createDocumentFragment())}
function setLines(selector,s){const el=$(selector);if(el)el.replaceChildren(multiLines(s))}
function setText(selector,value){const el=$(selector);if(el)el.textContent=value}
function updateGuest(k){if(!guestData[k])return;guest=k;const d=guestData[k];$$('[data-guest]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.guest===k)));setText('#guest-label',d.eye);setLines('#guest-head',d.head);setText('#guest-description',d.sub);const im=$('#guest-photo');if(im){im.src=`assets/${d.photo}.webp`;im.alt=d.alt}setText('#summary-guest',d.label);renderJourney();}
function renderJourney(){const d=guestData[guest];$$('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===stage)));const p=$('#journey-progress');if(p)p.style.width=`${(stage+1)/4*100}%`;setText('#journey-detail',d.journey[stage]);setText('#journey-next',stage===3?'홈페이지 비교하기 ↗':'다음 단계 ↗');}
$$('[data-guest]').forEach(b=>b.addEventListener('click',()=>updateGuest(b.dataset.guest)));
$$('[data-step]').forEach(b=>b.addEventListener('click',()=>{stage=Number(b.dataset.step);renderJourney()}));
$('#journey-next')?.addEventListener('click',()=>{if(stage<3){stage++;renderJourney();}else $('#levels')?.scrollIntoView({behavior:reduce?'instant':'smooth'});});
function setGoal(k){
 goal=goalData[k]?k:null;
 $$('[data-goal]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.goal===goal)));
 const d=goal?goalData[goal]:null;
 setText('#goal-answer-title',d?d.title:'무엇이 가장 시급한지 먼저 고르세요.');
 setText('#goal-answer-copy',d?d.copy:'선택한 목적에 따라 검토할 범위를 보여줍니다. 구매를 확정하지 않습니다.');
 setText('#goal-answer-boundary',d?d.boundary:'어떤 수준을 고르든 실제 제작 범위·별도 비용은 확인이 필요합니다.');
 setText('#summary-goal',d?d.label:'아직 선택하지 않음');
 const apply=$('#goal-apply');if(apply){apply.disabled=!d;apply.textContent=d?'이 기준의 수준 비교하기 ↗':'해당 수준 비교하기 ↗';}
 updateGoalMatch();
}
function updateGoalMatch(){
 const d=goal?goalData[goal]:null;
 const status=$('#goal-status');
 if(status)status.textContent=d?(d.tier===tier?'선택한 수준과 검토 기준이 같습니다.':'현재 선택한 수준과 검토 기준이 다릅니다. 자유롭게 비교할 수 있습니다.'):'선택 기준 없이도 세 수준을 비교할 수 있습니다.';
}
$$('[data-goal]').forEach(b=>b.addEventListener('click',()=>setGoal(b.dataset.goal)));
$('#goal-clear')?.addEventListener('click',()=>setGoal(null));
$('#goal-apply')?.addEventListener('click',()=>{if(!goal)return;updateTier(goalData[goal].tier);$('.tier-options')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});});
function updateTier(k){if(!tierData[k])return;tier=k;const d=tierData[k];$$('[data-tier]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tier===k)));
 setText('#tier-preview-label',d.short+' / SELECTED');setLines('#tier-preview-title',d.head);setText('#tier-preview-desc',d.desc);setText('#tier-preview-chip',d.short);setText('#summary-tier',d.label);setText('#tier-value-purpose',tierValue[k].purpose);setText('#tier-value-check',tierValue[k].check);updateGoalMatch();
 const im=$('#tier-preview-image');if(im){im.src=`assets/${d.image}.webp`;im.alt=d.alt}const ul=$('#tier-preview-features');if(ul){ul.replaceChildren(...d.features.map(x=>{const li=document.createElement('li');li.textContent=x;return li;}));}
 const bar=$('#reference-bar');if(bar){bar.replaceChildren();const l=document.createElement('span');l.textContent='선택한 수준의 참고 링크';bar.append(l);d.refs.forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';bar.append(a);});}
 const p=config.pricing?.[k];if(p){setText('#budget-tier',p.label);setText('#budget-extra',p.extra);setText('#budget-note',p.note);setText('#budget-total',p.total);setText('#budget-total-note',p.totalNote);setText('#summary-budget',p.summary);}
}
$$('[data-tier]').forEach(b=>b.addEventListener('click',()=>{updateTier(b.dataset.tier);if(innerWidth<=600){const box=$('.tier-options');if(box){const pos=b.offsetLeft - box.offsetLeft - (box.clientWidth-b.clientWidth)/2;box.scrollTo({left:Math.max(0,pos),behavior:reduce?'instant':'smooth'});}}}));
function updateMethod(i){method=i;const d=methodData[i];$$('[data-method]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.method)===i)));const im=$('#method-photo');if(im)im.src=`assets/${d.photo}.webp`;setText('#method-caption',d.caption);setLines('#method-head',d.head);setText('#method-note',d.note);if($('#method-visual'))$('#method-visual').dataset.step=String(i);}
$$('[data-method]').forEach(b=>b.addEventListener('click',()=>updateMethod(Number(b.dataset.method))));

const bridgeTrack=$('#bridge-track');let bridgeIndex=0;
function updateBridgeCounter(){if(!bridgeTrack)return;const cards=[...bridgeTrack.querySelectorAll('.bridge-card')];if(innerWidth>720){setText('#bridge-counter','01 & 02 / 02');return;}const center=bridgeTrack.scrollLeft+bridgeTrack.clientWidth/2;let best=0,distance=Infinity;cards.forEach((el,i)=>{const d=Math.abs((el.offsetLeft-bridgeTrack.offsetLeft)+el.clientWidth/2-center);if(d<distance){best=i;distance=d;}});bridgeIndex=best;setText('#bridge-counter',String(best+1).padStart(2,'0')+' / 02');}
bridgeTrack?.addEventListener('scroll',updateBridgeCounter,{passive:true});
$('#bridge-next')?.addEventListener('click',()=>{const cards=[...bridgeTrack.querySelectorAll('.bridge-card')];if(innerWidth>720){bridgeTrack.scrollIntoView({behavior:reduce?'instant':'smooth'});return;}bridgeIndex=(bridgeIndex+1)%cards.length;const c=cards[bridgeIndex];bridgeTrack.scrollTo({left:Math.max(0,c.offsetLeft-bridgeTrack.offsetLeft-(bridgeTrack.clientWidth-c.clientWidth)/2),behavior:reduce?'instant':'smooth'});setText('#bridge-counter',String(bridgeIndex+1).padStart(2,'0')+' / 02');});
$('#bridge-select-group')?.addEventListener('click',()=>{updateTier('group');$('#levels')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});});
window.addEventListener('resize',updateBridgeCounter);updateBridgeCounter();

const story=$('#story-reel');let activeStory=0;
function countStory(){if(!story)return;const cards=[...story.children];if(innerWidth>600){setText('#story-counter','01–03 / 03');return;}const center=story.scrollLeft+story.clientWidth/2;let which=0,dist=Infinity;cards.forEach((el,i)=>{let d=Math.abs((el.offsetLeft-story.offsetLeft)+el.clientWidth/2-center);if(d<dist){which=i;dist=d;}});activeStory=which;setText('#story-counter',String(which+1).padStart(2,'0')+' / 03');}
story?.addEventListener('scroll',countStory,{passive:true});$('#story-next')?.addEventListener('click',()=>{const cards=[...story.children];const next=(activeStory+1)%cards.length;const card=cards[next];const left=card.offsetLeft-story.offsetLeft-(story.clientWidth-card.clientWidth)/2;story.scrollTo({left:Math.max(0,left),behavior:reduce?'instant':'smooth'});activeStory=next;setText('#story-counter',String(next+1).padStart(2,'0')+' / 03');});
const dlg=$('#photo-dialog');$$('[data-photo]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.photo;const img=$('#dialog-image');img.src=`assets/${key}.webp`;img.alt=b.dataset.caption+' (실제 시설이 아닌 콘셉트 이미지)';setText('#dialog-title',b.dataset.caption);dlg.showModal();}));$('#dialog-close')?.addEventListener('click',()=>dlg.close());dlg?.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
const toggle=$('#menu-toggle'),menu=$('#menu-panel');function closeMenu(){if(!menu)return;menu.classList.remove('open');menu.inert=true;toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','메뉴 열기');}
toggle?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menu.inert=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});$$('#menu-panel a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const progress=$('#read-progress');let raf=false;function onScroll(){raf=false;if(!progress)return;const d=document.documentElement;const max=d.scrollHeight-d.clientHeight;progress.style.width=(max?Math.max(0,Math.min(100,d.scrollTop/max*100)):0)+'%';}window.addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(onScroll)}},{passive:true});window.addEventListener('resize',()=>{onScroll();countStory();});
if('IntersectionObserver' in window){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(el=>obs.observe(el));const nav=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('[data-dock]').forEach(a=>a.removeAttribute('aria-current'));const a=$(`[data-dock="${e.target.id}"]`);if(a)a.setAttribute('aria-current','true');}}),{rootMargin:'-15% 0px -72% 0px'});['story','experience','levels'].forEach(id=>{const el=document.getElementById(id);if(el)nav.observe(el);});}else $$('.reveal').forEach(el=>el.classList.add('is-visible'));
$('#copy-summary')?.addEventListener('click',async()=>{const t=tierData[tier];const g=guestData[guest];const text=config.formatSummary ? config.formatSummary(g,t,tier,goal?goalData[goal].label:'아직 선택하지 않음') : `WEPLACE OFFER ROOM / CONCEPT\n${g.label}\n${t.label}`;
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text)}else{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.top='-999px';document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();if(!ok)throw new Error('copy');}setText('#copy-status','선택 내용을 복사했습니다. 실제 발송·저장은 하지 않았습니다.');}catch(e){setText('#copy-status','복사 권한이 제한되어 있습니다. 로컬 서버(127.0.0.1)에서 다시 실행해 주세요.');}
});
updateGuest(guest);updateTier(tier);setGoal(null);updateMethod(method);countStory();onScroll();
})();
