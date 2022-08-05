import { loginUrl, logoutUrl } from './urls';
import httpAuth from '@/core/http/singleton/auth';

export const loginApi = async (data: any) => {
    const res = await httpAuth.post<any>(loginUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const logoutApi = async (data: any) => {
    const res = await httpAuth.post<any>(logoutUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
