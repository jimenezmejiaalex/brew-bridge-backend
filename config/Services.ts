import {CoffeeService} from "@/services/CoffeeService";
import {
    coffeeBeanModel,
    coffeeProductModel,
    coffeeTypeModel,
    farmModel,
    processingMethodModel,
    roasterModel,
    roasterSpecialtyModel
} from "@/models";
import {RoasterService} from "@/services/RoasterService";

export const coffeeService = new CoffeeService(coffeeProductModel, processingMethodModel, farmModel, coffeeBeanModel, coffeeTypeModel);
export const roasterService = new RoasterService(roasterModel, roasterSpecialtyModel);