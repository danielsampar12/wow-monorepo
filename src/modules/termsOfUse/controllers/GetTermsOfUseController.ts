import { Request, Response } from 'express';
import { CustomError } from '../../../utils/CustomError';
import { GetTermsOfUseUseCase } from '../useCases/getTermsOfUse/GetTermsOfUseUseCase';

export class GetTermsOfUseController {
    async handle(req: Request, res: Response) {
        try {
            const getTermsOfUseUseCase = new GetTermsOfUseUseCase();

            const filePath = getTermsOfUseUseCase.execute();

            res.download(filePath, (error) => {
                if (error) {
                    throw new CustomError(error.message, 500);
                }
            });
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
}
