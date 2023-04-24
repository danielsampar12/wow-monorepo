import { Request, Response } from 'express';
import { CustomError } from '../../../utils/CustomError';
import { GetPrivacyPolicyUseCase } from '../useCases/getPrivacyPolicy/GetPrivacyPolicyUseCase';

export class GetPrivacyPolicyController {
    async handle(req: Request, res: Response) {
        try {
            const getPrivacyPolicyUseCase = new GetPrivacyPolicyUseCase();

            const filePath = getPrivacyPolicyUseCase.execute();

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
