import express from 'express';
import travels from './components/travels/network';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const swaggerDoc = require('./swagger.json');
app.use('/api/travels', travels);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.info('Server running ', app.get('port'));
});
