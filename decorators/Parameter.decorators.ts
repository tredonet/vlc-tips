type Parameter = 'query' | 'params' | 'body' | 'request' | 'response';

export const PARAMETER_TOKEN = Symbol('Parameters');
export interface MetaParameter {
  index: number;
  location: Parameter;
  name?: string;
}

function decorate(location: Parameter, name?: string) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const params: Array<MetaParameter> = Reflect.getMetadata(PARAMETER_TOKEN, target.constructor, propertyKey) ?? [];
    params.push({ index: parameterIndex, location, name });
    Reflect.defineMetadata(PARAMETER_TOKEN, params, target.constructor, propertyKey);
  };
}

export function Query(): ParameterDecorator;
export function Query(name?: string): ParameterDecorator {
  return decorate('query', name);
}

export function Param(name: string): ParameterDecorator {
  return decorate('params', name);
}

/** Returns the request body. */
export function Body(): ParameterDecorator {
  return decorate('body');
}


/** Returns the `req` object. */
export function Request(): ParameterDecorator {
  return decorate('request');
}


/** Returns the `res` object. */
export function Response(): ParameterDecorator {
  return decorate('response');
}
