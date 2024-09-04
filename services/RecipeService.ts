import { Recipe, RecipeIdAndName, RecipeModel, StepTypeModel } from "@/types";
import { CoffeeService } from "@/services/CoffeeService";
import { CustomError } from "@/errors/CustomError";
import { ErrorCode } from "@/enums/ErrorCode";

export class RecipeService {
  private recipeModel: RecipeModel;
  private stepTypeModel: StepTypeModel;
  private coffeeService: CoffeeService;

  constructor(
    recipeModel: RecipeModel,
    coffeeService: CoffeeService,
    stepTypeModel: StepTypeModel
  ) {
    this.recipeModel = recipeModel;
    this.coffeeService = coffeeService;
    this.stepTypeModel = stepTypeModel;
  }

  // Helper method to validate existence of related entities
  private async validateRelatedEntities(
    brewMethodId: number | null,
    coffeeProductId: number | null
  ) {
    if (brewMethodId) {
      const brewMethodExists = await this.coffeeService.getBrewMethodById(
        brewMethodId
      );
      if (!brewMethodExists) {
        throw new CustomError(
          `BrewMethod with id ${brewMethodId} does not exist`,
          ErrorCode.BAD_REQUEST
        );
      }
    }

    if (coffeeProductId) {
      const coffeeProductExists = await this.coffeeService.getCoffeeProductById(
        coffeeProductId
      );
      if (!coffeeProductExists) {
        throw new CustomError(
          `CoffeeProduct with id ${coffeeProductId} does not exist`,
          ErrorCode.BAD_REQUEST
        );
      }
    }
  }

  // Create a new Recipe
  async createRecipe(data: Recipe): Promise<Recipe> {
    if (!data.brewMethodId) {
      throw new CustomError(
        "BrewMethodId must be present",
        ErrorCode.BAD_REQUEST
      );
    }

    // If coffeeProductId is not present, but a CoffeeProduct object is provided, create a new CoffeeProduct
    if (!data.coffeeProductId && data.coffeeProduct) {
      const newCoffeeProduct = await this.coffeeService.createCoffeeProduct(
        data.coffeeProduct
      );
      data.coffeeProductId = newCoffeeProduct.id; // Assign the new CoffeeProduct ID to coffeeProductId
    } else if (!data.coffeeProductId) {
      throw new CustomError(
        "CoffeeProductId or CoffeeProduct must be present",
        ErrorCode.BAD_REQUEST
      );
    }

    // Validate existence of related entities
    await this.validateRelatedEntities(data.brewMethodId, data.coffeeProductId);

    // Ensure steps data is defined and correctly structured
    const stepsData =
      data.steps?.map(async (step) => {
        // Find or create the StepType based on the stepType name
        const stepType = await this.stepTypeModel.upsert({
          where: { name: step.stepTypeName },
          update: {},
          create: { name: step.stepTypeName || "" },
        });

        return {
          stepTypeId: stepType.id,
          amount: step.amount,
          duration: step.duration,
          notes: step.notes || null,
        };
      }) || [];

    return this.recipeModel.create({
      data: {
        shareWithCommunity: data.shareWithCommunity,
        name: data.name,
        notes: data.notes,
        brewMethodId: data.brewMethodId,
        hasFilter: data.hasFilter,
        filterType: data.filterType,
        cupsCount: data.cupsCount,
        coffeeProductId: data.coffeeProductId,
        roastLevel: data.roastLevel,
        coffeeSize: data.coffeeSize,
        waterSize: data.waterSize,
        ratio: data.ratio,
        temperature: data.temperature,
        temperatureUnit: data.temperatureUnit,
        grindSize: data.grindSize,
        steps: {
          createMany: {
            data: await Promise.all(stepsData), // Resolve all async operations
          },
        },
      },
      include: {
        steps: {
          include: {
            stepType: true,
          },
        },
      },
    });
  }

  // Get a Recipe by ID
  async getRecipeById(id: number): Promise<Recipe | null> {
    return this.recipeModel.findUnique({
      where: { id },
      include: {
        steps: true,
        coffeeProduct: true,
        brewMethod: true,
      },
    });
  }

  // Update a Recipe by ID
  // async updateRecipe(id: number, data: Recipe): Promise<Recipe> {
  //     const recipeExists = await this.recipeModel.findUnique({ where: { id } });

  //     if (!recipeExists) {
  //         throw new Error(`Recipe with id ${id} does not exist`);
  //     }

  //     if (data.brewMethodId || data.coffeeProductId) {
  //         await this.validateRelatedEntities(
  //             data.brewMethodId || recipeExists.brewMethodId,
  //             data.coffeeProductId || recipeExists.coffeeProductId
  //         );
  //     }

  //     // Handle updated steps
  //     const stepsUpdatedData = await Promise.all(
  //         data.steps?.filter(step => step.id)
  //             .map(async step => {
  //                 const stepType = await this.stepTypeModel.upsert({
  //                     where: { id: step.stepTypeId },
  //                     update: {},
  //                     create: { name: step.stepTypeName || "" },
  //                 });

  //                 return {
  //                     where: { id: step.id },
  //                     data: {
  //                         stepTypeId: stepType.id,
  //                         amount: step.amount,
  //                         duration: step.duration,
  //                         notes: step.notes || null,
  //                     },
  //                 };
  //             }) || []
  //     );

  //     // Handle new steps
  //     const newSteps = await Promise.all(
  //         data.steps?.filter(step => !step.id)
  //             .map(async step => {
  //                 const stepType = await this.stepTypeModel.upsert({
  //                     where: { name: step.stepTypeName },
  //                     update: {},
  //                     create: { name: step.stepTypeName || "" },
  //                 });

  //                 return {
  //                     stepTypeId: stepType.id,
  //                     amount: step.amount,
  //                     duration: step.duration,
  //                     notes: step.notes || null,
  //                 };
  //             }) || []
  //     );

  //     return this.recipeModel.update({
  //         where: { id },
  //         data: {
  //             shareWithCommunity: data.shareWithCommunity,
  //             name: data.name,
  //             notes: data.notes,
  //             brewMethodId: data.brewMethodId,
  //             hasFilter: data.hasFilter,
  //             filterType: data.filterType,
  //             cupsCount: data.cupsCount,
  //             coffeeProductId: data.coffeeProductId,
  //             roastLevel: data.roastLevel,
  //             coffeeSize: data.coffeeSize,
  //             waterSize: data.waterSize,
  //             ratio: data.ratio,
  //             temperature: data.temperature,
  //             temperatureUnit: data.temperatureUnit,
  //             grindSize: data.grindSize,
  //             steps: {
  //                 updateMany: stepsUpdatedData,
  //                 createMany: { data: newSteps },
  //             },
  //         },
  //         include: {
  //             steps: true,
  //         },
  //     });
  // }

  // Delete a Recipe by ID
  async deleteRecipe(id: number): Promise<Recipe> {
    const recipeExists = await this.recipeModel.findUnique({ where: { id } });

    if (!recipeExists) {
      throw new Error(`Recipe with id ${id} does not exist`);
    }

    return this.recipeModel.delete({
      where: { id },
      include: {
        steps: true,
        coffeeProduct: true,
        brewMethod: true,
      },
    });
  }

  // List all Recipes
  async listRecipes(): Promise<Recipe[]> {
    return this.recipeModel.findMany({
      include: {
        steps: true,
        coffeeProduct: true,
        brewMethod: true,
      },
    });
  }

  // List all Recipes
  async listRecipeNames(): Promise<RecipeIdAndName[]> {
    return this.recipeModel.findMany({
      take: 15,
      select: {
        id: true,
        name: true,
        brewMethod: {
          select: {
            methodImage: true,
          },
        },
      },
    });
  }
}
