import { build } from 'vite';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import path from 'path';
import dts from 'vite-plugin-dts'
import appRoot from 'app-root-path'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const buildVendors = async () => {
	build({
		plugins: [dts({
			outputDir: path.resolve(appRoot.toString(), 'dist'),
			include: 'src/vendors/**/*.{ts,tsx}',
			insertTypesEntry: true,
		})],
		clearScreen: false,

		build: {
			emptyOutDir: false,
			copyPublicDir: false,
			lib: {
				entry: path.resolve(__dirname, "..", "vendors", "index.ts"),
				name: "vendors",
				fileName: (format) => `vendors.${format}.js`,
				formats: ["es", "umd"],
			},
			outDir: path.resolve(appRoot.toString(), 'dist')
		},
	})
}

const buildWidgets = async () => {
	const widgets = await glob('src/widgets/**/*.widget.{ts,tsx}');
	console.log(widgets);

	build({
		plugins: [dts({
			outputDir: path.resolve(appRoot.toString(), 'dist'),
			include: 'src/**/*.{ts,tsx}',
			insertTypesEntry: true,
		})],
		clearScreen: false,

		build: {
			emptyOutDir: false,
			copyPublicDir: false,
			outDir: path.resolve(appRoot.toString(), 'dist', 'widgets'),
			rollupOptions: {
				input: widgets,
				preserveEntrySignatures: 'allow-extension',
				external: ['react', 'react-dom'],
				output: {
					entryFileNames: ({ name, }) => `${name.replace("src/widgets/", "").replace(".widget", "")}.js`,
					format: 'es',
					preserveModules: true,
					preserveModulesRoot: 'src/widgets',
					globals: {
						react: 'weact.React',
						'react-dom': 'weact.ReactDOM'
					}
				},
			}
		},
	})
}

buildVendors();
buildWidgets();