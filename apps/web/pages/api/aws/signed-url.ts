import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';
import session from 'middlewares/session';
import hasPermission from 'middlewares/hasPermission';
import { Permission } from '@prisma/client';
import { environment } from 'environments/environment';
import Joi from 'joi';
import validate from 'middlewares/validate';
import { AWSS3Params, AWSUploadFile, SignedAWSUploadFile } from 'types/aws';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBody = Joi.object({
	files: Joi.array()
		.items(
			Joi.object({
				fileName: Joi.string().required(),
				fileType: Joi.string().required(),
			}).required()
		)
		.required(),
}).required();

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

					const image = await prisma.image.create({
						data: {
							name: file.fileName,
							type: file.fileType,
							url: `https://${s3Bucket}/${folder}/${file.fileName}`,
						},
					});

					return {
						image,
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
