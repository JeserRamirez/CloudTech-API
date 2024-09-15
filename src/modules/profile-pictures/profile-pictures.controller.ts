import {
	Controller,
	Delete,
	Get,
	ParseFilePipe,
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
	@UseInterceptors(FileInterceptor('file'))
	async uploadProfilePicture(
		@GetUser() user: any,
		@UploadedFile(new ParseFilePipe({ validators: [] }))
		file: Express.Multer.File,
	) {
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
