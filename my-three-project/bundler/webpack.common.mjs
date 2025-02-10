import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: path.resolve(__dirname, '../src/script.js'),
	output: {
		hashFunction: 'xxhash64',
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	devtool: 'source-map',
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../static'),
					noErrorOnMissing: true,
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
			minify: true,
		}),
		new MiniCSSExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: ['html-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: [MiniCSSExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext]',
				},
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext]',
				},
			},
		],
	},
};
