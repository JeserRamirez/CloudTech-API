import { Injectable } from '@nestjs/common';
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
	private readonly s3: S3;

	constructor(private readonly configService: ConfigService) {
		this.s3 = new S3({
			region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
			credentials: {
				accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
				secretAccessKey: this.configService.getOrThrow<string>(
					'AWS_SECRET_ACCESS_KEY',
				),
			},
		});
	}

	async getPreSignedURLToViewObject(
		bucketName: string,
		key: string,
	): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: bucketName,
			Key: key,
		});

		return getSignedUrl(this.s3, command, { expiresIn: 300 });
	}

	// Puedes agregar otros métodos para manejar subidas, eliminaciones, etc.
}
