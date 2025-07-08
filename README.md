# 🚀 Crypto Dashboard

Dashboard profissional para acompanhar preços e tendências das principais criptomoedas do mercado em tempo real.

![Crypto Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-cyan)

## ✨ Funcionalidades

- 📊 **Dashboard Completo** - Visão geral do mercado de criptomoedas
- 💰 **Lista de Moedas** - Top 50 criptomoedas por market cap
- 🔍 **Busca e Filtros** - Busque por nome/símbolo e filtre por performance
- ❤️ **Sistema de Favoritos** - Salve suas moedas favoritas
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile e desktop
- 🌙 **Tema Dark/Light** - Alterne entre temas com persistência
- 📈 **Detalhes Completos** - Informações detalhadas de cada moeda
- 🔄 **Dados em Tempo Real** - Integração com API CoinGecko

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API**: CoinGecko API

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

\`\`\`
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI base (Radix)
│   ├── coin-card.tsx   # Card de moeda
│   ├── coin-list.tsx   # Lista de moedas
│   ├── navigation.tsx  # Navegação principal
│   └── ...
├── contexts/           # Contextos React
│   └── theme-context.tsx
├── hooks/              # Hooks customizados
│   ├── use-crypto.ts
│   ├── use-favorites.ts
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── home.tsx
│   ├── coin-details.tsx
│   └── favorites.tsx
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Tipos TypeScript
│   └── crypto.ts
├── lib/                # Utilitários
│   └── utils.ts
└── main.tsx           # Entrada da aplicação
\`\`\`

## 🎨 Componentes Principais

### Dashboard Header
- Market cap total do mercado
- Volume de negociação 24h
- Dominância do Bitcoin
- Tooltips informativos

### Lista de Moedas
- Visualização em grid ou lista
- Ordenação por market cap ou preço
- Filtros por performance (alta/baixa)
- Sistema de favoritos integrado

### Detalhes da Moeda
- Informações completas da criptomoeda
- Gráficos de performance
- Links para recursos externos
- Histórico de preços

### Sistema de Favoritos
- Adicionar/remover favoritos
- Página dedicada aos favoritos
- Persistência no localStorage
- Contador dinâmico na navegação

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

## 🙏 Agradecimentos

- [CoinGecko](https://www.coingecko.com/) pela API gratuita
- [Radix UI](https://www.radix-ui.com/) pelos componentes acessíveis
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [Lucide](https://lucide.dev/) pelos ícones

---

Desenvolvido com ❤️ usando React + Vite
