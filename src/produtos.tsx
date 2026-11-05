import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header, Footer } from './components/SiteChrome';
import { ProductCatalog } from './components/ProductCatalog';
import './style.css';
import './produtos.css';

function ProdutosPage() {
  return <><a className="skip" href="#catalogo">Ir para o catálogo</a><Header page="produtos"/><main id="inicio"><ProductCatalog/></main><Footer page="produtos"/></>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><ProdutosPage/></React.StrictMode>);
