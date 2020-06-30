import { Router, Request, Response } from 'express';
import Controller from './index';
import networkResponse from '../../../network/dataResponse';
import multer from 'multer';
import fs from 'fs';
import TravelInterface from './travelInterface';

const DIR = __dirname + '/data/';

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
    this.router.get('/count', this.countTravels);
    this.router.get('/count-cities', this.countCities);
    this.router.post('/', this.upsert);
    this.router.patch('/', this.upsert);
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

  countTravels(req: Request, res: Response) {
    Controller.count()
      .then((travel) => {
        networkResponse.success(req, res, travel, res.statusCode);
      })
      .catch((error) => {
        console.error(error.message);
        networkResponse.error(req, res);
      });
  }

  countCities(req: Request, res: Response) {
    Controller.countCities()
      .then((travel) => {
        networkResponse.success(req, res, travel, res.statusCode);
      })
      .catch((error) => {
        console.error(error.message);
        networkResponse.error(req, res);
      });
  }

  upsert(req: Request, res: Response) {
    let message = '';

    if (req.body._id) {
      message = 'Update successfully';
    } else {
      message = 'Successful registration';
    }

    Controller.upsert(req.body, false)
      .then((info) => {
        return networkResponse.success(req, res, message, 201);
      })
      .catch((info) => {
        console.error(info.message);
        return networkResponse.error(req, res);
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
        fs.readFile(__dirname + '/data/data.json', (err, data) => {
          if (err) {
            console.error(err);
          }
          let stringData = data.toString();
          stringData = stringData.replace(/\$date|type/gi, (element) => {
            if (element === 'type') {
              return 'tr_type';
            }
            return 'date';
          });
          const jsonData = JSON.parse(stringData);
          jsonData.trips.map((travel: any) => {
            req.body = travel;
            Controller.upsert(req.body, true).catch((info) => {
              console.error(info.message);
              return networkResponse.error(req, res);
            });
          });
        });

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
