import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserRoleDto } from 'src/users/dto/create-user-role.dto';
//import { User } from 'src/users/users.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
//import { CreateUserDto } from '../users/dto/create-user.dto';
import {CreateUserDto} from '../users/dto/create-user.dto'
import { ResetUserPassword } from 'src/users/dto/reset-user-password.dto';
import { ChangeUserPasswordDto } from 'src/users/dto/changeUserPassword.dto';

@Injectable()
export class AuthService {

    constructor(private userService : UsersService,
                private jetService : JwtService){}

    async login(dto : CreateUserDto){        
        const user = await this.validateUser(dto)
        return this.generateToken(user);
    }

    async registration(userRoleDto : CreateUserRoleDto){        
        const candidat = await this.userService.getUserByLogin(userRoleDto.login);        
        if(candidat){
            throw new HttpException('Пользователь с таким login уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userRoleDto.password,5)
        const user = await this.userService.createUser({...userRoleDto, password : hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user : User){
        const payload = {login : user.login, id : user.id, roles : user.roles}
        return {
            token : this.jetService.sign(payload)
        }
    }

    async resetPassword(dto : ResetUserPassword){        
        const user = await this.userService.getUserByPrimaryKey(dto);        
        if(!user){
            throw new HttpException('Пользователь не найден',HttpStatus.NOT_FOUND)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);        

        user.password = hashPassword;
        await user.save();
        return this.generateToken(user)
    }

    async changeUserPassword(dto: ChangeUserPasswordDto) {       
    
        const user = await this.userService.getOnlyUserData(dto.login);
    
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
    
        // Проверьте старый пароль
        const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.password); 
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Старый пароль неверен');
        }
    
        // Захешируйте новый пароль
        const hashedNewPassword = await bcrypt.hash(dto.newPassword, 5);
    
        // Обновите пароль пользователя и сохраните изменения
        user.password = hashedNewPassword;
        await user.save();
    
        return this.generateToken(user)
        //return { message: 'Пароль успешно изменен' };
    }

    private async validateUser(dto: CreateUserDto) {
        try {
            const user = await this.userService.getUserByLogin(dto.login);
            const passwordEquals = await bcrypt.compare(dto.password, user.password);
    
            if(user && passwordEquals){
                return user;
            }
            throw new UnauthorizedException({message : 'Некоректный login или password'});
            
        } catch (error) {
            throw new UnauthorizedException({message : 'Некоректный login или password'});
        }
    }
}
