import { GetAllUrl, CreateUrl, UpdateUrl, DeleteUrl } from './urls';
import { CreatePostParams } from './types';
import httpPost from '@/core/http/singleton/post';

export const getAllPostApi = async () => {
    const res = await httpPost.get<any>(GetAllUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const createPostApi = async (data: any) => {
    const res = await httpPost.post<any>(CreateUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
