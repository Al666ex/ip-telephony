import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './persons.model';
import { CreatePersonDto } from './dto/create-person.dto';
import { Phone } from 'src/phones/phones.model';
import { Op } from 'sequelize';
import {replaceStr} from '../utils/replaceStr'
import {sortPersons} from '../utils/sortPersons'
import { outputData } from 'src/utils/outputData';
import { CreatePersonPhoneDto } from './dto/create-person-phone.dto';
import { SearchPersonDto } from './dto/search-person.dto';
import { hasNumber } from 'src/utils/hasNumber';
import { CreatePhoneDto } from 'src/phones/dto/create-phone.dto';
import { PhonesService } from 'src/phones/phones.service';
import { RemovePersonDto } from './dto/remove-person.dto';
import { PersonPhones } from './person-phone.model';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Logger } from 'winston';
import { LoggerService } from 'src/logger/logger.service';
import * as xml2js from 'xml2js';
import { outputDataForXML } from 'src/utils/outputDataForXML';

const matchDataSearch = (str) => {
    return {
        [Op.or]: [
            { [Op.regexp]: str },      // Совпадение по регулярному выражению
            { [Op.like]: `%${str}%` }  // Частичное совпадение
        ]
    };    
}

@Injectable()
export class PersonsService {
    constructor(@InjectModel(Person) private personRepository : typeof Person,
                @InjectModel(Phone) private phoneRepository: typeof Phone,
                @InjectModel(PersonPhones) private personPhonesRepository : typeof PersonPhones,
                //@Inject('winston') private readonly logger: Logger, // Inject the winston logger
                private readonly logger: LoggerService,
                private phoneService : PhonesService
    ){}

    async createPerson(dto: CreatePersonDto) {
        this.logger.log('Creating a new person');        
        try {
            console.log('-----DTO-----',dto)
            let { last_name, first_name, patronymic, phones } = dto;

            last_name = last_name.toUpperCase();
            first_name = first_name.toUpperCase();
            patronymic = patronymic.toUpperCase();

            const existingPerson = await this.personRepository.findOne({
                where: { last_name, first_name, patronymic }
            });

            if (existingPerson) {
                throw new HttpException('Персона уже существует', HttpStatus.BAD_REQUEST);
            }

            let newPerson = await this.personRepository.create({
                last_name,
                first_name,
                patronymic
            });

            // Создание телефонов и привязка к персоне
            //await this.phoneService.createPhoneNumbers({ phones, personId: newPerson.id });
            const addedPhones =  await this.phoneService.createPhoneNumbers({ phones, personId: newPerson.id });

            this.logger.log(`Person created with ID: ${newPerson.id}`);
            console.log('-------addedPhones-------',addedPhones)
            newPerson.setDataValue('phones', addedPhones);
            return newPerson;
        } catch (error) {
            this.logger.error(`Error creating person: ${error.message}`);
            throw error;
        }
    }

    // Функция для обновления данных персоны
    async updatePerson(dto: UpdatePersonDto) {
        const { id, last_name, first_name, patronymic,phones } = dto;

        // Поиск персоны по id
        const person = await this.personRepository.findByPk(id);

        if (!person) {
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND);
        }

        // const existingPerson = await this.personRepository.findOne({
        //     where: {
        //         last_name,
        //         first_name,
        //         patronymic
        //     }
        // })

        // if(existingPerson){
        //     throw new HttpException('Персона уже существует', HttpStatus.BAD_REQUEST)
        // }

        // Обновление данных персоны
        person.last_name = last_name ? last_name.toUpperCase() : person.last_name;
        person.first_name = first_name ? first_name.toUpperCase() : person.first_name;
        // person.patronymic = patronymic ? patronymic.toUpperCase() : person.patronymic;
        person.patronymic = patronymic;
        

        // Сохранение обновленных данных
        await person.save();

                    // Создание телефонов и привязка к персоне
            //await this.phoneService.createPhoneNumbers({ phones, personId: newPerson.id });
            const addedPhones =  await this.phoneService.createPhoneNumbers({ phones, personId: person.id });

            this.logger.log(`Person created with ID: ${person.id}`);
            console.log('-------addedPhones-------',addedPhones)
            person.setDataValue('phones', addedPhones);
            return person;

        return person;
        
    }


    async addPhonesToPerson(person_phone_dto: CreatePersonPhoneDto) {
        const { personId, phoneId } = person_phone_dto;    
        // Найти персону по personId
        const person = await this.personRepository.findByPk(personId);
        if (!person) {
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND);
        }
    
        // Найти телефон по phoneId
        const phone = await this.phoneRepository.findByPk(phoneId);
        if (!phone) {
            throw new HttpException('Телефон не найден', HttpStatus.NOT_FOUND);
        }
    
        // Проверка существования связки в person_phones
        const existingLink = await this.personPhonesRepository.findOne({
            where: { personId, phoneId },
        });
    
        if (existingLink) {
            return { status : false, message: 'Связь уже существует' };
        }
    
        // Добавление новой записи в person_phones
        await person.$add('phones', phone.id);
    
        return { status : true, message: 'Телефон успешно добавлен к персоне' };
    }

    async findPersonByPk(dto: RemovePersonDto) {
        const { personId } = dto;

        console.log('++++++++++++++personId+++++++++++++',personId)
    
        const person = await this.personRepository.findByPk(personId, {
        attributes : ['id','last_name','first_name','patronymic'],
            include: {
                model: Phone,
                attributes: ['id', 'phone_number'],  // Включаем телефоны с нужными атрибутами
            },
        });
    
        if (!person) {
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND);
        }
        let result = outputData([person]);
    
        return result[0];  // Возвращаем персону с телефонами
    }
    async removePerson(dto: RemovePersonDto) {
        const { personId } = dto;
    
        // Находим персону по переданному ID
        const person = await this.personRepository.findByPk(personId);
        if (!person) {
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND);
        }
    
        // Получаем все телефоны, связанные с данной персоной
        const phones = await this.phoneRepository.findAll({
            include: {
                model: Person,
                attributes: ['id'],
                where: { id: personId },
            },
        });
    
        // Удаляем все связи с телефонами в таблице 'person_phones'
        await this.personPhonesRepository.destroy({
            where: { personId },
        });
    
        // Удаляем саму персону
        await person.destroy();
    
        // Проверяем каждый телефон и удаляем, если у него больше нет связей с персонами
        for (const phone of phones) {
            await this.phoneService.removePhoneWithoutPersonByPhoneID(phone.id);
        }
    
        return { message: 'Персона и все ее связи успешно удалены' };
    }

    /*
    async removePerson(dto : RemovePersonDto){
        const {personId} = dto;

        // Найти персону по id
        const person = this.personRepository.findByPk(personId)
        if(!person){
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND)
        }

        // Удалить все связи с телефонами в таблице 'person_phones'
        await this.personPhonesRepository.destroy({
            where : {personId}
        })

        // Удалить саму персону
        await (await person).destroy();

        return { message: 'Персона и все ее связи успешно удалены' };
    }    
    */

    // Функция для удаления телефона у персоны
    async removePhonesToPerson(person_phone_dto: CreatePersonPhoneDto) {
        const { personId, phoneId } = person_phone_dto;
        console.log(`personId = ${personId} phoneId = ${phoneId}`)

        const person = await this.personRepository.findByPk(personId);

        if (person) {
            const phone = await this.phoneRepository.findByPk(phoneId);

            if (phone) {
                // Удаляем связь между персоной и телефоном
                await person.$remove('phones', phone.id);

                //removePhoneWithoutPersonByPhoneID
                await this.phoneService.removePhoneWithoutPersonByPhoneID(phone.id);

                return { message: 'Телефон успешно удален у персоны' };
            } else {
                throw new HttpException('Телефон не найден', HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException('Персона не найдена', HttpStatus.NOT_FOUND);
        }
    }

    async getAllPersons(){
        let persons = await this.personRepository.findAll({
            attributes : ['last_name','first_name'],
            include : {
                model : Phone,
                attributes : ['phone_number']
            },
            order: [
                ['last_name', 'ASC'], // Сортировка по полю last_name в алфавитном порядке
                ['first_name', 'ASC'] // Сортировка по полю first_name в алфавитном порядке
            ]
        });

        let result = outputData(persons);
        // result = sortPersons(result);
        return result;
    }

    async searchPersons(dto : SearchPersonDto) {        
        let {last_name, first_name} = dto
        last_name = last_name.toUpperCase();
        last_name = replaceStr(last_name);

        const numberPhone = hasNumber(last_name);
        console.log('persons.service.ts---',numberPhone)
        if(numberPhone){ 
            const phone_number = last_name
            const phones = this.phoneService.getByPhone(phone_number)
            return phones;
        }


        if(first_name){
            first_name = first_name.toUpperCase();
            first_name = replaceStr(first_name);
            var firstNameCondition = matchDataSearch(first_name);
        }
        const lastNameCondition = matchDataSearch(last_name);

        let persons = []

        if(!first_name){
            persons = await this.personRepository.findAll({
                attributes: ['id','last_name', 'first_name','patronymic'],
                where: {
                    last_name: lastNameCondition
                },
                include: {
                    model: Phone,
                    attributes: ['id','phone_number']
                },
                order: [
                    ['last_name', 'ASC'], // Сортировка по полю last_name в алфавитном порядке
                    ['first_name', 'ASC'] // Сортировка по полю first_name в алфавитном порядке
                ],
                limit: 15 // Ограничение результата 10 записями
            });
        }else{
            persons = await this.personRepository.findAll({
                attributes: ['id','last_name', 'first_name','patronymic'],
                where: {
                    last_name: lastNameCondition,
                    first_name :firstNameCondition
                    // first_name: {
                    //     [Op.like]: `%${first_name.toUpperCase()}%`
                    // }
                },
                include: {
                    model: Phone,
                    attributes: ['id','phone_number']
                },                
                order: [
                    ['last_name', 'ASC'], // Сортировка по полю last_name в алфавитном порядке
                    ['first_name', 'ASC'] // Сортировка по полю first_name в алфавитном порядке
                ],                
                limit: 15                                  
            });
        }

        let result = outputData(persons);
        // result = sortPersons(result);
        return result;
    }

    ///searcj person parse
    async searchPersonsParseXML(xml) {    
            // Парсинг XML в JSON
            const parser = new xml2js.Parser({ explicitArray: false });
            let resultJson;
        
            try {
              resultJson = await parser.parseStringPromise(xml);
              console.log(`Parsed JSON:`, resultJson);
            } catch (error) {
              console.error('Error parsing XML:', error);
              return { error: 'Invalid XML format' };
            }

            let last_name = resultJson.root.person.last_name
            let first_name = resultJson.root.person.first_name
    //    return {last_name,first_name}    
        
        //return resultJson;
     
       
        // let {last_name, first_name} = dto
        last_name = last_name.toUpperCase();
        last_name = replaceStr(last_name);

        const numberPhone = hasNumber(last_name);
        console.log('persons.service.ts---',numberPhone)
        // if(numberPhone){ 
        //     const phone_number = last_name
        //     const phones = this.phoneService.getByPhone(phone_number)
        //     return phones;
        // }

        if(numberPhone){ 
            const phone_number = last_name
            let res2 = await this.phoneService.getByPhone(phone_number)
            console.log('res2---------------',res2)
            res2 = outputDataForXML(res2)
        // Конвертация результата в XML
            const builder = new xml2js.Builder({
                xmldec: { version: '1.0', encoding: 'UTF-8', standalone: true },
                renderOpts: { pretty: true },
                rootName: 'persons'
            });
            const xmlResult = builder.buildObject({ person: res2 });
            return xmlResult;
            
            return res2;
        }


        if(first_name){
            first_name = first_name.toUpperCase();
            first_name = replaceStr(first_name);
            var firstNameCondition = matchDataSearch(first_name);
        }
        const lastNameCondition = matchDataSearch(last_name);

        let persons = []

        if(!first_name){
            persons = await this.personRepository.findAll({
                attributes: ['id','last_name', 'first_name','patronymic'],
                where: {
                    last_name: lastNameCondition
                },
                include: {
                    model: Phone,
                    attributes: ['id','phone_number']
                },
                order: [
                    ['last_name', 'ASC'], // Сортировка по полю last_name в алфавитном порядке
                    ['first_name', 'ASC'] // Сортировка по полю first_name в алфавитном порядке
                ],
                limit: 15 // Ограничение результата 10 записями
            });
        }else{
            persons = await this.personRepository.findAll({
                attributes: ['id','last_name', 'first_name','patronymic'],
                where: {
                    last_name: lastNameCondition,
                    first_name :firstNameCondition
                    // first_name: {
                    //     [Op.like]: `%${first_name.toUpperCase()}%`
                    // }
                },
                include: {
                    model: Phone,
                    attributes: ['id','phone_number']
                },                
                order: [
                    ['last_name', 'ASC'], // Сортировка по полю last_name в алфавитном порядке
                    ['first_name', 'ASC'] // Сортировка по полю first_name в алфавитном порядке
                ],                
                limit: 15                                  
            });
        }

        // Форматирование данных для XML
        let result = outputDataForXML(persons);

        // Конвертация результата в XML
        const builder = new xml2js.Builder({
            xmldec: { version: '1.0', encoding: 'UTF-8', standalone: true },
            renderOpts: { pretty: true },
            rootName: 'persons'
        });
        const xmlResult = builder.buildObject({ person: result });

        return xmlResult;
        //return result;
    } 
}
