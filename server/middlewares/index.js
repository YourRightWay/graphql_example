const { PassThrough } = require('stream');

export function errorHandler(err, req, res, next) {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).send({ message });
}

export function graphqlMiddlewareWrapper(graphqlMiddleware) {
  return (req, res, next) => {
    const resProxy = new PassThrough();
    resProxy.headers = new Map();
    resProxy.statusCode = 200;
    resProxy.setHeader = (name, value) => {
      resProxy.headers.set(name, value);
    };
    res.graphqlResponse = (cb) => {
      res.statusCode = resProxy.statusCode;
      resProxy.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });
      resProxy.pipe(res).on('finish', cb);
    };
    graphqlMiddleware(req, resProxy).then(() => next(), next);
  };
}
