import { Module } from '@nestjs/common';
import { DebtsToDepartmentsService } from './debts-to-departments.service';
import { DebtsToDepartmentsController } from './debts-to-departments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [DebtsToDepartmentsController],
	providers: [DebtsToDepartmentsService],
})
export class DebtsToDepartmentsModule {}
