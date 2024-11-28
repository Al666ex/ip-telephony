import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AllRoles } from 'src/auth/role.enum';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from 'src/roles/roles.model';

@ApiTags('Application users')
@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    
    // @ApiOperation({summary : 'Create user'})
    // @ApiResponse({status : 200, type : User})
    // @Roles(AllRoles.ADMIN)
    // @UseGuards(RolesGuard)
    // @Post()
    // create(@Body() userRoleDto : CreateUserRoleDto ){   
    //     return this.userService.createUser(userRoleDto)
    // }
    

    
    @ApiOperation({summary : 'Get all application users'})
    @ApiResponse({status : 200, type : [User]})
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getUsers(){
        return this.userService.getAllUsers();
    }
    

    @ApiOperation({summary : 'Add Role'})
    @ApiResponse({status : 200})
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto : AddRoleDto){
        return this.userService.addRole(dto);
    }
}
