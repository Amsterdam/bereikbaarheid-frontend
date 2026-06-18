import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["build/", "node_modules/", "coverage/", "public/"])]);