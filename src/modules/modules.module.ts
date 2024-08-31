import { Module } from '@nestjs/common';
import { PDFDocumentsModule } from './pdf-documents/pdf-documents.module';
import { ProfilePicturesModule } from './profile-pictures/profile-pictures.module';

@Module({
	imports: [PDFDocumentsModule, ProfilePicturesModule],
})
export class ModulesModule {}
