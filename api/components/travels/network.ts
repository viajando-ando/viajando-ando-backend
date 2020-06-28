import { Router, Request, Response } from 'express';
import Controller from './index';

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
        res.json(travel);
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  }

  upsert(req: Request, res: Response) {
    Controller.upsert()
      .then((travel) => {
        res.json(travel);
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  }
}

const network = new Network();
export default network.router;
