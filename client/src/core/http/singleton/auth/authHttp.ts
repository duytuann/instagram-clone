import HttpClient from '@/core/http';
import { RESTFUL_AUTH_URL } from '@/helpers/apiConst';

export default class HttpAuth extends HttpClient {
    private static classInstance?: HttpAuth;
    private constructor() {
        super(RESTFUL_AUTH_URL || '');
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new HttpAuth();
        }

        return this.classInstance;
    }
}
