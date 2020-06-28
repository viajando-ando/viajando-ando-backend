import { Request, Response } from 'express';

class DataResponse {
  success(
    req: Request,
    res: Response,
    message: string = '',
    status: number = 200,
  ) {
    res.status(status).send({
      error: false,
      status,
      data: message,
    });
  }

  error(
    req: Request,
    res: Response,
    message: string = 'Internal server error',
    status = 500,
  ) {
    res.status(status).send({
      error: true,
      status,
      data: message,
    });
  }
}

const dataResponse = new DataResponse();

export default dataResponse;
