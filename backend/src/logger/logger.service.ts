import { Inject, Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('winston') private readonly logger: winston.Logger,
  ) {}

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}