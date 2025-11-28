import { Deporte } from "./deporte";

export interface Solicitud {
    _id?: string,
    email: string,
    name: string,
    role: string,
    code?: number,
    sport?: Deporte,
}
