import { useEffect, useRef, useState } from 'react';
import { contactUrl, defaultWarranty, productMessage } from '../config/site';
import { precoDe, seloDe, type Produto } from '../data/produtos';

// Modal de detalhes com <dialog> nativo: prende o foco, fecha com Esc e devolve o foco ao botão de origem.
export function ProductModal({ produto, onClose }: { produto: Produto; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [foto, setFoto] = useState(0);
  const selo = seloDe(produto);

  const fechado = useRef(false);
  useEffect(() => { const d = ref.current!; if (!d.open) d.showModal(); }, []);
  useEffect(() => setFoto(0), [produto.id]);

  // Avisa a página uma única vez quando o modal fecha (botão, Esc ou clique fora).
  const handleClose = () => { if (!fechado.current) { fechado.current = true; onClose(); } };

  return <dialog ref={ref} className="product-modal" aria-labelledby="product-modal-title" onClose={handleClose} onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}>
    <div className="modal-inner">
      <button className="modal-close" onClick={() => ref.current?.close()} aria-label="Fechar detalhes">Fechar <span aria-hidden="true">×</span></button>
      <div className="modal-gallery">
        <div className="modal-photo">
          <img src={produto.imagens[foto]} alt={`${produto.nome} — foto ${foto + 1} de ${produto.imagens.length}`} width="800" height="800" decoding="async"/>
          {selo && <span className={`product-badge badge-${slug(selo)}`}>{selo}</span>}
        </div>
        {produto.imagens.length > 1 && <div className="modal-thumbs" role="group" aria-label="Fotos do produto">
          {produto.imagens.map((src, i) => <button key={src} className={i === foto ? 'active' : ''} aria-label={`Ver foto ${i + 1} de ${produto.imagens.length}`} aria-pressed={i === foto} onClick={() => setFoto(i)}><img src={src} alt="" width="72" height="72" loading="lazy" decoding="async"/></button>)}
        </div>}
      </div>
      <div className="modal-info">
        <p className="eyebrow">{produto.categoria.toUpperCase()}</p>
        <h2 id="product-modal-title">{produto.nome}</h2>
        <p className="modal-price">{precoDe(produto)}</p>
        <p className="modal-desc">{produto.descricao}</p>
        {Object.keys(produto.especificacoes).length > 0 && <>
          <h3>Especificações</h3>
          <dl className="spec-list">{Object.entries(produto.especificacoes).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </>}
        <h3>Garantia</h3>
        <p className="modal-warranty">{produto.garantia || defaultWarranty}</p>
        <a className="button" href={contactUrl(productMessage(produto.nome, produto.disponivel))} target="_blank" rel="noopener noreferrer">{produto.disponivel ? 'Falar no WhatsApp' : 'Avise-me quando chegar'} <span>↗</span></a>
      </div>
    </div>
  </dialog>;
}

export const slug = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '-');
