import {
    CoffeeBean as CoffeeBeanPrisma,
    CoffeeProduct as CoffeeProductPrisma,
    Farm as FarmPrisma,
    Prisma,
    ProcessingMethod as ProcessingMethodPrisma,
    Roaster as RoasterPrisma,
    Specialty as SpecialtyPrisma,
    CoffeeRegion as CoffeeRegionPrisma,
} from ".prisma/client";

export type CoffeeProduct = CoffeeProductPrisma;
export type CoffeeBean = CoffeeBeanPrisma;
export type CoffeeRegion = CoffeeRegionPrisma;
export type CoffeeProcessingMethod = ProcessingMethodPrisma;
export type Roaster = RoasterPrisma;
export type RoasterSpecialty = SpecialtyPrisma;
export type Farm = FarmPrisma;

export type CoffeeProductModel = Prisma.CoffeeProductDelegate;
export type CoffeeBeanModel = Prisma.CoffeeBeanDelegate;
export type ProcessingMethodModel = Prisma.ProcessingMethodDelegate;
export type RoasterModel = Prisma.RoasterDelegate;
export type SpecialtyModel = Prisma.SpecialtyDelegate;
export type FarmModel = Prisma.FarmDelegate;
export type CoffeeRegionModel = Prisma.CoffeeRegionDelegate;
