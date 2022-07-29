import { signUpUrl } from './urls';
import httpUser from '@/core/http/singleton/user';

export const createUserApi = async (data: any) => {
    const res = await httpUser.post<any>(signUpUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
