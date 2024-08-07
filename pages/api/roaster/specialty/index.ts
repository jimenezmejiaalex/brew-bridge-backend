import {coffeeService, roasterService} from "@/services";
import {RoasterSpecialty} from "@/types";
import type {NextApiRequest, NextApiResponse} from 'next'
import httpConstants from "@/constants";
import {handleError} from "@/utils/ErrorUtils";
import {isArrayOfRoasterSpecialty, isRoasterSpecialty} from "@/types/guards";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        switch (method) {
            case httpConstants.HTTP2_METHOD_POST: {
                const body = req.body;
                if (isRoasterSpecialty(body)) {
                    const roasterSpecialty = body as RoasterSpecialty;
                    const result = await roasterService.createRoasterSpecialty(roasterSpecialty);
                    return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
                } else if (isArrayOfRoasterSpecialty(body)) {
                    const roasterSpecialties = body as Array<RoasterSpecialty>;
                    await roasterService.createManyRoasterSpecialty(roasterSpecialties);
                    return res.status(httpConstants.HTTP_STATUS_NO_CONTENT).end();
                } else return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({error: 'Invalid input'});
            }
            case httpConstants.HTTP2_METHOD_GET: {
                const result = await roasterService.getAllRoasterSpecialties();
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
        }
        res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({error: "Not supported"});
    } catch (error) {
        return handleError(error, res);
    }
}