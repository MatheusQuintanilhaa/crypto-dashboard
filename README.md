# 🚀 Crypto Dashboard

Dashboard profissional completo para acompanhar preços, tendências e gerenciar portfolio de criptomoedas em tempo real.

![Crypto Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-cyan)

## ✨ Funcionalidades

### 📊 **Dashboard Principal**

- 📈 **Market Overview** - Market cap global, volume 24h, dominância BTC
- 💰 **Lista de Moedas** - Top 50 criptomoedas por market cap
- 🔍 **Busca e Filtros** - Busque por nome/símbolo e filtre por performance
- 📱 **Design Responsivo** - Mobile-first design otimizado

### 💼 **Portfolio Tracker** ⭐

- 🎯 **Gerenciar Investimentos** - Adicione suas moedas com quantidade e preço
- 📊 **P&L em Tempo Real** - Lucro/prejuízo total e percentual
- 💹 **Preço Médio** - Cálculo automático de preço médio ponderado
- 📈 **Estatísticas Completas** - Valor total, investido, P&L por moeda

### 📈 **Gráficos Interativos** ⭐

- 🕐 **Tempo Real** - Gráficos com atualização automática (30s)
- � **Múltiplos Períodos** - 1D, 7D, 30D, 90D, 1Y
- 🎨 **Visualizações** - Linha e área com gradientes
- 📱 **Responsivo** - Otimizado para todos os dispositivos

### 🔧 **Funcionalidades Avançadas**

- ❤️ **Sistema de Favoritos** - Salve e organize suas moedas favoritas
- 🌙 **Tema Dark/Light** - Alternância com persistência local
- � **Detalhes Completos** - Informações técnicas e fundamentais
- 🔄 **API Robusta** - Fallback inteligente com dados mock
- 🎯 **Animações** - Transições suaves com Framer Motion
- 🔔 **Notificações** - Toast notifications para feedback

## 🛠️ Stack Tecnológica

### **Frontend Core**

- **React 18** + **TypeScript** - Base moderna e type-safe
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animações profissionais

### **UI/UX**

- **Radix UI** - Componentes acessíveis e headless
- **Lucide React** - Ícones modernos e consistentes
- **React Hot Toast** - Notificações elegantes
- **Recharts** - Gráficos responsivos e interativos

### **State & Data**

- **React Query (TanStack Query)** - Cache e sincronização de dados
- **React Router DOM** - Roteamento client-side
- **Custom Hooks** - Lógica reutilizável e organizada

### **API & Integração**

- **CoinGecko API** - Dados em tempo real de criptomoedas
- **LocalStorage** - Persistência de favoritos e portfolio
- **Fallback System** - Proxy + dados mock para alta disponibilidade

## 🚀 Instalação

1. **Clone o repositório**
   \`\`\`bash
   git clone <repository-url>
   cd crypto-dashboard-vite
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install
   \`\`\`

3. **Inicie o servidor de desenvolvimento**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abra no navegador**
   \`\`\`
   http://localhost:5173
   \`\`\`

## 📁 Estrutura do Projeto

```tree
crypto-dashboard/
├── 📁 src/                          # Código fonte principal
│   ├── 📁 components/               # Componentes React reutilizáveis
│   │   ├── 📁 ui/                   # Componentes UI base (Radix UI)
│   │   │   ├── button.tsx           # Botão customizado
│   │   │   ├── card.tsx             # Container de card
│   │   │   ├── dialog.tsx           # Modal/Dialog
│   │   │   ├── input.tsx            # Campo de entrada
│   │   │   ├── tabs.tsx             # Componente de abas
│   │   │   ├── skeleton.tsx         # Loading placeholder
│   │   │   └── ...                  # Outros componentes UI
│   │   ├── coin-card.tsx            # Card individual de moeda
│   │   ├── coin-list.tsx            # Lista/grid de moedas
│   │   ├── coin-row.tsx             # Linha da tabela de moedas
│   │   ├── dashboard-header.tsx     # Cabeçalho do dashboard
│   │   ├── filter-buttons.tsx       # Botões de filtro
│   │   ├── market-overview.tsx      # Overview do mercado
│   │   ├── navigation.tsx           # Navegação principal
│   │   ├── price-chart.tsx          # Gráficos de preços
│   │   ├── search-bar.tsx           # Barra de busca
│   │   └── *-skeleton.tsx           # Loading skeletons
│   │
│   ├── 📁 pages/                    # Páginas da aplicação
│   │   ├── home.tsx                 # Página inicial (dashboard)
│   │   ├── coin-details.tsx         # Detalhes de moeda específica
│   │   ├── favorites.tsx            # Moedas favoritas
│   │   └── portfolio.tsx            # Portfolio tracker
│   │
│   ├── 📁 hooks/                    # Hooks customizados
│   │   ├── use-crypto.ts            # Hook para dados de moedas
│   │   ├── use-coin-details.ts      # Hook para detalhes de moeda
│   │   ├── use-favorites.ts         # Hook para favoritos
│   │   ├── use-portfolio.ts         # Hook para portfolio
│   │   └── use-price-history.ts     # Hook para histórico de preços
│   │
│   ├── 📁 contexts/                 # Contextos React
│   │   └── theme-context.tsx        # Context do tema (dark/light)
│   │
│   ├── 📁 services/                 # Serviços externos
│   │   └── api.ts                   # Integração com CoinGecko API
│   │
│   ├── 📁 types/                    # Definições TypeScript
│   │   ├── crypto.ts                # Tipos de criptomoedas
│   │   └── portfolio.ts             # Tipos do portfolio
│   │
│   ├── 📁 lib/                      # Utilitários
│   │   └── utils.ts                 # Funções auxiliares
│   │
│   ├── App.tsx                      # Componente raiz
│   ├── main.tsx                     # Entrada da aplicação
│   └── globals.css                  # Estilos globais
│
├── 📁 public/                       # Arquivos públicos
│   ├── favicon.svg                  # Ícone do site (azul vibrante)
│   ├── favicon-16x16.svg            # Ícone 16x16
│   ├── favicon-32x32.svg            # Ícone 32x32
│   └── placeholder-*.svg            # Imagens placeholder
│
├── 📁 scripts/                      # Scripts de automação
│   └── setup-git.sh                 # Setup de Git hooks
│
├── 📄 package.json                  # Dependências e scripts
├── 📄 vite.config.ts                # Configuração do Vite
├── 📄 tailwind.config.js            # Configuração do Tailwind CSS
├── 📄 tsconfig.json                 # Configuração do TypeScript
├── 📄 vercel.json                   # Configuração de deploy
├── 📄 .gitignore                    # Arquivos ignorados pelo Git
└── 📄 README.md                     # Esta documentação
```

### 🎯 **Organização por Responsabilidade**

- **📱 UI Components** → `src/components/` - Interface reutilizável
- **📄 Pages** → `src/pages/` - Páginas completas da aplicação
- **🔄 Business Logic** → `src/hooks/` - Lógica de negócio isolada
- **🌐 External Services** → `src/services/` - Integração com APIs
- **📝 Type Safety** → `src/types/` - Definições TypeScript
- **🎨 Styling** → `src/globals.css` + `tailwind.config.js` - Estilos
- **⚙️ Configuration** → Arquivos de config na raiz - Setup do projeto

## 🎨 Arquitetura & Componentes

### 🏗️ **Arquitetura da Aplicação**

\`\`\`
📱 Frontend (React + TypeScript)
↓
🔄 State Management (React Query + Context)
↓
🌐 API Layer (CoinGecko + Fallback)
↓
💾 Local Storage (Favoritos + Portfolio + Tema)
\`\`\`

### 🧩 **Componentes Principais**

| Componente           | Responsabilidade         | Funcionalidades                           |
| -------------------- | ------------------------ | ----------------------------------------- |
| **🏠 HomePage**      | Dashboard principal      | Market overview, lista de moedas, filtros |
| **💰 CoinDetails**   | Detalhes da moeda        | Gráficos, estatísticas, links externos    |
| **⭐ Favorites**     | Moedas favoritas         | Lista persistente, busca, ordenação       |
| **💼 Portfolio**     | Tracker de investimentos | P&L, estatísticas, adição/remoção         |
| **🧭 Navigation**    | Navegação principal      | Roteamento, tema, contadores              |
| **📊 PriceChart**    | Gráficos interativos     | Tempo real, múltiplos períodos            |
| **🔍 SearchBar**     | Busca inteligente        | Debounce, filtros, sugestões              |
| **🎨 ThemeProvider** | Tema dinâmico            | Dark/Light mode, persistência             |

### 🔄 **Fluxo de Dados**

\`\`\`
User Action → Hook → API Service → React Query → Component Update
↓
Local Storage ← State Update ← Data Processing ← API Response
\`\`\`

## 🔧 Scripts Disponíveis

\`\`\`bash

# Desenvolvimento

npm run dev

# Build para produção

npm run build

# Preview da build

npm run preview

# Linting

npm run lint

# Setup do Git (commits organizados)

chmod +x scripts/setup-git.sh
./scripts/setup-git.sh
\`\`\`

## 🌐 API

Este projeto utiliza a [CoinGecko API](https://www.coingecko.com/en/api) para obter dados das criptomoedas:

- **Endpoint principal**: `https://api.coingecko.com/api/v3`
- **Rate limit**: Gratuito com limitações
- **Dados**: Preços, market cap, volume, histórico

## 🎯 Funcionalidades Implementadas

- ✅ Dashboard com overview do mercado
- ✅ Lista de criptomoedas com paginação
- ✅ Sistema de busca com debounce
- ✅ Filtros por performance e ordenação
- ✅ Visualização em grid e lista
- ✅ Sistema de favoritos persistente
- ✅ Página de detalhes completa
- ✅ Tema dark/light com persistência
- ✅ Design totalmente responsivo
- ✅ Loading states e error handling
- ✅ Tooltips informativos
- ✅ Animações e transições suaves

## 🔮 Próximas Funcionalidades

- 📊 Gráficos de preço interativos
- 🔔 Sistema de notificações
- 💱 Comparação entre moedas
- 📱 PWA (Progressive Web App)
- 🧪 Testes automatizados
- 🚀 Deploy automatizado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


