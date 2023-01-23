/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const environment = {
	url: process.env.NEXT_PUBLIC_BASE_URL!,
	aws: {
		secret: process.env.AWS_SECRET!,
		id: process.env.AWS_ID!,
		bucket: process.env.AWS_BUCKET!,
	},
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID!,
		secret: process.env.GOOGLE_CLIENT_SECRET!,
	},
	allowedEmailDomains: process.env.ALLOWED_EMAIL_DOMAINS?.split(',') ?? [],
};
