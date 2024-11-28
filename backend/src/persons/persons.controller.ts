import { Body, Controller, Get, Post, Query,Put, UseGuards,Req } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreatePersonPhoneDto } from './dto/create-person-phone.dto';
import { RemovePersonDto } from './dto/remove-person.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Person } from './persons.model';
import { PersonPhones } from './person-phone.model';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AllRoles } from 'src/auth/role.enum';
import * as xml2js from 'xml2js';

@ApiTags('Person / CRUD')
@Controller('persons')
export class PersonsController {
    constructor(private personService : PersonsService){}

    @ApiOperation({summary : 'Add person and phones'})
    @ApiResponse({status : 200, type : CreatePersonDto})
    // @Roles(AllRoles.ADMIN,AllRoles.CHANGE)    
    @Roles(AllRoles.ADMIN,AllRoles.CHANGE)    
    @UseGuards(RolesGuard)
    @Post()
    creare(@Body() personDto : CreatePersonDto){
        return this.personService.createPerson(personDto)
    }

    @ApiOperation({summary : 'Update data person'})
    @ApiResponse({status : 200, type : Person})
    @Roles(AllRoles.ADMIN,AllRoles.CHANGE)    
    @UseGuards(RolesGuard)
    @Put('update')
    update(@Body() personDto : UpdatePersonDto){
        return this.personService.updatePerson(personDto);
    }

    // @Post('personphone')
    // createLinkPersonPhone(@Body() person_phone_dto : CreatePersonPhoneDto){
    //     return this.personService.createLinkPersonPhone(person_phone_dto)
    // }

    /*
    @ApiOperation({summary : 'Создание связки персона/телефон'})
    @ApiResponse({status : 200, type : PersonPhones})
    @Post('person_phone')
    addPhonesToPerson(@Body() person_phone_dto : CreatePersonPhoneDto){
        return this.personService.addPhonesToPerson(person_phone_dto);
    }
    */

    @ApiOperation({summary : 'Delete data person'})
    @ApiResponse({status : 200})
    @Roles(AllRoles.ADMIN,AllRoles.CHANGE)    
    @UseGuards(RolesGuard)
    @Post('person_remove')
    removePerson(@Body() dto : RemovePersonDto){
        return this.personService.removePerson(dto);
    }

    @ApiOperation({summary : 'Delete phone from person'})
    @ApiResponse({status : 200})
    @Roles(AllRoles.ADMIN,AllRoles.CHANGE)    
    @UseGuards(RolesGuard)
    @Post('person_phone_remove')
    removePhonesToPerson(@Body() person_phone_dto : CreatePersonPhoneDto){
        return this.personService.removePhonesToPerson(person_phone_dto);
    }

    //addPhonesToPerson

    /*
    @ApiOperation({summary : 'Список всех персон'})
    @ApiResponse({status : 200, type : [Person]})
    @Get()
    getAllPersons(){
        return this.personService.getAllPersons()
    }
    */

    @ApiOperation({summary : 'find person by Pk'})
    @ApiResponse({status : 200})
    @Get('person_id')
    findPersonByPk(@Query('personId') personId: number){        
        return this.personService.findPersonByPk({personId});
    }

    @ApiOperation({summary : 'Search for a person by last name and first name OR by phone number'})
    @ApiResponse({status : 200, type : [Person]})
    @Get('search')
    searchPersons(@Query('last_name') lastName: string, @Query('first_name') firstName: string) {
        console.log(`last_name = ${lastName}`)
        return this.personService.searchPersons({ last_name: lastName, first_name: firstName });
    }

    @Get('searchip')
    searchPersonsParseXML(@Req() req){
        return this.personService.searchPersonsParseXML(req.body)
    }
}
