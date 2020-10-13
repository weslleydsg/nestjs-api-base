import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface Options {
  readonly hideStringFromMessage?: boolean;
}

@ValidatorConstraint({ name: 'IsPositiveString' })
export class IsPositiveStringConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly options: Options) {}

  validate(value: any) {
    return value > 0;
  }

  defaultMessage() {
    return `$property must be positive${
      this.options.hideStringFromMessage ? '' : ' string'
    }`;
  }
}

export function IsPositiveString(
  options: Options = {},
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: new IsPositiveStringConstraint(options),
    });
  };
}
