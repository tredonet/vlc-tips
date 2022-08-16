
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { HTTP_METHOD_TOKEN, HandlerMethod } from '../decorators';
import connectDB from '../middlewares/db';

export function apiHandler(cls: new () => any): NextApiHandler {
  const instance = new cls();

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.url || !req.method) {
      return notFound(req, res);
    }

    const methods: Array<HandlerMethod> = Reflect.getMetadata(HTTP_METHOD_TOKEN, cls);
    const method = methods.find(f => f.verb === req.method);
    if (!method) {
      return notFound(req, res);
    }

    const methodFn = instance[method.propertyKey];
    if (!methodFn) {
      return notFound(req, res);
    }
    await connectDB();
    return methodFn.call(instance, req, res);
  };
}

function notFound(req: NextApiRequest, res: NextApiResponse): void {
  return res.status(404).json({
    statusCode: 404,
    message: `Cannot ${req.method} ${req.url?.split('?')?.[0]}`,
    error: 'Not Found'
  });
}
