
# Simple API key generator Front-end

This project demonstrates a simple React app using Vite, Tailwind CSS v4, and shadcn UI components with path alias configured.

---

## Setup and Commands

### 1. Create new Vite React + TypeScript project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Install Tailwind CSS v4 and PostCSS plugin

```bash
npm install -D tailwindcss@latest postcss @tailwindcss/postcss autoprefixer
npx tailwindcss init -p   # (in Tailwind v4, use tailwindcss init -p after installing the packages)
```

---

### 4. Configure Tailwind in `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

### 5. Add Tailwind directives in `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 6. Install Node.js types for TypeScript & configure alias

```bash
npm install --save-dev @types/node
```

Add alias to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client", "node"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "target": "ESNext",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

---

### 7. Configure alias in `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

### 8. Install shadcn UI CLI & initialize project

```bash
npx shadcn@latest init
```

Add Button component:

```bash
npx shadcn@latest add button
```

---

### 9. Run development server

```bash
npm run dev
```

Open the URL in your browser (usually http://localhost:5173)

---

## Usage

- Import components from `@/components/ui/...`
- Use Tailwind CSS utility classes freely in JSX
- Customize shadcn components or create your own with Tailwind

---

## Notes

- Restart your editor/IDE after modifying `tsconfig.json`
- Use `@` alias for cleaner imports e.g. `import { Button } from '@/components/ui/button'`

---

Enjoy building your React + Tailwind + shadcn UI app! 🚀