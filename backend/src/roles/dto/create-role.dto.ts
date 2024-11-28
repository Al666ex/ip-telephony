import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example : 'VIEW', description : 'название роли'})
    readonly value : string;
    @ApiProperty({example : 'Только поиск', description : 'описание роли'})
    readonly description : string;
}