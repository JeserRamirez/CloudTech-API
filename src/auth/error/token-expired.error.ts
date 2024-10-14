import { BadRequestException } from '@nestjs/common';

export class TokenExpiredException extends BadRequestException {
	constructor(expirationDate: Date) {
		super(`Your token has expired on ${expirationDate.toISOString()}`);
	}
}
