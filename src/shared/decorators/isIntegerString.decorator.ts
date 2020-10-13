import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface Options {
  readonly hideStringFromMessage?: boolean;
}

@ValidatorConstraint({ name: 'IsIntegerString' })
export class IsIntegerStringConstraint implements ValidatorConstraintInterface {
  constructor(private readonly options: Options) {}

  validate(value: any) {
    return Number.isInteger(Number(value));
  }

  defaultMessage() {
    return `$property must be integer${
      this.options.hideStringFromMessage ? '' : ' string'
    }`;
  }
}

export function IsIntegerString(
  options: Options = {},
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: new IsIntegerStringConstraint(options),
    });
  };
}
