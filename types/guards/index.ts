import {RoasterSpecialty} from "@/types";

export function isRoasterSpecialty(obj: any): obj is RoasterSpecialty {
    return obj && typeof obj === 'object' &&
        typeof obj.name === 'string' &&
        typeof obj.description === 'string';
}

export function isArrayOfRoasterSpecialty(obj: any): obj is RoasterSpecialty[] {
    return Array.isArray(obj) && obj.every(isRoasterSpecialty);
}