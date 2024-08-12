import {CoffeeService} from "@/services/CoffeeService";
import {
    coffeeBeanModel,
    coffeeProductModel,
    coffeeRegionModel,
    farmModel,
    processingMethodModel,
    roasterModel,
    roasterSpecialtyModel
} from "@/models";
import {RoasterService} from "@/services/RoasterService";

export const roasterService = new RoasterService(roasterModel, roasterSpecialtyModel);

export const coffeeService = new CoffeeService(
    coffeeProductModel,
    processingMethodModel,
    farmModel,
    coffeeBeanModel,
    coffeeRegionModel,
    roasterService);