import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('corriendo en ', app.get('port'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
