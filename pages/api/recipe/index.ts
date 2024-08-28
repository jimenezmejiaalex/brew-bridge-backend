import {recipeService} from "@/services";
import {Recipe} from "@/types";
import type {NextApiRequest, NextApiResponse} from 'next'
import httpConstants from "@/constants";
import {handleError} from "@/utils/ErrorUtils";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        switch (method) {
            case httpConstants.HTTP2_METHOD_POST: {
                const body = req.body;
                const recipe = body as Recipe;
                const step = await recipeService.createRecipe(recipe);
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: step});
            }
            case httpConstants.HTTP2_METHOD_GET: {
                const result = await recipeService.listRecipes();
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
        }
        res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({data: "Not supported"})
    } catch (error) {
        return handleError(error, res);
    }
}