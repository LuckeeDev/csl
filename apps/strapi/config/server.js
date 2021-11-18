module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	url: env('STRAPI_URL', 'http://localhost:1337'),
	admin: {
		url: process.env.NODE_ENV === 'production' ? '/' : '/admin', // Note: The administration will be accessible from the root of the domain (ex: http://yourfrontend.com/)
		serveAdminPanel: process.env.NODE_ENV === 'production' ? false : true, // http://yourbackend.com will not serve any static admin files
		auth: {
			secret: env('ADMIN_JWT_SECRET', 'ad847df82b5721bb3fbe8f169958ccde'),
		},
	},
});
