import { useEffect, useMemo, useRef, useState } from 'react';
import { contactUrl, productMessage } from '../config/site';
import { categorias, precoDe, produtos, seloDe, type Categoria, type Produto } from '../data/produtos';
import { ProductModal, slug } from './ProductModal';

const TODOS = 'Todos';
const normalizar = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const produtoDaUrl = () => produtos.find(p => p.id === new URLSearchParams(location.search).get('produto')) ?? null;
const PAGE_TITLE = document.title;

export function ProductCatalog() {
  const [categoria, setCategoria] = useState<Categoria | typeof TODOS>(TODOS);
  const [busca, setBusca] = useState('');
  const [aberto, setAberto] = useState<Produto | null>(produtoDaUrl);
  const abriuPeloSite = useRef(false);
  const origem = useRef<HTMLElement | null>(null);

  // Só mostra no filtro as categorias que têm produtos cadastrados.
  const filtros = useMemo(() => [TODOS, ...categorias.filter(c => produtos.some(p => p.categoria === c))] as const, []);
  const lista = useMemo(() => {
    const termo = normalizar(busca);
    return produtos.filter(p => (categoria === TODOS || p.categoria === categoria) && (!termo || normalizar(p.nome).includes(termo)));
  }, [categoria, busca]);

  // Mantém o modal sincronizado com o endereço (/produtos/?produto=<id>) e com o botão Voltar.
  useEffect(() => {
    const onPop = () => { abriuPeloSite.current = false; setAberto(produtoDaUrl()); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => { document.title = aberto ? `${aberto.nome} | Produtos | Apple Solution` : PAGE_TITLE; }, [aberto]);

  const abrir = (p: Produto, el?: HTMLElement) => {
    origem.current = el ?? null;
    history.pushState(null, '', `?produto=${encodeURIComponent(p.id)}`);
    abriuPeloSite.current = true;
    setAberto(p);
  };
  const fechar = () => {
    setAberto(null);
    if (abriuPeloSite.current) history.back();
    else history.replaceState(null, '', location.pathname);
    abriuPeloSite.current = false;
    requestAnimationFrame(() => origem.current?.focus());
  };

  return <>
    <section className="catalog-intro">
      <div className="container">
        <p className="eyebrow">PRODUTOS</p>
        <h1>Tecnologia selecionada.<br/><span>Pronta para você.</span></h1>
        <p className="catalog-lead">Aparelhos novos e seminovos revisados, acessórios e peças. Escolha o que procura e fale com a gente para confirmar disponibilidade e valores.</p>
      </div>
    </section>

    <section id="catalogo" className="catalog" aria-label="Catálogo de produtos">
      <div className="container">
        <div className="catalog-toolbar">
          <div className="filter-group" role="group" aria-label="Filtrar por categoria">
            {filtros.map(f => <button key={f} type="button" className="filter-pill" aria-pressed={categoria === f} onClick={() => setCategoria(f)}>{f}</button>)}
          </div>
          <label className="search-field">
            <span className="visually-hidden">Buscar produto pelo nome</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            <input type="search" placeholder="Buscar produto" value={busca} onChange={e => setBusca(e.target.value)} autoComplete="off"/>
          </label>
        </div>

        <p className="catalog-count" aria-live="polite">{lista.length === 1 ? '1 produto' : `${lista.length} produtos`}</p>

        {lista.length > 0
          ? <ul className="product-grid">{lista.map(p => <ProductCard key={p.id} produto={p} onOpen={abrir}/>)}</ul>
          : <div className="catalog-empty"><h2>Nenhum produto encontrado.</h2><p>Tente outra busca ou categoria. Se preferir, pergunte direto pelo WhatsApp.</p><button type="button" className="text-link" onClick={() => { setBusca(''); setCategoria(TODOS); }}>Limpar filtros ↺</button></div>}
      </div>
    </section>

    <section className="final-cta section">
      <div className="container">
        <p className="eyebrow">NÃO ENCONTROU?</p>
        <h2>Fale com a gente.<br/><span>A gente procura para você.</span></h2>
        <a className="button" href={contactUrl('Olá! Vim pela página de produtos da Apple Solution e estou procurando um produto.')} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp ↗</a>
      </div>
    </section>

    {aberto && <ProductModal produto={aberto} onClose={fechar}/>}
  </>;
}

function ProductCard({ produto: p, onOpen }: { produto: Produto; onOpen: (p: Produto, el?: HTMLElement) => void }) {
  const selo = seloDe(p);
  return <li className={`product-card ${p.disponivel ? '' : 'unavailable'}`}>
    <button type="button" className="product-media" onClick={e => onOpen(p, e.currentTarget)} aria-label={`Ver detalhes: ${p.nome}`}>
      <img src={p.imagens[0]} alt={p.nome} width="800" height="800" loading="lazy" decoding="async"/>
      {selo && <span className={`product-badge badge-${slug(selo)}`}>{selo}</span>}
    </button>
    <div className="product-body">
      <p className="product-category">{p.categoria}</p>
      <h3>{p.nome}</h3>
      <p className="product-desc">{p.descricao}</p>
      <p className="product-price">{precoDe(p)}</p>
      <div className="product-actions">
        <a className="button button-small" href={contactUrl(productMessage(p.nome, p.disponivel))} target="_blank" rel="noopener noreferrer">{p.disponivel ? 'Pedir orçamento' : 'Avise-me'} <span>↗</span></a>
        <button type="button" className="text-link" onClick={e => onOpen(p, e.currentTarget)}>Ver detalhes <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </li>;
}
