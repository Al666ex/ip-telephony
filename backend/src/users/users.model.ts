import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-role.model";

interface UserCreationAttrs{
    login : string;
    password : string;
}

@Table({tableName : 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example : '1', description : 'Unique identifier'})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'user', description : 'unique user'})
    @Column({type : DataType.STRING, unique:true, allowNull : false})
    login : string;

    @ApiProperty({example : '12345', description :'user password'})
    @Column({type : DataType.STRING, allowNull : false})
    password : string;

    @ApiProperty({example : 'false', description :'is the user banned or not'})
    @Column({type : DataType.BOOLEAN, defaultValue : false})
    banned : false;

    @ApiProperty({example : 'on leave', description :'reason banned'})
    @Column({type :DataType.STRING, allowNull : true})
    banReason : string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles : Role[]
}