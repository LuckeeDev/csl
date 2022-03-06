import { Image } from '@prisma/client';

export interface AWSUploadFile {
	fileName: string;
	fileType: string;
}

export interface SignedAWSUploadFile {
	image: Image;
	signedUrl: string;
}

export interface AWSS3Params {
	Key?: string;
	Bucket?: string;
	ContentType?: string;
}
