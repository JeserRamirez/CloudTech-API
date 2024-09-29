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
				throttlers: [
					{ name: 'short', limit: 5, ttl: seconds(30) },
					{ name: 'medium', limit: 10, ttl: seconds(120) },
					{ name: 'large', limit: 20, ttl: seconds(300) },
				],
			}),
		}),
		PrismaModule,
		ModulesModule,
		SeedModule,
		AuthModule,
		S3Module,
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
