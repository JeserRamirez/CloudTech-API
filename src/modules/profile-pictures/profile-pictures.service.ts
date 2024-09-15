import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getUserId } from 'src/common/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfilePicturesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3Service: S3Service,
		private readonly configService: ConfigService,
	) {}

	private async getUserProfilePicture(userId: string) {
		return await this.prisma.profile_picture.findUnique({
			where: { user_id: userId },
		});
	}

	private async uploadToS3AndSave(
		userId: string,
		fileName: string,
		file: Buffer,
	): Promise<string> {
		const uniqueFileName = `${userId}_${uuidv4()}_${fileName}`;
		const fileUrl = await this.s3Service.uploadFile(
			this.configService.getOrThrow<string>('AWS_PROFILE_PICTURES_BUCKET_NAME'),
			uniqueFileName,
			file,
		);
		if (!fileUrl) {
			throw new Error('File upload to S3 failed.');
		}

		await this.prisma.profile_picture.upsert({
			where: { user_id: userId },
			update: { s3_key: uniqueFileName },
			create: { s3_key: uniqueFileName, user_id: userId },
		});

		return fileUrl;
	}

	async getOne(user: any): Promise<string | null> {
		const userId = getUserId(user);
		const userProfilePicture = await this.getUserProfilePicture(userId);

		if (userProfilePicture.s3_key === '')
			throw new NotFoundException('User does not have a profile picture');

		return await this.s3Service.getFileUrl(
			this.configService.getOrThrow<string>('AWS_PROFILE_PICTURES_BUCKET_NAME'),
			userProfilePicture.s3_key,
		);
	}

	async upload(user: any, fileName: string, file: Buffer): Promise<string> {
		const userId = getUserId(user);
		const userProfilePicture = await this.getUserProfilePicture(userId);

		if (userProfilePicture && userProfilePicture.s3_key === '') {
			return await this.uploadToS3AndSave(userId, fileName, file);
		}

		if (userProfilePicture && userProfilePicture.s3_key === fileName) {
			return this.s3Service.getFileUrl(
				this.configService.getOrThrow<string>(
					'AWS_PROFILE_PICTURES_BUCKET_NAME',
				),
				userProfilePicture.s3_key,
			);
		}

		if (userProfilePicture) {
			await this.s3Service.deleteFile(
				userProfilePicture.s3_key,
				this.configService.getOrThrow<string>(
					'AWS_PROFILE_PICTURES_BUCKET_NAME',
				),
			);
		}

		return await this.uploadToS3AndSave(userId, fileName, file);
	}

	async delete(user: any): Promise<void> {
		const userId = getUserId(user);
		const userProfilePicture = await this.getUserProfilePicture(userId);

		if (!userProfilePicture) {
			throw new BadRequestException(
				'User does not have a profile picture to delete.',
			);
		}

		await this.s3Service.deleteFile(
			userProfilePicture.s3_key,
			this.configService.getOrThrow<string>('AWS_PROFILE_PICTURES_BUCKET_NAME'),
		);
		await this.prisma.profile_picture.update({
			where: { user_id: userId },
			data: { s3_key: '' },
		});
	}
}
