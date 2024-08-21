import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prisma: PrismaService,
		configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload) {
		const { id } = payload;

		const user =
			(await this.prisma.applicant.findUnique({
				where: { curp: id },
			})) ||
			(await this.prisma.student.findUnique({
				where: { control_number: id },
			})) ||
			(await this.prisma.teacher.findUnique({ where: { teacher_number: id } }));

		if (!user) throw new UnauthorizedException('Token not valid');

		if (!user.isActive) throw new UnauthorizedException('User is not active');

		return user;
	}
}
