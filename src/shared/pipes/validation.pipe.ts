import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ListErrors } from '../types';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToClass(metatype, value);
    const validationErrors = await validate(object);

    if (validationErrors.length > 0)
      throw new BadRequestException(this.parseErrors(validationErrors));

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private parseErrors(
    validationErrors: ValidationError[],
    response: ListErrors = { errors: [] },
  ) {
    validationErrors.forEach(error => {
      const title = 'Validation failed';
      const { dataType } = error.target as any;

      for (const constraint in error.constraints) {
        const source = {};
        if (dataType === 'query') source['parameter'] = `${error.property}`;
        else source['pointer'] = `/data/attributes/${error.property}`;

        return response.errors.push({
          source,
          title,
          detail: error.constraints[constraint],
        });
      }

      let actualErrorChildren = error.children;
      const properties = [error.property];
      while (!actualErrorChildren[0].constraints) {
        properties.push(actualErrorChildren[0].property);
        actualErrorChildren = actualErrorChildren[0].children;
      }

      for (const actualError of actualErrorChildren) {
        const source = {};
        if (dataType === 'query')
          source['parameter'] = `${properties.join('/')}/${
            actualError.property
          }`;
        else
          source['pointer'] = `/data/attributes/${properties.join('/')}/${
            actualError.property
          }`;

        response.errors.push({
          title,
          source,
          detail:
            actualError.constraints[Object.keys(actualError.constraints)[0]],
        });
      }
    });

    return response;
  }
}
