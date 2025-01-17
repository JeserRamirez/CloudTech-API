import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailService } from './services/mail.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, MailService],
	imports: [
		ConfigModule,
		PrismaModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
	],
	exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
