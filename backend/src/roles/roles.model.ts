import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-role.model";

interface RoleCreationAttrs{
    email : string;
    password : string;
}

@Table({tableName : 'roles',createdAt : false, updatedAt : false})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example : '1', description : 'unique identifier'})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'VIEW', description : 'unique meaning of the role'})
    @Column({type : DataType.STRING, unique:true, allowNull : false})
    value : string;

    @ApiProperty({example : 'Только поиск', description :'description role'})
    @Column({type : DataType.STRING, allowNull : false})
    description : string;

    @BelongsToMany(() => User, () => UserRoles)
    users : User[]

}