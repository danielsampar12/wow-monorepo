import { Request, Response } from "express";
import { SearchUseCase } from "../useCases/search/SearchUseCase";

export class SearchController {
    async handle(req: Request, res: Response) {
        try {
            const searchUseCase = new SearchUseCase();

            const { search } = req.body;

            const { latitude, longitude } = req.query;

            const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

            const result = await searchUseCase.execute({ search, location });

            return res.json(result).status(200);
        } catch(error: any) {
            return res.status(error.status || 500).send(error.message);
        }
    }
}