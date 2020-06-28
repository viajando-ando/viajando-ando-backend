import express from 'express';
import travels from './components/travels/network';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/travels', travels);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('corriendo en ', app.get('port'));
});
