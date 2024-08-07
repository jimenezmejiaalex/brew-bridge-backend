import {prisma} from "@/config/Database";

export const userModel = prisma.user;
export const processingMethod = prisma.processingMethod;
export const profileModel = prisma.profile;
export const coffeeBeanModel = prisma.coffeeBean;
export const roasterModel = prisma.roaster;
export const coffeeProductModel = prisma.coffeeProduct;
export const brewMethodModel = prisma.brewMethod;
export const reviewModel = prisma.review;
export const recipeModel = prisma.recipe;
export const stepModel = prisma.step;
export const traceabilityModel = prisma.traceability;
export const roasterSpecialtyModel = prisma.specialty;