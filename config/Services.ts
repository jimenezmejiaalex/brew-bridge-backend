import {CoffeeService} from "@/services/CoffeeService";
import {coffeeProductModel, processingMethod, roasterModel, roasterSpecialtyModel} from "@/models";
import {RoasterService} from "@/services/RoasterService";

export const coffeeService = new CoffeeService(coffeeProductModel, processingMethod);
export const roasterService = new RoasterService(roasterModel, roasterSpecialtyModel);