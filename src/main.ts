
import { initializeApp } from "firebase/app";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cors = require('cors');

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1fiDz-YWN_8C9e4Dpx2IGuTJYc1zmUvk",
  authDomain: "projetmobile-api.firebaseapp.com",
  projectId: "projetmobile-api",
  storageBucket: "projetmobile-api.appspot.com",
  messagingSenderId: "1050906974500",
  appId: "1:1050906974500:web:6f5c32089fdd0d5605bbb1"
};

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  // app.use(cors({
  //   origin: '*',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  // })); 
  // await app.listen(3000);
  const app = initializeApp(firebaseConfig);
}
bootstrap();