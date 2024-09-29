import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ProfilePicturesService } from './profile-pictures.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { fileFilter } from './helpers';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Profile Pictures')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('profile-pictures')
export class ProfilePicturesController {
	constructor(
		private readonly profilePicturesService: ProfilePicturesService,
	) {}

	@Get()
	@Auth(ValidRoles.applicant, ValidRoles.student, ValidRoles.teacher)
	async getFile(@GetUser() user: any, @Res() res: Response) {
		const fileUrl = await this.profilePicturesService.getOne(user);

		if (fileUrl) {
			res.json({ url: fileUrl });
		} else {
			res.status(404).send('Profile picture not found');
		}
	}

	@Post()
	@Auth(ValidRoles.applicant, ValidRoles.student, ValidRoles.teacher)
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter: fileFilter,
			limits: { fileSize: 6500 },
		}),
	)
	async uploadProfilePicture(
		@GetUser() user: any,
		@UploadedFile()
		file: Express.Multer.File,
	) {
		if (!file) {
			throw new BadRequestException('Make sure that the file is an image');
		}

		const fileUrl = await this.profilePicturesService.upload(
			user,
			file.originalname,
			file.buffer,
		);

		return { url: fileUrl };
	}

	@Delete()
	@Auth(ValidRoles.applicant, ValidRoles.student, ValidRoles.teacher)
	async deleteProfilePicture(@GetUser() user: any) {
		await this.profilePicturesService.delete(user);

		return { message: 'Profile picture deleted' };
	}
}
