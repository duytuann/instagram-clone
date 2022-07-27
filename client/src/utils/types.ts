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

export interface IconProps {
    active?: boolean;
    className?: string;
    onClick?: () => void;
}
