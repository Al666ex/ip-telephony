import { Module } from '@nestjs/common';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Phone } from './phones.model';
import { Person } from 'src/persons/persons.model';
import { PersonPhones } from 'src/persons/person-phone.model';

@Module({
  controllers: [PhonesController],
  providers: [PhonesService],
  imports : [
    SequelizeModule.forFeature([Phone,Person,PersonPhones])
  ],
  exports : [
    PhonesService
  ]
})
export class PhonesModule {}
