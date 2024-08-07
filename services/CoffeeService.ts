import {CoffeeProcessingMethod, CoffeeProductModel, ProcessingMethodModel} from "@/types";
import {NotFoundError} from "@/errors/NotFoundError";
import {ErrorCode} from "@/enums/ErrorCode";


export class CoffeeService {
    private coffeeModel: CoffeeProductModel;
    private coffeeProcessingMethodModel: ProcessingMethodModel;
    constructor(coffeeModel: CoffeeProductModel, coffeeProcessingMethodModel: ProcessingMethodModel) {
        this.coffeeModel = coffeeModel;
        this.coffeeProcessingMethodModel = coffeeProcessingMethodModel;
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

    private async validateProcessingMethodExists(id: number): Promise<CoffeeProcessingMethod> {
        const result = await this.coffeeProcessingMethodModel.findUnique({where: {id: id}});

        if (result == null) {
            throw new NotFoundError("Coffee processing not found", ErrorCode.NOT_FOUND);
        }
        return result;
    }
}