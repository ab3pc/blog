import { HttpCode } from 'common/enums/enums';

const DEFAULT_MESSAGE = 'Network Error';

const ExceptionName = {
    HTTP_ERROR: 'HttpError'
  };

class HttpError extends Error {
  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE
  } = {}) {
    super(message);
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HttpError };