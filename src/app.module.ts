import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PDFDocumentsModule } from './pdf-documents/pdf-documents.module';

@Module({
	imports: [PrismaModule, PDFDocumentsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
