import {prisma} from "@/config/Database";

export const userModel = prisma.user;
export const processingMethodModel = prisma.processingMethod;
export const profileModel = prisma.profile;
export const coffeeBeanModel = prisma.coffeeBean;
export const coffeeRegionModel = prisma.coffeeRegion;
export const roasterModel = prisma.roaster;
export const coffeeProductModel = prisma.coffeeProduct;
export const brewMethodModel = prisma.brewMethod;
export const reviewModel = prisma.review;
export const recipeModel = prisma.recipe;
export const stepModel = prisma.step;
export const roasterSpecialtyModel = prisma.specialty;
export const farmModel = prisma.farm;