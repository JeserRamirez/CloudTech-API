import { Controller } from '@nestjs/common';
import { ProfilePicturesService } from './profile-pictures.service';

@Controller('profile-pictures')
export class ProfilePicturesController {
	constructor(
		private readonly profilePicturesService: ProfilePicturesService,
	) {}
}
