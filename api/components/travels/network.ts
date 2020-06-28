import { Router, Request, Response, response } from 'express';
import Controller from './index';
import networkResponse from '../../../network/dataResponse';

class Network {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', this.get);
    this.router.post('/', this.upsert);
  }

  get(req: Request, res: Response) {
    Controller.upsert()
      .then((travel) => {
        networkResponse.success(req, res, travel, res.statusCode);
      })
      .catch((error) => {
        console.error(error.message);
        networkResponse.error(req, res);
      });
  }

  upsert(req: Request, res: Response) {
    Controller.upsert()
      .then((travel) => {
        networkResponse.success(req, res, travel, res.statusCode);
      })
      .catch((error) => {
        console.error(error.message);
        networkResponse.error(req, res);
      });
  }
}

const network = new Network();
export default network.router;
