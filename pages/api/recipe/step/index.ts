import {stepService} from "@/services";
import {Step} from "@/types";
import type {NextApiRequest, NextApiResponse} from 'next'
import httpConstants from "@/constants";
import {handleError} from "@/utils/ErrorUtils";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    try {
        switch (method) {
            case httpConstants.HTTP2_METHOD_POST: {
                const body = req.body;
                const review = body as Step;
                const step = await stepService.createStep(review);
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: step});
            }
            case httpConstants.HTTP2_METHOD_GET: {
                const result = await stepService.listSteps();
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
        }
        res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({data: "Not supported"})
    } catch (error) {
        return handleError(error, res);
    }
}