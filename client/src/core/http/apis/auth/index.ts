import httpAuth from '@/core/http/singleton/auth';
import { loginUrl } from './urls';

export const loginApi = async (data: any) => {
    const res = await httpAuth.post<any>(loginUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

/*
export const loginApi = async (data: LoginParams): Promise<ResultResponse<LoginInterface>> => {
  const res = await httpAuth.post<ResultResponse<LoginInterface>>(loginUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
*/
