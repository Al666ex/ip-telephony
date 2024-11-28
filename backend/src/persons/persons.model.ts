import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Phone } from "src/phones/phones.model";
import { PersonPhones } from "./person-phone.model";
import { ApiProperty } from "@nestjs/swagger";

interface PersonCreationAttrs {
    last_name: string;
    first_name: string;
    patronymic : string;
}

@Table({ tableName: 'persons' })
export class Person extends Model<Person, PersonCreationAttrs> {
    @ApiProperty({example : '1', description : 'Unique identifier'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example : 'Djokovic', description :'last name'})
    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;

    @ApiProperty({example : 'Novak', description : 'first name'})
    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @ApiProperty({example : 'Срджан', description : 'patronymic'})
    @Column({type : DataType.STRING, allowNull : true})
    patronymic : string;

    // @ApiProperty({
    //     type: () => Phone,
    //     isArray: true,
    //     description: 'List of associated phone numbers'
    // })
    @BelongsToMany(() => Phone, () => PersonPhones)
    phones : Phone[];

    // @HasMany(() => Phone)
    // phones : Phone[]
}