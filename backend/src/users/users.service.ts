import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from 'src/roles/roles.model';
import { ResetUserPassword } from './dto/reset-user-password.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository : typeof User,
    private roleService : RolesService){}
    
    async createUser(dto : CreateUserRoleDto){        
        const {login, password, roleValue} = dto
        const user = await this.userRepository.create({login, password});
        const role = await this.roleService.getRoleByValue(roleValue);
        await user.$set('roles',[role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers(){
        //const users = await this.userRepository.findAll({include : {all : true}});
        const users = await this.userRepository.findAll({
            attributes : ['id','login','banned'],
            include : {
            // all : true,
            model : Role,
            attributes : ['value','description'],     
            through : {
                attributes : []
            },
            order: [
                ['login', 'ASC'], // Сортировка по полю login в алфавитном порядке              
            ],        
        }});
        return users;
    }

    async getUserByPrimaryKey(dto : ResetUserPassword){
        return await this.userRepository.findByPk(dto.userId);
    }

    async getOnlyUserData(login : string){
        const user =  await this.userRepository.findOne({where : {login}})        
        return user;
    }

    async getUserByLogin(login : string){        
        //const user = await this.userRepository.findOne({where : {login}, include : {all : true}})        
        const user = await this.userRepository.findOne({
            where : {login}, 
            include : {
                model : Role,
                attributes : ['value','description']
            }
        })        
        return user;
    }

    async addRole(dto : AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value)
        if(user && role){
            user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
