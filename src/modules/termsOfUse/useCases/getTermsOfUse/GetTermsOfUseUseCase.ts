import { CustomError } from '../../../../utils/CustomError';

export class GetTermsOfUseUseCase {
    execute() {
        try {
            var path = require('path');
            return path.join(__dirname, './termos-de-uso.pdf');
        } catch (error: any) {
            throw new CustomError(error.message, error.status || 500);
        }
    }
}
