import { Module, forwardRef } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './persons.model';
import { Phone } from 'src/phones/phones.model';
import { PersonPhones } from './person-phone.model';
import { PhonesModule } from 'src/phones/phones.module';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, RolesGuard],
  imports: [
    SequelizeModule.forFeature([Person, Phone, PersonPhones]),
    PhonesModule,
    LoggerModule,
    forwardRef(() => AuthModule), // Import AuthModule
  ],
  exports: [PersonsService], // Optionally export PersonsService if needed
})
export class PersonsModule {}

/*
import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './persons.model';
import { Phone } from 'src/phones/phones.model';
import { PersonPhones } from './person-phone.model';
import { PhonesModule } from 'src/phones/phones.module';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports : [
    SequelizeModule.forFeature([Person,Phone,PersonPhones]),
    PhonesModule,
    LoggerModule,
    // AuthModule    
  ]
})
export class PersonsModule {}
*/