import {CoffeeProduct, Prisma, ProcessingMethod} from ".prisma/client";

export type CoffeeProcessingMethod = {
    id?: number
    name: string
    description: string
};

export type RoasterSpecialty = {
    id?: number
    name: string
    description: string
}

export type Farm = {
    id?: number
    name: string
    description: string
}

export type Coffee = CoffeeProduct;
export type CoffeeProductModel = Prisma.CoffeeProductDelegate;
export type ProcessingMethodModel = Prisma.ProcessingMethodDelegate;
export type RoasterModel = Prisma.RoasterDelegate;
export type SpecialtyModel = Prisma.SpecialtyDelegate;
export type FarmModel = Prisma.FarmDelegate;
