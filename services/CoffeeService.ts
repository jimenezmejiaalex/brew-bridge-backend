import {
  BrewMethod,
  BrewMethodIdAndName,
  BrewMethodModel,
  CoffeeBean,
  CoffeeBeanModel,
  CoffeeProcessingMethod,
  CoffeeProduct,
  CoffeeProductIdAndNAme,
  CoffeeProductModel,
  CoffeeRegion,
  CoffeeRegionModel,
  Farm,
  FarmModel,
  ProcessingMethodModel,
} from "@/types";
import { NotFoundError } from "@/errors/NotFoundError";
import { ErrorCode } from "@/enums/ErrorCode";
import { RoasterService } from "@/services/RoasterService";

export class CoffeeService {
  private coffeeProductModel: CoffeeProductModel;
  private coffeeRegionModel: CoffeeRegionModel;
  private coffeeBeanModel: CoffeeBeanModel;
  private coffeeProcessingMethodModel: ProcessingMethodModel;
  private farmModel: FarmModel;
  private brewMethodModel: BrewMethodModel;

  private roasterService: RoasterService;

  constructor(
    coffeeProductModel: CoffeeProductModel,
    coffeeProcessingMethodModel: ProcessingMethodModel,
    farmModel: FarmModel,
    coffeeBeanModel: CoffeeBeanModel,
    coffeeRegionModel: CoffeeRegionModel,
    roasterService: RoasterService,
    brewMethodModel: BrewMethodModel
  ) {
    this.coffeeProductModel = coffeeProductModel;
    this.coffeeProcessingMethodModel = coffeeProcessingMethodModel;
    this.farmModel = farmModel;
    this.coffeeBeanModel = coffeeBeanModel;
    this.coffeeRegionModel = coffeeRegionModel;
    this.roasterService = roasterService;
    this.brewMethodModel = brewMethodModel;
  }

  async createCoffeeProcessingMethod(
    processingMethod: CoffeeProcessingMethod
  ): Promise<CoffeeProcessingMethod> {
    const result = await this.coffeeProcessingMethodModel.create({
      data: {
        name: processingMethod.name,
        description: processingMethod.description,
      },
    });
    return result;
  }

  async getAllCoffeeProcessingMethod(): Promise<Array<CoffeeProcessingMethod>> {
    const result = await this.coffeeProcessingMethodModel.findMany();

    return result;
  }

  async getCoffeeProcessingMethod(id: number): Promise<CoffeeProcessingMethod> {
    const result = await this.validateProcessingMethodExists(id);

    const coffeeProcessingMethod: CoffeeProcessingMethod = {
      id: result.id,
      name: result.name,
      description: result.description,
    };

    return coffeeProcessingMethod;
  }

  async updateCoffeeProcessingMethod(
    id: number,
    body: CoffeeProcessingMethod
  ): Promise<CoffeeProcessingMethod> {
    await this.validateProcessingMethodExists(id);

    const updateResult = await this.coffeeProcessingMethodModel.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
      },
    });

    return updateResult;
  }

  async deleteCoffeeProcessingMethod(id: number): Promise<void> {
    await this.validateProcessingMethodExists(id);
    const result = await this.coffeeProcessingMethodModel.delete({
      where: { id: id },
    });
    return;
  }

  async createFarm(farm: Farm): Promise<Farm> {
    const result = await this.farmModel.create({
      data: {
        name: farm.name,
        description: farm.description,
      },
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
      description: result.description,
    };
    return farm;
  }

  async updateFarm(id: number, body: Farm): Promise<Farm> {
    const result = await this.validateFarmExists(id);
    const farmUpdated = await this.farmModel.update({
      where: { id: id },
      data: {
        name: body.name,
        description: body.description,
      },
    });
    return result;
  }

  async deleteFarm(id: number): Promise<void> {
    const result = await this.validateFarmExists(id);
    const deletedItem = await this.farmModel.delete({ where: { id: id } });
    return;
  }

  // Create a new CoffeeBean
  async createCoffeeBean(coffeeBean: CoffeeBean): Promise<CoffeeBean> {
    const result = await this.coffeeBeanModel.create({
      data: {
        name: coffeeBean.name,
        processingMethodId: coffeeBean.processingMethodId,
        flavorNotes: coffeeBean.flavorNotes,
        roastLevel: coffeeBean.roastLevel,
        certification: coffeeBean.certification,
        harvestDate: coffeeBean.harvestDate,
        coffeeSpecies: coffeeBean.coffeeSpecies,
        coffeeRegionId: coffeeBean.coffeeRegionId,
      },
    });
    return result;
  }

  // Get all CoffeeBeans
  async getAllCoffeeBeans(): Promise<Array<CoffeeBean>> {
    const result = await this.coffeeBeanModel.findMany({
      include: { processingMethod: true, coffeeRegion: true, products: true },
    });
    return result;
  }

  // Get a CoffeeBean by ID
  async getCoffeeBeanById(id: number): Promise<CoffeeBean> {
    const result = await this.validateCoffeeBeanExists(id);
    return result;
  }

  // Update a CoffeeBean by ID
  async updateCoffeeBean(id: number, body: CoffeeBean): Promise<CoffeeBean> {
    await this.validateCoffeeBeanExists(id);
    const updatedCoffeeBean = await this.coffeeBeanModel.update({
      where: { id: id },
      data: {
        name: body.name,
        processingMethodId: body.processingMethodId,
        flavorNotes: body.flavorNotes,
        roastLevel: body.roastLevel,
        certification: body.certification,
        harvestDate: body.harvestDate,
        coffeeSpecies: body.coffeeSpecies,
      },
    });
    return updatedCoffeeBean;
  }

  // Delete a CoffeeBean by ID
  async deleteCoffeeBean(id: number): Promise<void> {
    await this.validateCoffeeBeanExists(id);
    await this.coffeeBeanModel.delete({ where: { id: id } });
    return;
  }

  // Create a new CoffeeRegion
  async createCoffeeRegion(data: CoffeeRegion): Promise<CoffeeRegion> {
    const newRegion = await this.coffeeRegionModel.create({
      data: {
        description: data.description,
        region: data.region,
        altitude: data.altitude,
      },
    });
    return newRegion;
  }

  // Get all CoffeeRegions
  async getAllCoffeeRegions(): Promise<CoffeeRegion[]> {
    const regions = await this.coffeeRegionModel.findMany();
    return regions;
  }

  // Get a CoffeeRegion by ID
  async getCoffeeRegionById(id: number): Promise<CoffeeRegion | null> {
    const region = await this.coffeeRegionModel.findUnique({
      where: { id },
    });
    return region;
  }

  // Update a CoffeeRegion by ID
  async updateCoffeeRegion(
    id: number,
    data: CoffeeRegion
  ): Promise<CoffeeRegion> {
    await this.validateCoffeeRegionExists(id);
    const updatedRegion = await this.coffeeRegionModel.update({
      where: { id },
      data: {
        description: data.description,
        region: data.region,
        altitude: data.altitude,
      },
    });
    return updatedRegion;
  }

  // Delete a CoffeeRegion by ID
  async deleteCoffeeRegion(id: number): Promise<void> {
    await this.validateCoffeeRegionExists(id);
    const result = await this.coffeeRegionModel.delete({
      where: { id },
    });
    return;
  }

  // Create a new CoffeeProduct
  async createCoffeeProduct(data: CoffeeProduct): Promise<CoffeeProduct> {
    await this.validateRelatedEntities(
      data.beanId,
      data.farmId,
      data.roasterId
    );

    return this.coffeeProductModel.create({
      data,
      include: {
        bean: true,
        farm: true,
        roaster: true,
        reviews: true,
        recipes: true,
      },
    });
  }

  // Get a CoffeeProduct by ID
  async getCoffeeProductById(id: number): Promise<CoffeeProduct | null> {
    return this.coffeeProductModel.findUnique({
      where: { id },
      include: {
        bean: true,
        farm: true,
        roaster: true,
        reviews: true,
        recipes: true,
      },
    });
  }

  // Update a CoffeeProduct by ID
  async updateCoffeeProduct(
    id: number,
    data: CoffeeProduct
  ): Promise<CoffeeProduct> {
    const productExists = await this.coffeeProductModel.findUnique({
      where: { id },
    });
    if (!productExists) {
      throw new Error(`CoffeeProduct with id ${id} does not exist`);
    }

    if (data.beanId || data.farmId || data.roasterId) {
      await this.validateRelatedEntities(
        (data.beanId as number) || productExists.beanId,
        (data.farmId as number) || productExists.farmId,
        (data.roasterId as number) || productExists.roasterId
      );
    }

    return this.coffeeProductModel.update({
      where: { id },
      data,
      include: {
        bean: true,
        farm: true,
        roaster: true,
        reviews: true,
        recipes: true,
      },
    });
  }

  // Delete a CoffeeProduct by ID
  async deleteCoffeeProduct(id: number): Promise<CoffeeProduct> {
    const productExists = await this.coffeeProductModel.findUnique({
      where: { id },
    });
    if (!productExists) {
      throw new Error(`CoffeeProduct with id ${id} does not exist`);
    }

    return this.coffeeProductModel.delete({
      where: { id },
      include: {
        bean: true,
        farm: true,
        roaster: true,
        reviews: true,
        recipes: true,
      },
    });
  }

  // List all CoffeeProducts
  async listCoffeeProducts(): Promise<CoffeeProduct[]> {
    return this.coffeeProductModel.findMany({
      include: {
        bean: {
          include: { processingMethod: true, coffeeRegion: true },
        },
        farm: true,
        roaster: true,
        reviews: true,
        recipes: true,
      },
    });
  }

  async listCoffeeProductNames(): Promise<CoffeeProductIdAndNAme[]> {
    return this.coffeeProductModel.findMany({
      select: {
        id: true,
        name: true,
      },
      take: 15,
    });
  }

  async createBrewMethod(data: BrewMethod): Promise<BrewMethod> {
    const result = await this.brewMethodModel.create({
      data,
    });
    return result;
  }

  async getAllBrewMethods(): Promise<BrewMethod[]> {
    const result = await this.brewMethodModel.findMany({
      include: {
        recepies: true,
      },
    });
    return result;
  }

  async getAllBrewMethodsNames(): Promise<BrewMethodIdAndName[]> {
    const result = await this.brewMethodModel.findMany({
      select: {
        id: true,
        name: true,
        methodImage: true,
      },
      take: 15,
    });
    return result;
  }

  async getBrewMethodById(id: number): Promise<BrewMethod | null> {
    const result = await this.brewMethodModel.findUnique({
      where: { id },
      include: {
        recepies: true,
      },
    });

    return result;
  }

  async updateBrewMethod(id: number, data: BrewMethod): Promise<BrewMethod> {
    const brewMethodExists = await this.brewMethodModel.findUnique({
      where: { id },
    });

    if (!brewMethodExists) {
      throw new Error("Brew method not found.");
    }

    return this.brewMethodModel.update({
      where: { id },
      data,
      include: {
        recepies: true,
      },
    });
  }

  async deleteBrewMethod(id: number): Promise<BrewMethod> {
    const brewMethodExists = await this.brewMethodModel.findUnique({
      where: { id },
    });

    if (!brewMethodExists) {
      throw new Error("Brew method not found.");
    }

    return this.brewMethodModel.delete({
      where: { id },
    });
  }

  private async validateRelatedEntities(
    beanId: number,
    farmId: number,
    roasterId: number
  ) {
    const [beanExists, farmExists, roasterExists] = await Promise.all([
      this.coffeeBeanModel.findUnique({ where: { id: beanId } }),
      this.farmModel.findUnique({ where: { id: farmId } }),
      this.roasterService.getRoasterById(roasterId),
    ]);

    if (!beanExists) {
      throw new NotFoundError(
        `CoffeeBean with id ${beanId} does not exist`,
        ErrorCode.NOT_FOUND
      );
    }
    if (!farmExists) {
      throw new NotFoundError(
        `Farm with id ${farmId} does not exist`,
        ErrorCode.NOT_FOUND
      );
    }
    if (!roasterExists) {
      throw new NotFoundError(
        `Roaster with id ${roasterId} does not exist`,
        ErrorCode.NOT_FOUND
      );
    }
  }

  private async validateCoffeeBeanExists(id: number): Promise<CoffeeBean> {
    const result = await this.coffeeBeanModel.findUnique({
      where: { id: id },
      include: { processingMethod: true, coffeeRegion: true, products: true },
    });
    if (!result) {
      throw new NotFoundError(
        `CoffeeBean with ID ${id} does not exist.`,
        ErrorCode.NOT_FOUND
      );
    }
    return result;
  }

  private async validateCoffeeRegionExists(id: number): Promise<CoffeeRegion> {
    const result = await this.coffeeRegionModel.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundError(
        `CoffeeRegion with ID ${id} does not exist.`,
        ErrorCode.NOT_FOUND
      );
    }
    return result;
  }

  private async validateFarmExists(id: number): Promise<Farm> {
    const result = await this.farmModel.findUnique({ where: { id: id } });
    if (result == null) {
      throw new NotFoundError("Farm not found", ErrorCode.NOT_FOUND);
    }
    return result;
  }

  private async validateProcessingMethodExists(
    id: number
  ): Promise<CoffeeProcessingMethod> {
    const result = await this.coffeeProcessingMethodModel.findUnique({
      where: { id: id },
    });
    if (result == null) {
      throw new NotFoundError(
        "Coffee processing not found",
        ErrorCode.NOT_FOUND
      );
    }
    return result;
  }
}
