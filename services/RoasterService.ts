import {Roaster, RoasterModel, RoasterSpecialty, SpecialtyModel} from "@/types";
import {NotFoundError} from "@/errors/NotFoundError";
import {ErrorCode} from "@/enums/ErrorCode";

export class RoasterService {
    private roasterModel: RoasterModel;
    private specialtyModel: SpecialtyModel;

    constructor(roasterModel: RoasterModel, specialtyModel: SpecialtyModel) {
        this.roasterModel = roasterModel;
        this.specialtyModel = specialtyModel;
    }

    async createRoasterSpecialty(specialty: RoasterSpecialty): Promise<RoasterSpecialty> {
        const result = await this.specialtyModel.create({
            data: {
                name: specialty.name,
                description: specialty.description
            }
        })

        return result;
    }

    async createManyRoasterSpecialty(specialties: Array<RoasterSpecialty>): Promise<void> {
        const result = await this.specialtyModel.createMany({
            data: specialties.map(s => ({name: s.name, description: s.description})),
        })

        return;
    }

    async getAllRoasterSpecialties() {
        const result = await this.specialtyModel.findMany();

        return result;
    }

    async getRoasterSpecialtiesById(id: number): Promise<RoasterSpecialty> {
        const result = await this.validateRoasterSpecialtyExists(id);
        const roasterSpecialty: RoasterSpecialty = {
            id: result.id,
            name: result.name,
            description: result.description
        };

        return roasterSpecialty;
    }

    async updateRoasterSpecialty(id: number, body: RoasterSpecialty): Promise<RoasterSpecialty> {
        const result = this.validateRoasterSpecialtyExists(id);
        const resultUpdated = await this.specialtyModel
            .update({
                where: {id: id},
                data: {
                    name: body.name,
                    description: body.description
                }
            });
        return resultUpdated;
    }

    async deleteRoasterSpecialty(id: number): Promise<void> {
        const result = this.validateRoasterSpecialtyExists(id);
        const deletedItem = await this.specialtyModel.delete({where: {id: id}});
        return;
    }

    // Create a new Roaster
    async createRoaster(roaster: Roaster): Promise<Roaster> {
        const result = await this.roasterModel.create({
            data: {
                name: roaster.name,
                location: roaster.location,
                website: roaster.website,
                contactInfo: roaster.contactInfo,
                specialtyId: roaster.specialtyId
            }
        });
        return result;
    }

    // Get all Roasters
    async getAllRoasters(): Promise<Array<Roaster>> {
        const result = await this.roasterModel.findMany({
            include: {
                specialty: true,
                products: true
            }
        });
        return result;
    }

    // Get a Roaster by ID
    async getRoasterById(id: number): Promise<Roaster> {
        const result = await this.validateRoasterExists(id);
        return result;
    }

    // Update a Roaster by ID
    async updateRoaster(id: number, body: Roaster): Promise<Roaster> {
        await this.validateRoasterExists(id);
        const updatedRoaster = await this.roasterModel.update({
            where: {id: id},
            data: {
                name: body.name,
                location: body.location,
                website: body.website,
                contactInfo: body.contactInfo,
                specialtyId: body.specialtyId
            }
        });
        return updatedRoaster;
    }

    // Delete a Roaster by ID
    async deleteRoaster(id: number): Promise<void> {
        await this.validateRoasterExists(id);
        await this.roasterModel.delete({where: {id: id}});
        return;
    }

    // Utility method to validate if a Roaster exists by ID
    private async validateRoasterExists(id: number): Promise<Roaster> {
        const result = await this.roasterModel.findUnique({
            where: {id: id},
            include: {specialty: true, products: true}
        });
        if (!result) {
            throw new NotFoundError(`Roaster with ID ${id} does not exist.`, ErrorCode.NOT_FOUND);
        }
        return result;
    }

    private async validateRoasterSpecialtyExists(id: number) {
        const result = await this.specialtyModel.findUnique({where: {id: id}});
        if (!result) {
            throw new NotFoundError("Specialty not found", ErrorCode.NOT_FOUND);
        }
        return result;
    }
}