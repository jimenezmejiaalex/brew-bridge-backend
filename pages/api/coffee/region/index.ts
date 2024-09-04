import {coffeeService} from "@/services";
import {CoffeeRegion} from "@/types";
import type {NextApiRequest, NextApiResponse} from 'next'
import httpConstants from "@/constants";
import {handleError} from "@/utils/ErrorUtils";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        switch (method) {
            case httpConstants.HTTP2_METHOD_POST: {
                const body = req.body;
                const coffeeRegion = body as CoffeeRegion;
                const result = await coffeeService.createCoffeeRegion(coffeeRegion);
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
            case httpConstants.HTTP2_METHOD_GET: {
                const result = await coffeeService.getAllCoffeeRegions();
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
        }
        res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({data: "Not supported"})
    } catch (error) {
        return handleError(error, res);
    }
}