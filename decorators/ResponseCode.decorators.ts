import "reflect-metadata";
export const HTTP_CODE_TOKEN = Symbol("ReponseCode");

export function ResponseCode(code: number): MethodDecorator {
  return function (target: object, propertyKey: string | symbol) {
    Reflect.defineMetadata(HTTP_CODE_TOKEN, code, target.constructor, propertyKey);
  };
}
