# Correções de Dark Mode para coin-details.tsx

## ✅ Principais Correções Implementadas:

### 🎨 **Backgrounds e Temas:**

- ✅ Background dinâmico: `crypto-background-dark` / `crypto-background-light`
- ✅ Import do `useTheme` hook
- ✅ Variable `theme` adicionada no component

### 📝 **Textos Principais:**

- ✅ Títulos de moedas: cores dinâmicas (branco no dark, slate-800 no light)
- ✅ Preços: cores dinâmicas
- ✅ Textos secundários: gray-400 no dark, slate-500 no light

### 🔧 **Próximas Correções Necessárias:**

1. **CardTitles:** Todos os `text-slate-600` para dinâmicos
2. **Valores dos Cards:** `text-slate-800` para cores dinâmicas
3. **Textos Secundários:** `text-slate-500` para cores dinâmicas
4. **Links:** Cores de hover dinâmicas
5. **Indicadores de tempo:** "(24h)", "7d", "30d" etc.

### 📋 **Status Atual:**

- ✅ Build funcionando
- ✅ Correções principais aplicadas
- ⚠️ Algumas classes fixas ainda precisam ser corrigidas
- ✅ Estrutura preparada para correções restantes

### 🎯 **Estratégia Recomendada:**

- Continuar correções manuais pontuais
- Evitar substituições globais com PowerShell
- Testar o build após cada grupo de correções
- Focar nos elementos mais visíveis primeiro

### 💡 **Classes de Referência:**

```tsx
// Textos principais
className={`${theme === "dark" ? "text-white" : "text-slate-800"}`}

// Textos secundários
className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}

// Textos pequenos/labels
className={`${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}

// Links
className={`${theme === "dark" ? "text-gray-400 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"}`}
```
