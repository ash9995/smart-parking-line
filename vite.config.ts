import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE 'repo-name' WITH THE EXACT NAME OF YOUR GITHUB REPOSITORY
  // Example: if your repo is 'parking-system', use '/parking-system/'
  base: "/YOUR_REPO_NAME/", 
  resolve: {
    alias: {
      "@": path.resolve(__kqdirname, "./src"),
    },
  },
})
