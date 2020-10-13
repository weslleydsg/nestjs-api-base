import { IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderTypes } from 'src/shared/enums/orderTypes';
import { PageQuery } from 'src/shared/dto';

const orderTypesMessageError = `$property must be '${OrderTypes.ASC}' or '${OrderTypes.DESC}'`;

export class QueryOrder {
  constructor(object: QueryOrder, defaults = false) {
    if (object && Object.keys(object).length > 0) {
      if (object?.read) this.read = object.read;
      if (object?.title) this.title = object.title;
      if (object?.content) this.content = object.content;
      if (object?.createdAt) this.createdAt = object.createdAt;
      if (object?.updatedAt) this.updatedAt = object.updatedAt;
    } else if (defaults) {
      this.read = OrderTypes.ASC;
      this.createdAt = OrderTypes.DESC;
    }
  }

  @IsEnum(OrderTypes, { message: orderTypesMessageError })
  @IsOptional()
  readonly read?: OrderTypes;

  @IsEnum(OrderTypes, { message: orderTypesMessageError })
  @IsOptional()
  readonly title?: OrderTypes;

  @IsEnum(OrderTypes, { message: orderTypesMessageError })
  @IsOptional()
  readonly content?: OrderTypes;

  @IsEnum(OrderTypes, { message: orderTypesMessageError })
  @IsOptional()
  readonly createdAt?: OrderTypes;

  @IsEnum(OrderTypes, { message: orderTypesMessageError })
  @IsOptional()
  readonly updatedAt?: OrderTypes;
}

export class NotificationQueryDTO {
  readonly dataType? = 'query';

  constructor(
    object: NotificationQueryDTO,
    loadDefaults = false,
    defaultObject: NotificationQueryDTO = null,
  ) {
    const order = new QueryOrder(object?.order);

    if (loadDefaults) {
      this.page = new PageQuery(object?.page, true, defaultObject?.page);
      this.order = new QueryOrder(order, true);
    } else {
      this.page = new PageQuery(object?.page);
      this.order = order;
    }
  }

  @ValidateNested()
  @Type(() => PageQuery)
  @IsOptional()
  readonly page?: PageQuery;

  @ValidateNested()
  @Type(() => QueryOrder)
  @IsOptional()
  readonly order?: QueryOrder;
}
