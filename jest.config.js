const { getJestProjects } = require('@nrwl/jest');

module.exports = {
	projects: [
		...getJestProjects(),
		'<rootDir>/apps/client',
		'<rootDir>/apps/api',
		'<rootDir>/libs/shared',
		'<rootDir>/libs/ui',
		'<rootDir>/apps/maintenance',
		'<rootDir>/libs/google',
		'<rootDir>/libs/strapi',
		'<rootDir>/libs/types',
	],
};
