import ip from 'ip';
import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.common.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const infoColor = (message) =>
	`\u001b[1m\u001b[34m${message}\u001b[39m\u001b[22m`;

export default merge(commonConfiguration, {
	stats: 'errors-warnings',
	mode: 'development',
	infrastructureLogging: {
		level: 'warn',
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		open: true,
		allowedHosts: 'all',
		hot: true,
		watchFiles: ['src/**', 'static/**'],
		static: {
			watch: true,
			directory: path.join(__dirname, '../static'),
		},
		client: {
			logging: 'none',
			overlay: true,
			progress: false,
		},
		server: {
			type: 'http',
		},
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer) {
				throw new Error('webpack-dev-server не найден');
			}

			const port = devServer.options.port;
			const localIp = ip.address();
			const domain1 = `http://${localIp}:${port}`;
			const domain2 = `http://localhost:${port}`;

			console.log(
				`Проект запущен на:\n  - ${infoColor(domain1)}\n  - ${infoColor(
					domain2
				)}`
			);

			return middlewares;
		},
	},
});
