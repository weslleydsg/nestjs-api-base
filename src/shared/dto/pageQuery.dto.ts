import { IsOptional, IsNumberString } from 'class-validator';

import { IsIntegerString, IsPositiveString } from 'src/shared/decorators';

export class PageQuery {
  constructor(
    object: PageQuery,
    loadDefaults = false,
    defaultObject: PageQuery = null,
  ) {
    if (loadDefaults) {
      this.number = object?.number || defaultObject?.number || this.number;
      this.size = object?.size || defaultObject?.size || this.size;
    } else {
      this.number = object?.number;
      this.size = object?.size;
    }
  }

  @IsPositiveString({ hideStringFromMessage: true })
  @IsIntegerString({ hideStringFromMessage: true })
  @IsNumberString(null, { message: '$property must be a number' })
  @IsOptional()
  readonly number?: string = '1';

  @IsPositiveString({ hideStringFromMessage: true })
  @IsIntegerString({ hideStringFromMessage: true })
  @IsNumberString(null, { message: '$property must be a number' })
  @IsOptional()
  readonly size?: string = '20';
}
