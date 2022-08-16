import { NextApiRequest, NextApiResponse } from 'next';
import { MetaParameter, PARAMETER_TOKEN , HTTP_CODE_TOKEN } from 'decorators';
import errorHandler from 'middlewares/errorHandler';

export enum HttpVerb {
    GET = 'GET',
    POST = 'POST'
}

export interface HandlerMethod {
    verb: HttpVerb;
    propertyKey: string | symbol;
}

export const HTTP_METHOD_TOKEN = Symbol('HTTPMethod');

export function Get(): MethodDecorator {
    return decorate(HttpVerb.GET);
}

export function Post(): MethodDecorator {
    return decorate(HttpVerb.POST);
}


function decorate(verb: HttpVerb) {
    return function (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const methods: Array<HandlerMethod> = Reflect.getMetadata(HTTP_METHOD_TOKEN, target.constructor) ?? [];
        methods.push({ verb, propertyKey });
        Reflect.defineMetadata(HTTP_METHOD_TOKEN, methods, target.constructor);
        const parameterDecorators: MetaParameter[] = Reflect.getMetadata(PARAMETER_TOKEN, target.constructor, propertyKey) ?? [];
        const originalHandler = descriptor.value;
        descriptor.value = async function (req: NextApiRequest, res: NextApiResponse) {
            try {
                const parameters = parameterDecorators.map(({ location, name, index }) => getParameterValue(req, res, {
                    location,
                    name,
                    index
                }));
                const returnValue = await originalHandler.call(this, ...parameters);
                const responseCode: number = Reflect.getMetadata(HTTP_CODE_TOKEN, target.constructor, propertyKey)
                    ?? (returnValue ? 200 : 204)
                res.status(responseCode).send(returnValue);
            } catch (err) {
                await errorHandler(res, err);
            }
        };

        return descriptor;
    };
}

function getParameterValue(
    req: NextApiRequest,
    res: NextApiResponse,
    { location, name }: MetaParameter
): string | object | undefined {
    switch (location) {
        case 'query':
            return name ? req.query[name] : req.query;
        case 'body':
            return req.body;
        case 'request':
            return req;
        case 'response':
            return res;
    }
}
