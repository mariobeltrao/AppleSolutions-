# Apple Solution

**Assistência técnica, tecnologia e uma experiência digital à altura.**

Landing page institucional desenvolvida para a **Apple Solution**, assistência técnica e loja de produtos tecnológicos localizada em **João Pessoa, Paraíba**. O projeto combina uma identidade visual minimalista com navegação fluida, apresentação objetiva dos serviços e acesso direto ao atendimento.

> Projeto independente para a Apple Solution. Não é um site oficial da Apple Inc. nem implica vínculo ou certificação pela fabricante.

## Sobre o projeto

O objetivo é apresentar a Apple Solution de forma profissional e facilitar o caminho entre conhecer os serviços e entrar em contato com a loja. O site foi concebido como um **MVP institucional**, sem e-commerce ou backend.

O principal destaque é uma **hero section cinematográfica**: o vídeo de montagem de um smartphone avança quando o visitante rola a página para baixo e retrocede quando rola para cima. A animação acompanha o scroll, criando uma interação visual entre o usuário e o dispositivo.

## Funcionalidades

- **Hero section interativa:** vídeo controlado pelo scroll em ambas as direções, com experiência alternativa para dispositivos e usuários que prefiram menos movimento.
- **Serviços:** apresentação de troca de tela, bateria, manutenção e produtos disponíveis na loja.
- **Como funciona:** etapas de contato, avaliação e reparo apresentadas de forma simples.
- **Localização:** mapa do Google Maps, endereço da unidade e link para abrir rotas.
- **Contato:** chamadas para ação direcionadas ao WhatsApp, assim que o número oficial for configurado.
- **Design responsivo:** layout adaptado a celulares, tablets e computadores.
- **Acessibilidade e desempenho:** navegação semântica, atenção a contraste e movimento reduzido, carregamento progressivo de mídia e animações leves.

## Identidade visual

A interface segue uma proposta **clean e premium**, inspirada em princípios de simplicidade, hierarquia visual e espaçamento generoso.

| Elemento | Cor |
| --- | --- |
| Azul principal | `#0071E3` |
| Branco | `#FFFFFF` |
| Cinza-claro | `#F5F5F7` |
| Grafite | `#171717` |
| Fundo escuro | `#0C0C0E` |

## Tecnologias

Stack definida para o MVP:

- **React** — construção da interface em componentes.
- **TypeScript** — organização e tipagem do código.
- **Vite** — ambiente de desenvolvimento e build.
- **CSS moderno** — responsividade, layouts e transições.
- **HTML5 Video API** — sincronização entre reprodução e scroll.
- **Google Maps** — incorporação de mapa e links de navegação.

> Esta documentação descreve a arquitetura planejada. Confirme as dependências no `package.json` quando a implementação estiver concluída.

## Executando localmente

Com **Node.js** e **npm** instalados:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Gerar a versão de produção
npm run build

# Visualizar o build localmente
npm run preview
```

Abra o endereço exibido no terminal após executar `npm run dev`.

## Organização dos arquivos

Estrutura de referência para a implementação:

```text
public/
├── images/
│   ├── apple-solution-logo.png
│   ├── hero-poster-desmontado.webp
│   └── hero-poster-montado.webp
└── videos/
    └── hero_section.mp4

src/
├── components/
├── config/
│   └── site.ts
└── ...
```

O arquivo `hero_section.mp4` é a mídia original da abertura. A animação deve utilizar seus próprios quadros, e não substituí-los por um efeito visual simulado.

## Localização

**Apple Solution**  
R. Mariangela Lucena Peixoto, 1441 — Sala 101  
Valentina de Figueiredo, João Pessoa — PB  
CEP 58063-300

[Ver localização no Google Maps](https://www.google.com/maps/search/?api=1&query=R.%20Mariangela%20Lucena%20Peixoto%2C%201441%20-%20Sl%20101%20-%20Valentina%20de%20Figueiredo%2C%20Jo%C3%A3o%20Pessoa%20-%20PB%2C%2058063-300)

## Configurações antes da publicação

Os dados comerciais devem ser centralizados em `src/config/site.ts`. Antes de publicar, confira:

- Número de WhatsApp oficial e mensagem pré-preenchida.
- Instagram e horários de atendimento, se forem exibidos.
- Localização correta do estabelecimento no Google Maps.
- Comportamento do vídeo no Safari, Chrome e dispositivos móveis.
- Textos, imagens, condições comerciais e informações de serviços com a loja.

## Status

**MVP em desenvolvimento.** O projeto foi planejado para priorizar apresentação visual, clareza de navegação e conversão por contato — sem funcionalidades comerciais complexas nesta fase.

---

**Apple Solution** · João Pessoa, PB
