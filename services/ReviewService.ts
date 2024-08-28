import {Review, ReviewModel} from "@/types";
import {NotFoundError} from "@/errors/NotFoundError";
import {ErrorCode} from "@/enums/ErrorCode";

export class ReviewService {

    private reviewModel: ReviewModel;

    constructor(reviewModel: ReviewModel) {
        this.reviewModel = reviewModel;
    }

    private async validateReviewExists(reviewId: number) {
        const productExists = await this.reviewModel.findUnique({
            where: { id: reviewId },
        });

        if (!productExists) {
            throw new NotFoundError(`Review with id ${reviewId} does not exist`, ErrorCode.NOT_FOUND);
        }
    }

    // Create a new Review
    async createReview(data: Review): Promise<Review> {
        const result = await this.reviewModel.create({
            data,
            include: {
                product: true,
            },
        });

        return result;
    }

    // Get a Review by ID
    async getReviewById(id: number): Promise<Review | null> {
        const result = await this.reviewModel.findUnique({
            where: { id },
            include: {
                product: true,
            },
        });
        return result;
    }

    // Update a Review by ID
    async updateReview(id: number, data: Review): Promise<Review> {
        const reviewExists = await this.reviewModel.findUnique({
            where: { id },
        });

        if (!reviewExists) {
            throw new Error(`Review with id ${id} does not exist`);
        }

        if (data.id) {
            await this.validateReviewExists(data.id);
        }

        return this.reviewModel.update({
            where: { id },
            data,
            include: {
                product: true,
            },
        });
    }

    // Delete a Review by ID
    async deleteReview(id: number): Promise<Review> {
        const reviewExists = await this.reviewModel.findUnique({
            where: { id },
        });

        if (!reviewExists) {
            throw new Error(`Review with id ${id} does not exist`);
        }

        return this.reviewModel.delete({
            where: { id },
            include: {
                product: true,
            },
        });
    }

    // List all Reviews
    async listReviews(): Promise<Review[]> {
        return this.reviewModel.findMany({
            include: {
                product: true,
            },
        });
    }
}
