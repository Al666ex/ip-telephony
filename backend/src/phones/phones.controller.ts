import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { ChangePhoneDto } from './dto/change-phone.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Phone } from './phones.model';
import { PersonPhones } from 'src/persons/person-phone.model';

// @ApiTags('Телефоны. Добавление, изменение, поиск.')
@Controller('phones')
export class PhonesController {
    constructor(private phoneService : PhonesService){}

    // @ApiOperation({summary : 'Создание телефона (добавление телефона в БД) '})
    // @ApiResponse({status : 200, type : Phone})
    // @Post()
    // async createPhone(@Body() dto: CreatePhoneDto) {
    //     return this.phoneService.createPhoneNumbers(dto);
    // }

    // @ApiOperation({summary : 'заменить старый номер телефона на новый номер телефона '})
    // @ApiResponse({status : 200})
    // @Post('change_phone')
    // async changePhoneNumber(@Body() dto:ChangePhoneDto){
    //     return this.phoneService.changePhoneNumber(dto)
    // }

    /*
    @ApiOperation({summary : 'Поиск по номеру телефона'})
    @ApiResponse({status : 200})
    @Get()
    async getByPhone(@Query('phone_number') phone_number : string){
        return this.phoneService.getByPhone(phone_number)
    }
        */

    
}
