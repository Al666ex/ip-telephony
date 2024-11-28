import { ApiProperty } from "@nestjs/swagger";
export class AddRoleDto{
    @ApiProperty({example : 'VIEW', description : 'role value'})
    readonly value : string;
    @ApiProperty({example : 23, description : 'USER unique identifier'})
    readonly userId : number;
}