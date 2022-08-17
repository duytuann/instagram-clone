import { signUpUrl, Follow, Unfollow, GetProfileUrl } from './urls';
import httpUser from '@/core/http/singleton/user';

export const createUserApi = async (data: any) => {
    const res = await httpUser.post<any>(signUpUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const followUserApi = async (userId: string) => {
    const res = await httpUser.post<any>(Follow(userId));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const unfollowUserApi = async (userId: string) => {
    const res = await httpUser.post<any>(Unfollow(userId));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const getProfileApi = async (username: string) => {
    const res = await httpUser.get<any>(GetProfileUrl(username));
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
