import { build } from 'vite';
import { glob } from 'glob';
import path from 'path';
import appRoot from 'app-root-path'
import { preact } from '@preact/preset-vite'
import typescript from '@rollup/plugin-typescript'

export const buildWidgets = async () => {
	const widgets = await glob(appRoot.path + "/src/widgets/**/*.widget.tsx");
	widgets.push(path.join("src", "mounter.ts"))

	build({
		plugins: [
			//@ts-ignore
			typescript(),
			preact()
		],

		build: {
			sourcemap: true,
			outDir: path.resolve(appRoot.toString(), 'dist'),
			lib: {
				entry: widgets,
				formats: ['es'],
			},
			rollupOptions: {
				output: {
					entryFileNames: ({ facadeModuleId }) => {
						if (facadeModuleId?.includes(".widget.tsx"))
							return facadeModuleId!.replace(appRoot.path + "/src/widgets/", "widgets/").replace(".widget.tsx", '.js')
						else
							return 'utils/[name].js'
					},
					format: 'es',
					manualChunks: {
						"utils/preact": ["preact", "preact/compat", "preact/hooks", "preact/jsx-runtime"],
						"utils/lit": ["lit"]
					},
					minifyInternalExports: false,
					chunkFileNames: '[name].js'
				},
			}
		},
	})
}

buildWidgets()