import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { ModulesModule } from './modules/modules.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		ModulesModule,
		SeedModule,
		AuthModule,
		S3Module,
		ModulesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
