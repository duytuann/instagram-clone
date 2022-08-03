import { GetListUrl, CreateUrl, UpdateUrl, DeleteUrl } from './urls';
import { CreatePostParams } from './types';
import httpPost from '@/core/http/singleton/post';

export const createPostApi = async (data: any) => {
    const res = await httpPost.post<any>(CreateUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
