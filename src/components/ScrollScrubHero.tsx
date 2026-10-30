import { useEffect, useRef, useState } from 'react';
import { contactUrl } from '../config/site';
export function ScrollScrubHero() {
  const track = useRef<HTMLElement>(null), video = useRef<HTMLVideoElement>(null);
  const [fallback, setFallback] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches || Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData));
  useEffect(() => {
    if (fallback) return;
    const el = video.current!, region = track.current!;
    let raf = 0, pending = false, target = 0;
    const seek = () => {
      raf = 0;
      if (!Number.isFinite(el.duration) || !el.duration || el.readyState < 2) return;
      if (el.seeking) { pending = true; return; }
      if (Math.abs(el.currentTime - target) > 1 / 48) {
        try { el.currentTime = target; } catch { setFallback(true); }
      }
    };
    const update = () => {
      const distance = Math.max(1, region.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, -region.getBoundingClientRect().top / distance));
      region.style.setProperty('--progress', `${p * 100}%`);
      target = p * Math.max(0, (el.duration || 0) - 0.05);
      if (!raf) raf = requestAnimationFrame(seek);
    };
    const settled = () => { if (pending) { pending = false; update(); } };
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setFallback(motion.matches);
    motion.addEventListener('change', preference);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    el.addEventListener('loadedmetadata', update); el.addEventListener('loadeddata', update); el.addEventListener('seeked', settled);
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); motion.removeEventListener('change', preference); el.removeEventListener('loadedmetadata', update); el.removeEventListener('loadeddata', update); el.removeEventListener('seeked', settled); };
  }, [fallback]);
  return <section className={`hero-track ${fallback ? 'static' : ''}`} ref={track} aria-label="Apresentação Apple Solution">
    <div className="hero-scene">
      <div className="hero-copy"><p className="eyebrow">APPLE SOLUTION · ASSISTÊNCIA TÉCNICA</p><h1>Seu iPhone. <br/><span>Em boas mãos.</span></h1><p className="intro">Seu dispositivo faz parte da sua rotina. Cuidar dele merece uma experiência simples, moderna e sem complicações.</p><div className="actions"><a className="button" href={contactUrl()} target="_blank" rel="noopener noreferrer">Solicitar orçamento <span>↗</span></a><a className="text-link" href="#servicos">Conheça nossos serviços <span>↘</span></a></div></div>
      <div className="hero-media">{fallback ? <img src="/images/hero-poster-montado.png" alt="Smartphone prateado montado com iluminação azul"/> : <video ref={video} src="/videos/hero_section.mp4" poster="/images/hero-poster-desmontado.png" muted playsInline preload="auto" onError={() => setFallback(true)} aria-label="Montagem do smartphone controlada pela rolagem"/>}</div>
      <div className="hero-bottom"><span>{fallback ? 'TECNOLOGIA COM CUIDADO.' : 'ROLE PARA MONTAR ↓'}</span><div className="progress" aria-hidden="true"><i/></div><a href="#servicos">Pular animação ↘</a></div>
    </div>
  </section>;
}
