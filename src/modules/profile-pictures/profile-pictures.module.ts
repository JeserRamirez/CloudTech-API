import { Module } from '@nestjs/common';
import { ProfilePicturesService } from './profile-pictures.service';
import { ProfilePicturesController } from './profile-pictures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, S3Module, AuthModule],
	controllers: [ProfilePicturesController],
	providers: [ProfilePicturesService],
})
export class ProfilePicturesModule {}
