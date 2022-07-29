import HttpClient from '@/core/http';
import { RESTFUL_USER_URL } from '@/helpers/apiConst';

export default class HttpUser extends HttpClient {
    private static classInstance?: HttpUser;
    private constructor() {
        super(RESTFUL_USER_URL || '');
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new HttpUser();
        }

        return this.classInstance;
    }
}
