import {CoffeeService} from "@/services/CoffeeService";
import {
    coffeeBeanModel,
    coffeeProductModel,
    coffeeRegionModel,
    farmModel,
    processingMethodModel,
    roasterModel,
    roasterSpecialtyModel,
    brewMethodModel,
    reviewModel,
    stepModel,
    recipeModel,
    stepTypeModel
} from "@/models";
import {RoasterService} from "@/services/RoasterService";
import {ReviewService} from "@/services/ReviewService";
import {StepService} from "@/services/StepService";
import {RecipeService} from "@/services/RecipeService";

export const roasterService = new RoasterService(roasterModel, roasterSpecialtyModel);
export const reviewService = new ReviewService(reviewModel);
export const stepService = new StepService(stepModel);
export const coffeeService = new CoffeeService(
    coffeeProductModel,
    processingMethodModel,
    farmModel,
    coffeeBeanModel,
    coffeeRegionModel,
    roasterService,
    brewMethodModel);
export const recipeService = new RecipeService(recipeModel, coffeeService, stepTypeModel);