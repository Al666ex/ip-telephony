import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Phone } from './phones.model';
import { Op, Sequelize } from 'sequelize';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Person } from 'src/persons/persons.model';
import { ChangePhoneDto } from './dto/change-phone.dto';
import {outputDataSearchByPhone} from '../utils/outputDataSearchByPhone'
import { PersonPhones } from 'src/persons/person-phone.model';

// const matchDataSearch = (str) => {
//     return {
//         [Op.or]: [            
//             { [Op.like]: `%${str}%` }  // Частичное совпадение
//         ]
//     };    
// }


const matchDataSearch = (str: string) => {
    const cleanedStr = str.replace(/\D/g, ''); // Очищаем строку поиска от всех нецифровых символов (оставляем только цифры)
    return {
        [Op.or]: [
            // Используем функцию Sequelize для частичного совпадения только по цифровой части номера
            Sequelize.where(
                Sequelize.fn('regexp_replace', Sequelize.col('phone_number'), '\\D', '', 'g'), // Очищаем телефонный номер в базе от всех нецифровых символов
                { [Op.like]: `%${cleanedStr}%` } // Выполняем частичное совпадение по очищенному номеру
            )
        ]
    };
};

@Injectable()
export class PhonesService {
    constructor(
        @InjectModel(Phone) private phoneRepository : typeof Phone,
        @InjectModel(PersonPhones) private personPhonesRepository : typeof PersonPhones
    ){}

    async createPhoneNumbers(dto: CreatePhoneDto) {
        const { phones, personId } = dto;
		let result = []

        try {
            for (const phone of phones) {
                const cleanedPhoneNumber = phone.replace(/\D/g, '');
    
                const existingPhone = await this.phoneRepository.findOne({
                    where: {
                        [Op.and]: [
                            Sequelize.where(
                                // Sequelize.fn('regexp_replace', Sequelize.col('phone_number'), '\\D', '', 'g'),
                                this.phoneRepository.sequelize.fn('regexp_replace', this.phoneRepository.sequelize.col('phone_number'), '\\D', '', 'g'),
                                cleanedPhoneNumber
                            )
                        ]
                    }
                });
    
                const newPhone = existingPhone || await this.phoneRepository.create({ phone_number: phone });
    
                // Создаем связь телефона с персоной
                await this.personPhonesRepository.create({
                    personId,
                    phoneId: newPhone.id
                });
                
                /*
                let personsList = null
                if(existingPhone){
                    personsList = await this.getByPhone((newPhone.phone_number))                
                    if(personsList){
                        personsList = personsList.map(({first_name,last_name}) => `${first_name} ${last_name},`)				
                    } else {
                        personsList = ""
                    }				
                }
                result.push({
                    phone_number : newPhone.phone_number,
                    info : personsList
                })	
                */
                result.push(newPhone.phone_number)					
                
            }
            // console.log('-----result---- ',result)
            return result;
            
        } catch (error) {
            throw new HttpException('Проблемы с сохранением телефонов', HttpStatus.BAD_REQUEST);
        }


        //console.log('----------------------result--------------------',result)
		//return result;
    }
    /*

    async createPhoneNumbers(dto: CreatePhoneDto) {
        const { phones, personId } = dto;

        for (const phone of phones) {
            const cleanedPhoneNumber = phone.replace(/\D/g, '');

            const existingPhone = await this.phoneRepository.findOne({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            // Sequelize.fn('regexp_replace', Sequelize.col('phone_number'), '\\D', '', 'g'),
                            this.phoneRepository.sequelize.fn('regexp_replace', this.phoneRepository.sequelize.col('phone_number'), '\\D', '', 'g'),
                            cleanedPhoneNumber
                        )
                    ]
                }
            });

            const newPhone = existingPhone || await this.phoneRepository.create({ phone_number: phone });

            // Создаем связь телефона с персоной
            await this.personPhonesRepository.create({
                personId,
                phoneId: newPhone.id
            });
        }
    }

    */

    // async createPhoneNumber(dto: CreatePhoneDto) {
    //     const { phone_number } = dto;
    
    //     // Очистка номера телефона - удаление всех нецифровых символов
    //     const cleanedPhoneNumber = phone_number.replace(/\D/g, '');
    
    //     // Поиск существующего номера телефона, который совпадает по цифрам
    //     const existingPhone = await this.phoneRepository.findOne({
    //         where: {
    //             // Используем Sequelize функцию для игнорирования всех нецифровых символов
    //             [Op.and]: [
    //                 // Получаем только цифровую часть номера в базе данных и сравниваем
    //                 this.phoneRepository.sequelize.where(
    //                     this.phoneRepository.sequelize.fn('regexp_replace', this.phoneRepository.sequelize.col('phone_number'), '\\D', '', 'g'),
    //                     cleanedPhoneNumber
    //                 ),
    //             ],
    //         },
    //     });
    
    //     // Если телефон существует, выбрасываем ошибку
    //     // if (existingPhone) {
    //     //     throw new HttpException(
    //     //         'Телефон уже существует в базе данных',
    //     //         HttpStatus.BAD_REQUEST,
    //     //     );
    //     // }

    //     if(existingPhone){return existingPhone;}
    
    //     // Если телефон не найден, создаем новый
    //     const newPhone = await this.phoneRepository.create({ phone_number });
    
    //     // Возвращаем созданный телефон       
    //     // await this.removePhoneWithoutPerson();
    //     return newPhone;
    // }

    /*
    async changePhoneNumber(dto: ChangePhoneDto) {
        const { old_phone_number, new_phone_number } = dto;

        // Поиск существующего телефона по старому номеру
        const existingPhone = await this.phoneRepository.findOne({
            where: { phone_number: old_phone_number },
        });

        if (!existingPhone) {
            throw new HttpException('Телефон в базе данных не найден', HttpStatus.NOT_FOUND);
        }

        // Проверка на существование нового номера в базе данных
        const phoneWithNewNumber = await this.phoneRepository.findOne({
            where: { phone_number: new_phone_number },
        });

        if (phoneWithNewNumber) {
            throw new HttpException('Новый телефонный номер уже существует в базе данных', HttpStatus.BAD_REQUEST);
        }

        // Обновляем старый номер на новый
        await this.phoneRepository.update(
            { phone_number: new_phone_number },
            { where: { phone_number: old_phone_number } }
        );

        return { message: 'Номер телефона успешно обновлен' };
    }    
    */
    
    async getByPhone(searchString: string) {
        const phones = await this.phoneRepository.findAll({
            attributes: ['id', 'phone_number'],
            where: { phone_number: matchDataSearch(searchString) },
            include: {
                model: Person,
                attributes: ['id', 'first_name', 'last_name'],
                required: false // Телефон может быть без привязки к персоне
            },
            limit: 10,
        });
    
        // Возвращаем данные через форматированную функцию
        return outputDataSearchByPhone(phones);
    }

    async removePhoneWithoutPersonByPhoneID(phoneId: number) {
        const phone = await this.phoneRepository.findOne({
            where: { id: phoneId },
            include: {
                model: Person,
                attributes: ['id'],
                required: false, // Телефон может не иметь связей с персонами
            },
        });
    
        // Удаляем телефон, если нет связанных персон
        if (phone && (!phone.persons || phone.persons.length === 0)) {
            await this.phoneRepository.destroy({ where: { id: phoneId } });
        }
    }

    async removePhoneWithoutPerson() {
        // Получаем все записи телефонов, включая связанные записи пользователей
        const phones = await this.phoneRepository.findAll({
            include: {
                model: Person,
                attributes: ['id', 'first_name', 'last_name'],
                required: false, // Связь с пользователем может отсутствовать
            },
        });
    
        // Отфильтровываем телефоны, у которых нет связанных пользователей
        const phonesToDelete = phones.filter(phone => 
            !phone.persons || 
            phone.persons.length === 0 || 
            phone.persons.some(person => !person.id && person.first_name.trim() === "" && person.last_name.trim() === "")
        );
    
        // Удаляем отфильтрованные записи из таблицы телефонов
        for (const phone of phonesToDelete) {
            await this.phoneRepository.destroy({ where: { id: phone.id } });
        }
    
        return { message: `${phonesToDelete.length} телефон(ов) удалено, так как они не связаны с пользователями.` };
    } 
}
