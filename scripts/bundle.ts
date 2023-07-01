import { build } from 'vite';
import { glob } from 'glob';
import path from 'path';
import appRoot from 'app-root-path'
import { preact } from '@preact/preset-vite'
import typescript from '@rollup/plugin-typescript'

export const buildWidgets = async () => {
	const entries = await glob("widgets/**/*.widget.tsx");
	entries.push(path.join("scripts", "mounter.ts"))
	entries.push(path.join("scripts", "litWrapper.ts"))


	build({
		plugins: [
			//@ts-ignore
			typescript(),
			preact(),
		],

		build: {
			sourcemap: true,
			outDir: path.resolve(appRoot.toString(), 'dist'),
			lib: {
				entry: entries,
				formats: ['es'],
			},
			rollupOptions: {
				plugins: [
				],
				output: {
					entryFileNames: ({ facadeModuleId }) => {
						if (facadeModuleId?.includes(".widget.tsx"))
							return facadeModuleId!.replace(appRoot.path + "/widgets/", "widgets/").replace(".widget.tsx", '')
						else
							return 'utils/[name].js'
					},
					manualChunks: {
						preact: ['preact'],
						'jsx-runtime': ['preact/jsx-runtime'],
						'preact-compat': ['preact/compat']
					},
					format: 'es',
					minifyInternalExports: false,
					chunkFileNames: 'utils/[name].js'
				},
			}
		},
	})
}

buildWidgets()