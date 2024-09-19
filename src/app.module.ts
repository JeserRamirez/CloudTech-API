import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { ModulesModule } from './modules/modules.module';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRootAsync({
			useFactory: () => ({
				throttlers: [{ name: 'auth', limit: 5, ttl: seconds(60) }],
			}),
		}),
		PrismaModule,
		ModulesModule,
		SeedModule,
		AuthModule,
		S3Module,
		ModulesModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
