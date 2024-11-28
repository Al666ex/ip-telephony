import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PersonPhones } from "src/persons/person-phone.model";
import { Person } from "src/persons/persons.model";

interface PhoneCreationAttrs{
    phone_number : string;
}

@Table({tableName : 'phones'})
export class Phone extends Model<Phone, PhoneCreationAttrs>{
    @ApiProperty({example : '1', description : 'Unique identifier'})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id:number;

    @ApiProperty({example : '022-22-6556', description : 'номер телефона'})    
    @Column({type : DataType.STRING, allowNull : false})
    phone_number:string;

    // @ForeignKey(() => Person)
    // @Column({type : DataType.INTEGER})
    // personId:number;

    // @ApiProperty({
    //     type: () => Person,
    //     isArray: true,
    //     description: 'List of associated phone numbers'
    // })
    @BelongsToMany(() => Person, () => PersonPhones)
    persons : Person[];
    // @BelongsTo(() => Person)
    // person : Person
}