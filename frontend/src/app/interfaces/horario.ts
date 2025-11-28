import { Deporte } from "./deporte";
import { User } from "./user";

export interface Horario {
    _id?: string
    time : string,
    spots: number,
    days : number[],
    trainer?: User,
    sport?: Deporte,
    enrolled?: Array<User>
}
