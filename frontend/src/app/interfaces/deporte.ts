import { User } from "./user";

export interface Deporte {
    _id: string,
    name: string,
    description: string,
    entrenadores?: Array<User>
}
