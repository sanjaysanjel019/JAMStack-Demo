const nodeExternals = require('webpack-node-externals');
const axios = require('axios');
module.exports = function(api) {
	api.chainWebpack((config, { isServer }) => {
		if (isServer) {
			config.externals([
				nodeExternals({
					allowlist: [/^vuetify/]
				})
			]);
		}
	});

	api.loadSource(async (actions) => {
		// Use the Data store API here: https://gridsome.org/docs/data-store-api
		const { data } = await axios.get('http://localhost:1337/products');
		const collection = actions.addCollection({
			typeName: 'Product'
		});
		for (const product of data) {
			collection.addNode({
				id: product.id,
				title: product.title,
				price: product.price,
				rating: product.rating,
				description: product.description,
				image: product.image.formats.thumbnail.url,
				instructions: product.instructions
			});
		}

		api.createPages(({ createPages }) => {});
	});
};
