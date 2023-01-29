class HTTPError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export class BadRequestError extends HTTPError {
  constructor() {
    super(400, "Bad Request");
  }
}

export class AuthorizationError extends HTTPError {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class ForbiddenError extends HTTPError {
  constructor() {
    super(403, "Forbidden");
  }
}

export class NotFoundError extends HTTPError {
  constructor() {
    super(404, "Not Found");
  }
}

export class MethodNowAllowerError extends HTTPError {
  constructor() {
    super(405, "Method Not Allowed");
  }
}
