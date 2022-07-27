import httpAuth from '@/core/http/singleton/auth';
import { loginUrl , logoutUrl} from './urls';

export const loginApi = async (data: any) => {
    const res = await httpAuth.post<any>(loginUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const logoutApi = async () => {
    const res = await httpAuth.post<any>(logoutUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
  };