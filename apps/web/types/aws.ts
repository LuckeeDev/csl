export interface AWSUploadFile {
	fileName: string;
	fileType: string;
}

export interface SignedAWSUploadFile extends AWSUploadFile {
	signedUrl: string;
}

export interface AWSS3Params {
	Key?: string;
	Bucket?: string;
	ContentType?: string;
}
