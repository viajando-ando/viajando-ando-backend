import { Router, Request, Response } from 'express';
import Controller from './index';
import networkResponse from '../../../network/dataResponse';
import multer from 'multer';

// const uploaded = multer().single('file');

const DIR = './data/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = 'data.json';
    cb(null, fileName);
  },
});

const uploadFile = multer({
  storage: storage,
}).single('file');

class Network {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', this.get);
    this.router.post('/', this.upsert);
    // this.router.post('/upload', this.uploadFile.single('file'), this.upload);
    this.router.post('/upload', this.upload);
  }

  get(req: Request, res: Response) {
    Controller.list()
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

  upload(req: Request, res: Response) {
    uploadFile(req, res, (error: any) => {
      if (error instanceof multer.MulterError) {
        console.error(error);
        networkResponse.error(req, res);
      } else if (error) {
        console.error(error.message);
        networkResponse.error(req, res);
      }

      if (req.file.mimetype == 'application/json') {
        networkResponse.success(req, res, 'file uploaded', res.statusCode);
      } else {
        console.error('Only file type json');
        networkResponse.error(req, res, 'Only file type json');
      }
    });
  }
}

const network = new Network();
export default network.router;
