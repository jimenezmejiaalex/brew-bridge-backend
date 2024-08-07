import {RoasterModel, RoasterSpecialty, SpecialtyModel} from "@/types";
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

    private async validateRoasterSpecialtyExists(id: number) {
        const result = await this.specialtyModel.findUnique({where: {id: id}});
        if (!result) {
            throw new NotFoundError("Specialty not found", ErrorCode.NOT_FOUND);
        }
        return result;
    }
}