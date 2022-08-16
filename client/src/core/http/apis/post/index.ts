import {
    GetAllUrl,
    CreateUrl,
    UpdateUrl,
    DeleteUrl,
    Like,
    Unlike,
    CommentUrl,
    GetDetailByPostId,
    GetCommentOfPost,
} from './urls';
import { CreateComment, GetCommentOfPostParams } from './types';
import httpPost from '@/core/http/singleton/post';

export const getAllPostApi = async () => {
    const res = await httpPost.get<any>(GetAllUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const getDetailByPostIdApi = async (postId: string) => {
    const res = await httpPost.post<any>(GetDetailByPostId(postId));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const createPostApi = async (data: any) => {
    const res = await httpPost.post<any>(CreateUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const likePostApi = async (postId: string) => {
    const res = await httpPost.post<any>(Like(postId));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const unlikePostApi = async (postId: string) => {
    const res = await httpPost.post<any>(Unlike(postId));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const commentPostApi = async (data: CreateComment) => {
    const res = await httpPost.post<any>(CommentUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const getCommentOfPostApi = async (params: GetCommentOfPostParams) => {
    const res = await httpPost.post<any>(GetCommentOfPost(params));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const deletePostApi