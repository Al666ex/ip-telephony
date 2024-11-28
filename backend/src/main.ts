
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service'; // Импортируем LoggerService

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  
  // Внедрение LoggerService
  const logger = app.get(LoggerService);

  app.enableCors({    
    origin: 'http://10.12.89.59'
  });

  app.use(bodyParser.json());

  const config = new DocumentBuilder()
    .setTitle('IP-TELEPHONY')
    .setDescription('Documentation REST API')
    .addTag('Developing DB IP-TELEPHONY')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // Логирование старта приложения
  logger.log(`Starting the application on port ${PORT}`);

  app.use((req, res, next) => {
    if(req.method !== "GET"){
    logger.log(`Received request: ${req.method} ${req.url}`);    
        res.on('finish', () => {      
        logger.log(`Response: ${res.statusCode} ${req.method} ${req.url}`);      
        });
    }
    next();
  });
  
//   app.use((req, res, next) => {
//     logger.log(`Received request: ${req.method} ${req.url}`);
//     res.on('finish', () => {
//       if(req.method !== "PUT"){
//         logger.log(`Response: ${res.statusCode} ${req.method} ${req.url}`);
//       }
//     });
//     next();
//   });

  await app.listen(PORT, () => {
    logger.log(`APP started at PORT = ${PORT}`);
  });
}


start();
///////////////////


/*

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
   
    app.enableCors({
        origin : 'http://10.11.89.43:5173'
    })

    app.use(bodyParser.json());

    const config = new DocumentBuilder()
        .setTitle('IP-TELEPHONY')
        .setDescription('Documentation REST API')
        .addTag('Developing DB IP-TELEPHONY')
        .setVersion('1.0.0')        
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs',app,document)

    await app.listen(PORT, () => console.log(`APP started at PORT = ${PORT} `));
    
}

start()
*/