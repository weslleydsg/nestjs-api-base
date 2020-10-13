import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface JsonApi {
  readonly meta?: { totalPages: number; actualPage: number };

  readonly queryObject?: any;
  readonly data?: any;
  readonly listData?: any[];

  readonly showLinks?: boolean;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private transformData(data: any) {
    const getRelationships = (value: any) => {
      const relationshipKey = (object: any, key: string) => {
        const { type } = object.infos;
        delete object.infos;

        const id = object.id;
        delete object.id;

        const relationships = {};
        relationships[key] = { data: {} };
        relationships[key].data.type = type;
        relationships[key].data.id = id;
        relationships[key].data.attributes =
          Object.keys(object).length > 0 ? object : undefined;

        const relationship =
          Object.keys(object).length > 0 ? getRelationships(object) : null;

        if (relationship)
          relationships[key].data.relationships = {
            ...relationships[key].data.relationships,
            ...relationship,
          };

        return relationships;
      };

      for (const key of Object.keys(value)) {
        const object = value[key];

        if (object) {
          if (object.infos) {
            delete value[key];

            return relationshipKey(object, key);
          } else if (object.length > 0 && object[0].infos) {
            delete value[key];
            for (const e of object) {
              return relationshipKey(e, key);
            }
          }
        }
      }
    };

    const relationships = getRelationships(data);

    const { type } = data.infos;
    delete data.infos;

    const id = data.id;
    delete data.id;

    return {
      type,
      id,
      attributes: Object.keys(data).length > 0 ? data : undefined,
      relationships,
    };
  }

  private objectToQueryString(object: any) {
    const transform = (obj: any, queries = [], props = []) => {
      for (const prop in obj) {
        const el = obj[prop];
        if (el instanceof Object) transform(el, queries, [...props, prop]);
        else {
          const finalProps = [...props, prop];

          const holder = finalProps.reduce(
            (previous, current) => `${previous}[${current}]`,
          );
          const query = `${holder}=${el}`;

          queries.push(query);
        }
      }
      return queries.join('&');
    };

    return transform(object);
  }

  private getLinks(route: string, queryObject: any, lastPage: number) {
    const links = {};

    const { APP_PROTOCOL, APP_DOMAIN, APP_PORT, APP_INDEX_ROUTE } = process.env;
    const INDEX_ROUTE = APP_INDEX_ROUTE ? `/${APP_INDEX_ROUTE}` : '';
    const APP_URL = `${APP_PROTOCOL}://${APP_DOMAIN}:${APP_PORT}${INDEX_ROUTE}${route}`;

    links['self'] = `${APP_URL}?${this.objectToQueryString(queryObject)}`;

    if (queryObject.page?.number) {
      const number = Number(queryObject.page.number);

      links['first'] = `${APP_URL}?${this.objectToQueryString({
        ...queryObject,
        page: { ...queryObject.page, number: 1 },
      })}`;

      if (number > 1)
        links['previous'] = `${APP_URL}?${this.objectToQueryString({
          ...queryObject,
          page: { ...queryObject.page, number: number - 1 },
        })}`;

      if (number < lastPage)
        links['next'] = `${APP_URL}?${this.objectToQueryString({
          ...queryObject,
          page: { ...queryObject.page, number: number + 1 },
        })}`;

      links['last'] = `${APP_URL}?${this.objectToQueryString({
        ...queryObject,
        page: { ...queryObject.page, number: lastPage },
      })}`;
    }

    return links;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response: JsonApi) => {
        if (!response) return;

        const { meta, queryObject, data, listData, showLinks } = response;

        const request = context.switchToHttp().getRequest();
        const [route] = request.url.split('?');

        return {
          meta,
          links: showLinks
            ? this.getLinks(route, queryObject, meta.totalPages)
            : undefined,
          data: listData
            ? listData.map(data => this.transformData(data))
            : this.transformData(data),
        };
      }),
    );
  }
}
