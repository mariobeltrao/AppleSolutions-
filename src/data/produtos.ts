// ─────────────────────────────────────────────────────────────
// CATÁLOGO DE PRODUTOS
// Para adicionar, editar ou remover produtos, altere apenas a lista
// `produtos` abaixo. O layout da página se atualiza sozinho.
// ─────────────────────────────────────────────────────────────

/** Categorias na ordem em que aparecem no filtro. Só aparecem as que têm produtos. */
export const categorias = ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Acessórios'] as const;
export type Categoria = (typeof categorias)[number];

export type Selo = 'Novo' | 'Seminovo' | 'Promoção' | 'Esgotado';

export interface Produto {
  /** Identificador único, em minúsculas e com hífens. Vira o endereço: /produtos/?produto=<id> */
  id: string;
  nome: string;
  categoria: Categoria;
  /** Texto completo. No card aparecem só as primeiras linhas. */
  descricao: string;
  /** Pares "nome: valor" exibidos nos detalhes. */
  especificacoes: Record<string, string>;
  /** Preço em reais (ex.: 149.9). Use null para mostrar "Consulte valores". */
  preco: number | null;
  /** Caminhos das fotos dentro de /public. A primeira é a capa do card. */
  imagens: string[];
  /** Selo opcional no card. Use null para nenhum. */
  selo: Selo | null;
  /** false = mostra "Esgotado" e o botão vira "Avise-me". */
  disponivel: boolean;
  /** Opcional. Se ficar vazio, usa o texto padrão de garantia do site. */
  garantia?: string;
}

const img = (nome: string, total: number) => Array.from({ length: total }, (_, i) => `/images/produtos/${nome}-${i + 1}.svg`);

// Produtos de exemplo: troque textos, preços e imagens pelos reais.
export const produtos: Produto[] = [
  {
    id: 'iphone-13-128gb',
    nome: 'iPhone 13 128 GB',
    categoria: 'iPhone',
    descricao: 'iPhone 13 seminovo, revisado pela nossa equipe técnica. Tela Super Retina XDR, câmera dupla e desempenho de sobra para o dia a dia. Acompanha cabo de carregamento.',
    especificacoes: { Armazenamento: '128 GB', Tela: '6,1" Super Retina XDR', Chip: 'A15 Bionic', Câmera: 'Dupla de 12 MP', Condição: 'Seminovo revisado' },
    preco: null,
    imagens: img('iphone-13', 3),
    selo: 'Seminovo',
    disponivel: true,
  },
  {
    id: 'iphone-14-pro-256gb',
    nome: 'iPhone 14 Pro 256 GB',
    categoria: 'iPhone',
    descricao: 'iPhone 14 Pro seminovo com Dynamic Island, tela sempre ativa e sistema de câmeras profissional. Fale com a gente para saber da próxima reposição.',
    especificacoes: { Armazenamento: '256 GB', Tela: '6,1" Super Retina XDR com ProMotion', Chip: 'A16 Bionic', Câmera: 'Tripla com principal de 48 MP', Condição: 'Seminovo revisado' },
    preco: null,
    imagens: img('iphone-14-pro', 2),
    selo: 'Seminovo',
    disponivel: false,
  },
  {
    id: 'ipad-10-geracao-64gb',
    nome: 'iPad 10ª geração 64 GB',
    categoria: 'iPad',
    descricao: 'iPad novo, lacrado, com tela Liquid Retina de 10,9" e conector USB-C. Ideal para estudos, trabalho e entretenimento.',
    especificacoes: { Armazenamento: '64 GB', Tela: '10,9" Liquid Retina', Chip: 'A14 Bionic', Conexão: 'Wi-Fi', Condição: 'Novo, lacrado' },
    preco: null,
    imagens: img('ipad-10', 2),
    selo: 'Novo',
    disponivel: true,
    garantia: 'Garantia de 1 ano do fabricante.',
  },
  {
    id: 'macbook-air-m1-256gb',
    nome: 'MacBook Air M1 256 GB',
    categoria: 'Mac',
    descricao: 'MacBook Air com chip M1 seminovo: leve, silencioso e com bateria para o dia inteiro. Revisado e pronto para uso.',
    especificacoes: { Armazenamento: '256 GB SSD', Memória: '8 GB', Tela: '13,3" Retina', Chip: 'Apple M1', Condição: 'Seminovo revisado' },
    preco: null,
    imagens: img('macbook-air', 3),
    selo: 'Seminovo',
    disponivel: true,
  },
  {
    id: 'carregador-usb-c-20w',
    nome: 'Carregador USB-C 20 W',
    categoria: 'Acessórios',
    descricao: 'Fonte de carregamento rápido USB-C de 20 W, compatível com iPhone e iPad. Compacta e prática para levar na bolsa.',
    especificacoes: { Potência: '20 W', Conector: 'USB-C', Compatibilidade: 'iPhone 8 ou posterior, iPad com USB-C', Condição: 'Novo' },
    preco: 149.9,
    imagens: img('carregador-20w', 2),
    selo: 'Novo',
    disponivel: true,
  },
  {
    id: 'capa-silicone-iphone-15',
    nome: 'Capa de silicone para iPhone 15',
    categoria: 'Acessórios',
    descricao: 'Capa de silicone com toque macio e interior em microfibra. Protege contra quedas leves e arranhões sem perder o visual do aparelho.',
    especificacoes: { Material: 'Silicone com interior em microfibra', Compatibilidade: 'iPhone 15', Cores: 'Consulte disponibilidade', Condição: 'Novo' },
    preco: 89.9,
    imagens: img('capa-silicone', 2),
    selo: 'Promoção',
    disponivel: true,
  },
];

/** Selo exibido: produtos indisponíveis mostram sempre "Esgotado". */
export const seloDe = (p: Produto): Selo | null => (p.disponivel ? p.selo : 'Esgotado');

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const precoDe = (p: Produto) => (p.preco == null ? 'Consulte valores' : brl.format(p.preco));
