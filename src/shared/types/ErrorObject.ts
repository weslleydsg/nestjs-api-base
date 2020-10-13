import { HttpStatus } from '@nestjs/common';

export class ErrorObject {
  constructor(error: ErrorObject, defaultStatus: HttpStatus = undefined) {
    this.status = error.status || defaultStatus;
    Object.assign(this, error);
  }

  status?: HttpStatus;
  source?: { pointer?: string; parameter?: string };
  title?: string;
  detail: string;
}

export class ListErrors {
  constructor(errors: ErrorObject[], defaultStatus: HttpStatus = undefined) {
    for (const error of errors)
      this.errors.push(new ErrorObject(error, defaultStatus));
  }

  errors: ErrorObject[] = [];
}
