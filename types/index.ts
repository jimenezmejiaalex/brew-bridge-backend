import {
    CoffeeBean as CoffeeBeanPrisma,
    CoffeeProduct,
    CoffeeType as CoffeeTypePrisma,
    Farm as FarmPrisma,
    Prisma,
    ProcessingMethod as ProcessingMethodPrisma,
    Roaster as RoasterPrisma,
    Specialty as SpecialtyPrisma
} from ".prisma/client";

export type Coffee = CoffeeProduct;
export type CoffeeBean = CoffeeBeanPrisma;
export type CoffeeType = CoffeeTypePrisma;
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
export type CoffeeTypeModel = Prisma.CoffeeTypeDelegate;
