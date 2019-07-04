const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/* config-overrides.js */
module.exports = function override(config, env) {
	/**
	 * ant design 使用自定義的 export modules
	 * 避免 ant-design/icons 全包匯出導致 bundle 過大
	 * @issue https://github.com/ant-design/ant-design/issues/12011
	 */
	if (!config.resolve) config.resolve = {};
	if (!config.resolve.alias) config.resolve.alias = {};
	config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/antd-icons.js');
	/** 分析打包後的 bundle 內容 */
	if (env === 'production') {
		if (!config.plugins) config.plugins = [];
		config.plugins.push(new BundleAnalyzerPlugin());
	}
	return config;
}
