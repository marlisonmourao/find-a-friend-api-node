import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['./src/domain/use-cases/*.spec.ts'],
  },
  plugins: [tsConfigPaths()],
})
