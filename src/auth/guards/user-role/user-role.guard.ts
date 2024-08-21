import { Reflector } from '@nestjs/core';
import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { META_ROLES } from 'src/auth/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const validRoles: string[] = this.reflector.get(
			META_ROLES,
			context.getHandler(),
		);

		if (!validRoles || validRoles.length === 0) return true;

		const req = context.switchToHttp().getRequest();
		const user = req.user;

		if (!user) throw new BadRequestException('User not found');

		// Chequea los roles dependiendo del tipo de usuario
		let userRoles: string[];
		if (user.curp) {
			const applicant = await this.prisma.applicant.findUnique({
				where: { curp: user.curp },
			});
			userRoles = applicant.roles;
		} else if (user.control_number) {
			const student = await this.prisma.student.findUnique({
				where: { control_number: user.control_number },
			});
			userRoles = student.roles;
		} else if (user.teacher_number) {
			const teacher = await this.prisma.teacher.findUnique({
				where: { teacher_number: user.teacher_number },
			});
			userRoles = teacher.roles;
		} else {
			throw new BadRequestException('Invalid user type');
		}

		for (const role of userRoles) {
			if (validRoles.includes(role)) {
				return true;
			}
		}

		throw new ForbiddenException(`User needs a valid role: [${validRoles}]`);
	}
}
