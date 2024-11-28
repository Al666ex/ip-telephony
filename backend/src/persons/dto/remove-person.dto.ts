import { ApiProperty } from "@nestjs/swagger";

export class RemovePersonDto{  
    @ApiProperty({example : 3, description : 'ID персоны'})  
    readonly personId : number;
}