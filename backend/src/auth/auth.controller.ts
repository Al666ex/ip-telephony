import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags,ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

//import { CreateUserRoleDto } from '../users/dto/create-user.dto';
import { CreateUserRoleDto } from 'src/users/dto/create-user-role.dto';
import { User } from 'src/users/users.model';
import { ResetUserPassword } from 'src/users/dto/reset-user-password.dto';
import { Roles } from './roles-auth.decorator';
import { AllRoles } from './role.enum';
import { RolesGuard } from './roles.guard';
import { ChangeUserPasswordDto } from 'src/users/dto/changeUserPassword.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @ApiOperation({summary : 'Login user'})
    @Post('/login')
    login(@Body() dto : CreateUserDto){
        return this.authService.login(dto)
    }

    @ApiOperation({summary : 'Application user registration'})
    @ApiResponse({status : 200, type : User})
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/registration')
    registration(@Body() userRoleDto : CreateUserRoleDto){
        return this.authService.registration(userRoleDto)
    }

    @ApiOperation({summary : 'Reset user password'})
    @ApiResponse({status : 200})    
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Put('/resetpsw')
    resetPassword(@Body() dto : ResetUserPassword){
        return this.authService.resetPassword(dto)
    }

    @ApiOperation({summary : 'Change user password'})
    @ApiResponse({status : 200})    
    @Roles(AllRoles.ADMIN,AllRoles.CHANGE,AllRoles.VIEW) 
    @UseGuards(RolesGuard)
    @Put('/changepsw')
    changePassword(@Body() dto : ChangeUserPasswordDto){
        return this.authService.changeUserPassword(dto)
    }
}
