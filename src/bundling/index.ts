import { build } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const buildVendors = async () => {
	build({
		root: path.resolve(__dirname, '..', 'vendors'),
	})
}

buildVendors();