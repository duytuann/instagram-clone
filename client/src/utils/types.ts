import { DOMAttributes } from 'react';

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type LoginInput = {
    password: string;
    username: string;
};

export interface IconProps extends DOMAttributes<SVGSVGElement> {
    active?: boolean;
    className?: string;
    onClick?: () => void;
}

export type BaseUserFragment = {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
};

export type UserFragment = {
    __typename?: 'User';
    _id: string;
    email: string;
    username: string;
    account: string;
    avatar?: string | null;
    followers: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
    }>;
    following: Array<{
        __typename?: 'User';
        _id: string;
        email: string;
        username: string;
        account: string;
        avatar?: string | null;
    }>;
};
