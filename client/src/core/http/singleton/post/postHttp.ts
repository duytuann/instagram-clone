import HttpClient from '@/core/http';
import { RESTFUL_POST_URL } from '@/helpers/apiConst';

export default class HttpPost extends HttpClient {
    private static classInstance?: HttpPost;
    private constructor() {
        super(RESTFUL_POST_URL || '');
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new HttpPost();
        }

        return this.classInstance;
    }
}
