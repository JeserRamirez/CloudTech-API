import { Injectable } from '@nestjs/common';
import { PutObjectCommand, DeleteObjectCommand, S3 } from '@aws-sdk/client-s3';
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

	async getFileUrl(bucketName: string, key: string): Promise<string> {
		// Generate the public URL of the file
		const url = `https://${bucketName}.s3.amazonaws.com/${key}`;
		return url;
	}

	async uploadFile(
		bucketName: string,
		key: string,
		body: Buffer,
	): Promise<string> {
		try {
			const command = new PutObjectCommand({
				Bucket: bucketName,
				Key: key,
				Body: body,
			});
			await this.s3.send(command);

			// Generates the public URL of the file
			const url = this.getFileUrl(bucketName, key);
			return url;
		} catch (error) {
			throw new Error('Error uploading file');
		}
	}

	async deleteFile(key: string, bucket: string) {
		const command = new DeleteObjectCommand({
			Bucket: bucket, // bucket name
			Key: key, // The key (filename) that you want to delete
		});

		try {
			await this.s3.send(command);
		} catch (error) {
			throw new Error(`Error deleting the file ${key} of S3`);
		}
	}
}
