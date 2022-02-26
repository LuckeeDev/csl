import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';
import session from 'middlewares/session';
import hasPermission from 'middlewares/hasPermission';
import { Permission } from '@prisma/client';
import { environment } from 'environments/environment';
import joi from 'joi';
import validate from 'middlewares/validate';
import { AWSS3Params, AWSUploadFile, SignedAWSUploadFile } from 'types/aws';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBody = joi
	.object({
		files: joi
			.array()
			.items(
				joi
					.object({
						fileName: joi.string().required(),
						fileType: joi.string().required(),
					})
					.required()
			)
			.required(),
	})
	.required();

handler.post(
	session,
	hasPermission(Permission.SHOP_MANAGER),
	validate({ body: postBody }),
	async (req, res) => {
		aws.config.update({
			region: 'eu-south-1',
			accessKeyId: environment.aws.id,
			secretAccessKey: environment.aws.secret,
		});

		const s3Bucket = environment.aws.bucket;

		const s3 = new aws.S3();

		const folder = 'products';

		function getSignedUrl(s3Params: AWSS3Params) {
			return new Promise<string>((resolve, reject) => {
				s3.getSignedUrl('putObject', s3Params, (err, data) => {
					if (err) {
						reject();
					}

					resolve(data);
				});
			});
		}

		try {
			const files: AWSUploadFile[] = req.body.files;

			const signedFiles: SignedAWSUploadFile[] = await Promise.all(
				files.map(async (file) => {
					const s3Params = {
						Bucket: s3Bucket,
						Key: `${folder}/${file.fileName}`,
						ContentType: file.fileType,
					};

					const signedUrl = await getSignedUrl(s3Params);

					return {
						...file,
						signedUrl,
					};
				})
			);

			return res.status(200).json({ signedFiles });
		} catch (err) {
			return res.status(500).json(err);
		}
	}
);

export default handler;
