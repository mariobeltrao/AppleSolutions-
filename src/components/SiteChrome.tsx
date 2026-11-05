import { useEffect, useState } from 'react';
import { site, contactUrl } from '../config/site';

// 'home' = página inicial (links internos com #), 'produtos' = página de produtos.
export type Page = 'home' | 'produtos';

export const Logo = ({ href = '#inicio' }: { href?: string }) => <a className="brand" href={href} aria-label="Apple Solution — início"><img width="48" height="48" src="/images/apple-solution-logo.png" alt="Apple Solution — assistência técnica"/><span>Apple Solution<span className="brand-sub">ASSISTÊNCIA & TECNOLOGIA</span></span></a>;

export function Header({ page }: { page: Page }) {
  const home = page === 'home', base = home ? '' : '/';
  const [open, setOpen] = useState(false), [light, setLight] = useState(!home);
  useEffect(() => {
    if (!home) return;
    const cb = () => { const h = document.querySelector('.hero-track'); setLight(Boolean(h && h.getBoundingClientRect().bottom < 90)); };
    window.addEventListener('scroll', cb, { passive: true }); cb();
    return () => window.removeEventListener('scroll', cb);
  }, [home]);
  const close = () => setOpen(false);
  const nav = <>
    <a href={`${base}#servicos`} onClick={close}>Serviços</a>
    <a href="/produtos/" aria-current={home ? undefined : 'page'} onClick={close}>Produtos</a>
    <a href={`${base}#processo`} onClick={close}>Como funciona</a>
    <a href={`${base}#localizacao`} onClick={close}>Localização</a>
    <a className="nav-cta" href={contactUrl()} target="_blank" rel="noopener noreferrer" onClick={close}>Fale conosco ↗</a>
  </>;
  return <header className={`${light ? 'light' : ''} ${open ? 'menu-open' : ''}`}><div className="nav-wrap"><Logo href={home ? '#inicio' : '/'}/><nav aria-label="Navegação principal">{nav}</nav><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{open ? 'Fechar' : 'Menu'} <span>{open ? '−' : '+'}</span></button></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">{nav}</nav>}</header>;
}

export function Footer({ page }: { page: Page }) {
  const base = page === 'home' ? '' : '/';
  return <footer><div className="container"><div className="footer-top"><Logo href={page === 'home' ? '#inicio' : '/'}/><nav aria-label="Links do rodapé"><a href={`${base}#servicos`}>Serviços</a><a href="/produtos/">Produtos</a><a href={`${base}#localizacao`}>Localização</a><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Apple Solution.</span><span>Assistência técnica · Acessórios · Informática</span><a href="#inicio">Voltar ao topo ↑</a></div></div></footer>;
}
