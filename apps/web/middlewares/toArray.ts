import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export default function toArray(queryField: string) {
	return (req: NextApiRequest, _: NextApiResponse, next: NextHandler) => {
		const fieldData = req.query[queryField];

		if (fieldData && typeof fieldData === 'string') {
			req.query[queryField] = [fieldData];
		}

		next();
	};
}
