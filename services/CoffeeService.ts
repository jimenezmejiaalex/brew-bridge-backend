import {CoffeeProcessingMethod, CoffeeProductModel, Farm, FarmModel, ProcessingMethodModel} from "@/types";
import {NotFoundError} from "@/errors/NotFoundError";
import {ErrorCode} from "@/enums/ErrorCode";


export class CoffeeService {
    private coffeeModel: CoffeeProductModel;
    private coffeeProcessingMethodModel: ProcessingMethodModel;
    private farmModel: FarmModel;
    constructor(coffeeModel: CoffeeProductModel, coffeeProcessingMethodModel: ProcessingMethodModel, farmModel: FarmModel) {
        this.coffeeModel = coffeeModel;
        this.coffeeProcessingMethodModel = coffeeProcessingMethodModel;
        this.farmModel = farmModel;
    }

    async createCoffeeProcessingMethod(processingMethod: CoffeeProcessingMethod): Promise<CoffeeProcessingMethod> {
        const result = await this.coffeeProcessingMethodModel.create({
            data: {
                name: processingMethod.name,
                description: processingMethod.description
            }
        });
        return result;
    }

    async getAllCoffeeProcessingMethod(): Promise<Array<CoffeeProcessingMethod>> {
        const result = await this.coffeeProcessingMethodModel.findMany();

        return result;
    }

    async getCoffeeProcessingMethod(id: number): Promise<CoffeeProcessingMethod> {
        const result = await this.validateProcessingMethodExists(id);

        const coffeeProcessingMethod :CoffeeProcessingMethod = {
            id: result.id,
            name: result.name,
            description: result.description
        };

        return coffeeProcessingMethod;
    }

    async updateCoffeeProcessingMethod(id: number, body: CoffeeProcessingMethod): Promise<CoffeeProcessingMethod> {
        await this.validateProcessingMethodExists(id);

        const updateResult = await this.coffeeProcessingMethodModel.update({
            where: {id: id},
            data: {
                name: body.name,
                description: body.description
            }
        });

        return updateResult;
    }

    async deleteCoffeeProcessingMethod(id: number): Promise<void> {
        await this.validateProcessingMethodExists(id);
        const result = await this.coffeeProcessingMethodModel.delete({where: {id: id}});
        return;
    }

    async createFarm(farm: Farm): Promise<Farm> {
        const result = await this.farmModel.create({
            data : {
                name: farm.name,
                description: farm.description
            }
        });

        return result;
    }

    async getAllFarm(): Promise<Array<Farm>> {
        const result = await this.farmModel.findMany();
        return result;
    }

    async getFarmById(id: number): Promise<Farm> {
        const result = await this.validateFarmExists(id);
        const farm: Farm = {
            id: result.id,
            name: result.name,
            description: result.description
        };
        return farm;
    }

    async updateFarm(id: number, body: Farm): Promise<Farm> {
        const result = await this.validateFarmExists(id);
        const farmUpdated = await this.farmModel.update({
            where: {id: id},
            data: {
                name: body.name,
                description: body.description
            }
        });
        return result;
    }

    async deleteFarm(id: number): Promise<void> {
        const result = await this.validateFarmExists(id);
        const deletedItem = await this.farmModel.delete({where: {id: id}});
        return ;
    }

    private async validateFarmExists(id: number): Promise<Farm> {
        const result = await this.farmModel.findUnique({where: {id: id}});
        if (result == null) {
            throw new NotFoundError("Farm not found", ErrorCode.NOT_FOUND);
        }
        return result;
    }

    private async validateProcessingMethodExists(id: number): Promise<CoffeeProcessingMethod> {
        const result = await this.coffeeProcessingMethodModel.findUnique({where: {id: id}});
        if (result == null) {
            throw new NotFoundError("Coffee processing not found", ErrorCode.NOT_FOUND);
        }
        return result;
    }
}