export interface ResultResponse<T> {
    success: boolean;
    message: string;
    resource: T;
}
