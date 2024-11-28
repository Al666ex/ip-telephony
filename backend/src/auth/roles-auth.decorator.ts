import {SetMetadata} from "@nestjs/common";
import { AllRoles } from "./role.enum";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: AllRoles[]) => SetMetadata(ROLES_KEY, roles);
//export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);