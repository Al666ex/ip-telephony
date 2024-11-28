import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Person } from "./persons.model";
import { Phone } from "src/phones/phones.model";

@Table({tableName : 'person_phones', createdAt : false, updatedAt : false})
export class PersonPhones extends Model<PersonPhones>{
    @ApiProperty({ example: 1, description: 'Unique identifier of the person-phone association' })
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id:number;

    @ApiProperty({ example: 3, description: 'Identifier of the associated person' })
    @ForeignKey(() => Person)
    @Column({type : DataType.INTEGER})
    personId:number;

    @ApiProperty({ example: 23, description: 'Identifier of the associated phone' })
    @ForeignKey(() => Phone)
    @Column({type :DataType.INTEGER})
    phoneId:number;
}