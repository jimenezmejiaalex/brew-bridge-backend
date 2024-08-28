import {Step, StepModel} from "@/types";

export class StepService {
    private stepModel: StepModel;

    constructor(stepModel: StepModel) {
        this.stepModel = stepModel;
    }

    // Validate if the associated recipe exists
    private async validateStepExists(id: number) {
        const recipeExists = await this.stepModel.findUnique({
            where: { id: id }
        });

        if (!recipeExists) {
            throw new Error(`Step with id ${id} does not exist`);
        }
    }

    // Create a new Step
    async createStep(data: Step): Promise<Step> {
        await this.validateStepExists(data.recipeId);

        return this.stepModel.create({
            data,
            include: {
                recipe: true,
            },
        });
    }

    async createMultipleStep(data: Step[]): Promise<Step[]> {
        const result = await this.stepModel.createManyAndReturn({
            data,
            include: {
                recipe: true,
            },
        });

        return result;
    }

    // Get a Step by ID
    async getStepById(id: number): Promise<Step | null> {
        return this.stepModel.findUnique({
            where: { id },
            include: {
                recipe: true,
            },
        });
    }

    // Update a Step by ID
    async updateStep(id: number, data: Step): Promise<Step> {
        const stepExists = await this.stepModel.findUnique({
            where: { id },
        });
        if (!stepExists) {
            throw new Error(`Step with id ${id} does not exist`);
        }

        if (data.recipeId) {
            await this.validateStepExists(data.recipeId as number);
        }

        return this.stepModel.update({
            where: { id },
            data,
            include: {
                recipe: true,
            },
        });
    }

    // Delete a Step by ID
    async deleteStep(id: number): Promise<Step> {
        const stepExists = await this.stepModel.findUnique({
            where: { id },
        });
        if (!stepExists) {
            throw new Error(`Step with id ${id} does not exist`);
        }

        return this.stepModel.delete({
            where: { id },
            include: {
                recipe: true,
            },
        });
    }

    // List all Steps
    async listSteps(): Promise<Step[]> {
        return this.stepModel.findMany({
            include: {
                recipe: true,
            },
        });
    }
}
