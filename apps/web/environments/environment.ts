export const environment = {
	url: 'http://localhost:3000',
	aws: {
		secret: process.env.AWS_SECRET,
		id: process.env.AWS_ID,
		bucket: process.env.AWS_BUCKET,
	},
};
