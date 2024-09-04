import type {NextApiRequest, NextApiResponse} from 'next'
import {handleError} from "@/utils/ErrorUtils";
import {coffeeService} from "@/services";
import httpConstants from "@/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {pid} = req.query

    if (!pid) return res.status(404).json({error: 'No id'});

    try {
        const id = Number.parseInt(pid.toString());

        switch (method) {
            case httpConstants.HTTP2_METHOD_GET: {
                const result = await coffeeService.getCoffeeBeanById(id);
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
            case httpConstants.HTTP2_METHOD_PUT: {
                const body = req.body;
                if (!body) return res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({data: "Not body present"});
                const result = await coffeeService.updateCoffeeBean(id, body);
                return res.status(httpConstants.HTTP_STATUS_OK).json({data: result});
            }
            case httpConstants.HTTP2_METHOD_DELETE: {
                const result = await coffeeService.deleteCoffeeBean(id);
                return res.status(httpConstants.HTTP_STATUS_NO_CONTENT).end();
            }
            default: {
                res.status(500).json({data: "Method not supported"})
            }
        }
    } catch (error) {
        return handleError(error, res);
    }
}