import { CustomError } from '../../../../utils/CustomError';

export class GetPrivacyPolicyUseCase {
    execute() {
        try {
            var path = require('path');
            return path.join(__dirname, './politica-privacidade.pdf');
        } catch (error: any) {
            throw new CustomError(error.message, error.status || 500);
        }
    }
}
