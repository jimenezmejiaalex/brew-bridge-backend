import {CoffeeService} from "@/services/CoffeeService";
import {coffeeProductModel, processingMethodModel, roasterModel, roasterSpecialtyModel, farmModel} from "@/models";
import {RoasterService} from "@/services/RoasterService";

export const coffeeService = new CoffeeService(coffeeProductModel, processingMethodModel, farmModel);
export const roasterService = new RoasterService(roasterModel, roasterSpecialtyModel);