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
    password: Scalars['String'];
    username: Scalars['String'];
};

export interface IconProps {
    active?: boolean;
    className?: string;
    onClick?: () => void;
}
