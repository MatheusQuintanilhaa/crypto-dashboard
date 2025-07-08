#!/bin/bash

# Script para configurar o repositório Git e fazer commits organizados
# Crypto Dashboard - Projeto Vite + React

echo "🚀 Configurando repositório Git para o Crypto Dashboard..."

# Inicializar repositório Git se não existir
if [ ! -d ".git" ]; then
    git init
    echo "✅ Repositório Git inicializado"
fi

# Configurar .gitignore
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/

# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF

echo "✅ .gitignore configurado"

# Fazer commits organizados
echo "📝 Fazendo commits organizados..."

# Commit 1: Configuração inicial
git add package.json vite.config.ts tailwind.config.js postcss.config.js tsconfig.json index.html
git commit -m "🎉 feat: configuração inicial do projeto Vite + React

- Configuração do Vite com TypeScript
- Setup do Tailwind CSS com configuração customizada
- Configuração do PostCSS
- Estrutura base do projeto
- Dependências principais: React, TypeScript, Tailwind, Radix UI"

# Commit 2: Estrutura base e utilitários
git add src/lib/ src/index.css src/main.tsx
git commit -m "🔧 feat: estrutura base e configuração de estilos

- Utilitário cn() para merge de classes CSS
- Configuração de estilos globais com Tailwind
- Temas dark/light com CSS variables
- Configuração do React DOM e providers
- Estilos customizados para scrollbar e animações"

# Commit 3: Contextos e providers
git add src/contexts/ src/components/query-provider.tsx
git commit -m "⚙️ feat: configuração de contextos e providers

- ThemeProvider para gerenciamento de tema dark/light
- QueryProvider para React Query
- Persistência de tema no localStorage
- Detecção automática de preferência do sistema"

# Commit 4: Tipos e serviços
git add src/types/ src/services/
git commit -m "🏗️ feat: tipos TypeScript e serviços de API

- Interfaces para Coin e CoinDetails
- Serviço CryptoAPI para integração com CoinGecko
- Tratamento de erros e validação de dados
- Tipagem completa para dados de criptomoedas"

# Commit 5: Hooks customizados
git add src/hooks/
git commit -m "🪝 feat: hooks customizados para dados e favoritos

- useCrypto() para buscar lista de moedas
- useCoinDetails() para detalhes específicos
- useFavorites() com persistência no localStorage
- Integração com React Query para cache e refetch"

# Commit 6: Componentes UI base
git add src/components/ui/
git commit -m "🎨 feat: componentes UI base com Radix

- Button, Card, Input, Skeleton componentes
- Alert, Badge, Tabs para interface
- DropdownMenu, Sheet, Tooltip para interações
- Componentes totalmente tipados e acessíveis"

# Commit 7: Componentes de layout e navegação
git add src/components/navigation.tsx src/App.tsx
git commit -m "🧭 feat: navegação e layout principal

- Componente Navigation responsivo
- Integração com React Router
- Menu mobile com Sheet
- Toggle de tema integrado
- Contador de favoritos dinâmico"

# Commit 8: Componentes de dashboard
git add src/components/dashboard-header.tsx src/components/market-overview.tsx
git commit -m "📊 feat: componentes de dashboard e overview

- DashboardHeader com dados globais do mercado
- MarketOverview com top gainers/losers
- Integração com API CoinGecko para dados globais
- Cards informativos com tooltips explicativos"

# Commit 9: Componentes de listagem
git add src/components/coin-list.tsx src/components/coin-card.tsx src/components/coin-row.tsx
git commit -m "📋 feat: componentes de listagem de moedas

- CoinList com visualização grid/lista
- CoinCard com animações e hover effects
- CoinRow para visualização compacta
- Integração completa com sistema de favoritos"

# Commit 10: Componentes de busca e filtros
git add src/components/search-bar.tsx src/components/filter-buttons.tsx src/components/*skeleton.tsx
git commit -m "🔍 feat: busca, filtros e estados de loading

- SearchBar com debounce e clear
- FilterButtons para ordenação e visualização
- Skeleton components para loading states
- Filtros por performance (alta/baixa)"

# Commit 11: Páginas principais
git add src/pages/
git commit -m "📄 feat: páginas principais da aplicação

- HomePage com dashboard completo
- CoinDetailsPage com informações detalhadas
- FavoritesPage para moedas favoritadas
- Integração com React Router para navegação"

# Commit 12: Scripts e documentação
git add scripts/ README.md
git commit -m "📚 docs: scripts de setup e documentação

- Script de configuração Git automatizado
- Commits organizados por funcionalidade
- Documentação de instalação e uso
- Estrutura de projeto documentada"

echo "✅ Todos os commits realizados com sucesso!"
echo ""
echo "📋 Resumo dos commits:"
git log --oneline -12

echo ""
echo "🎯 Próximos passos:"
echo "1. npm install - Instalar dependências"
echo "2. npm run dev - Iniciar servidor de desenvolvimento"
echo "3. Abrir http://localhost:5173 no navegador"
echo ""
echo "🚀 Projeto Crypto Dashboard configurado com sucesso!"
