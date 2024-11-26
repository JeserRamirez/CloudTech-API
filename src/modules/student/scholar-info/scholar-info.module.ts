import { Module } from '@nestjs/common';
import { ScholarInfoService } from './scholar-info.service';
import { ScholarInfoController } from './scholar-info.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [ScholarInfoController],
	providers: [ScholarInfoService],
})
export class ScholarInfoModule {}
