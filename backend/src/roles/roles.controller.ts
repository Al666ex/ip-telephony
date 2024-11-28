import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse,  ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { AllRoles } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService : RolesService){}

    @ApiOperation({summary : 'Create role'})
    @ApiResponse({status : 200, type : Role})
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto : CreateRoleDto){
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary : 'Get all roles'})
    @ApiResponse({status : 200, type : Role})
    @Roles(AllRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getAllRoles(){
        return this.roleService.getAllRoles()
    }

    @ApiOperation({summary : 'Get role by value'})
    @ApiResponse({status : 200, type : Role})
    @Get('/:value')
    getByValue(@Param('value') value : string ){
        return this.roleService.getRoleByValue(value)
    }
    
}
