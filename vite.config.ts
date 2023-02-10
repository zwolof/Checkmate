import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {

		alias: {
			"@": path.resolve(".", "src"),
			"@components": path.resolve(".", "src/components"),
			"@models": path.resolve(".", "src/models"),
			"@types": path.resolve(".", "src/types"),
			"@utils": path.resolve(".", "src/utils"),
		}
	}
})
