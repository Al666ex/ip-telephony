import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor (@InjectModel(Role) private roleRepository : typeof Role){}

    async createRole(dto : CreateRoleDto){
        const role = this.roleRepository.create(dto);
        return role;
    }

    async getAllRoles(){
        const roles = await this.roleRepository.findAll({
            attributes : ['id','value']
        })
        return roles;
    }

    async getRoleByValue(value :string){
        const role = this.roleRepository.findOne({where : {value}});
        return role;
    }
}
