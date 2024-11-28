import { Module, Global } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LoggerService } from './logger.service';
import * as path from 'path';
import * as fs from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'winston',
      useFactory: () => {
        const logDir = path.join(process.cwd(), 'src', 'logs');
        
        // Создание директории для логов, если она не существует
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }

        // Конфигурация winston логгера
        return winston.createLogger({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })
          ),
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf(({ level, message, timestamp }) => {
                  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
              ),
            }),
            new winston.transports.DailyRotateFile({
              filename: path.join(logDir, '%DATE%.log'),
              datePattern: 'YYYY.MM.DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '14d',
            }),
          ],
        });
      },
    },
    LoggerService,
  ],
  exports: ['winston', LoggerService],
})
export class LoggerModule {}

/*
import { Module, Global } from '@nestjs/common';
import * as winston from 'winston';

@Global()
@Module({
  providers: [
    {
      provide: 'winston',
      useFactory: () => {
        return winston.createLogger({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })
          ),
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
              ),
            }),
            new winston.transports.File({
              filename: 'application.log',
              dirname: 'src/logs',
            }),
          ],
        });
      },
    },
  ],
  exports: ['winston'], // Экспортируем, чтобы использовать в других модулях
})
export class LoggerModule {}
*/