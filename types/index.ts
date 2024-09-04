import {
  Prisma,
  Step as StepPrisma,
  Farm as FarmPrisma,
  Review as ReviewPrisma,
  Roaster as RoasterPrisma,
  Specialty as SpecialtyPrisma,
  BrewMethod as BrewMethodPrisma,
  CoffeeBean as CoffeeBeanPrisma,
  CoffeeRegion as CoffeeRegionPrisma,
  CoffeeProduct as CoffeeProductPrisma,
  ProcessingMethod as ProcessingMethodPrisma,
  Recipe as RecipePrisma,
  StepType as StepTypePrisma,
} from ".prisma/client";

export type stepType = StepTypePrisma;
export type Farm = FarmPrisma;
export type Review = ReviewPrisma;
export type Roaster = RoasterPrisma;
export type CoffeeBean = CoffeeBeanPrisma;
export type BrewMethod = BrewMethodPrisma;
export type CoffeeRegion = CoffeeRegionPrisma;
export type RoasterSpecialty = SpecialtyPrisma;
export type CoffeeProduct = CoffeeProductPrisma;
export type CoffeeProcessingMethod = ProcessingMethodPrisma;
export type StepType = StepTypePrisma;

export type StepModel = Prisma.StepDelegate;
export type FarmModel = Prisma.FarmDelegate;
export type ReviewModel = Prisma.ReviewDelegate;
export type RecipeModel = Prisma.RecipeDelegate;
export type RoasterModel = Prisma.RoasterDelegate;
export type SpecialtyModel = Prisma.SpecialtyDelegate;
export type CoffeeBeanModel = Prisma.CoffeeBeanDelegate;
export type BrewMethodModel = Prisma.BrewMethodDelegate;
export type CoffeeRegionModel = Prisma.CoffeeRegionDelegate;
export type CoffeeProductModel = Prisma.CoffeeProductDelegate;
export type ProcessingMethodModel = Prisma.ProcessingMethodDelegate;
export type StepTypeModel = Prisma.StepTypeDelegate;

export interface Recipe extends RecipePrisma {
  steps?: Step[];
  coffeeProduct?: CoffeeProduct | null;
}

export type RecipeIdAndName = Pick<Recipe, "id" | "name"> & {
  brewMethod: Pick<BrewMethod, "methodImage">;
};
export type BrewMethodIdAndName = Pick<
  BrewMethod,
  "id" | "name" | "methodImage"
>;
export type CoffeeProductIdAndNAme = Pick<CoffeeProduct, "id" | "name">;

export interface Step extends StepPrisma {
  stepTypeName?: string;
}
