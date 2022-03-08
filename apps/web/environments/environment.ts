export const environment = {
	url: process.env.NEXT_PUBLIC_BASE_URL,
	aws: {
		secret: process.env.AWS_SECRET,
		id: process.env.AWS_ID,
		bucket: process.env.AWS_BUCKET,
	},
};
