export interface ResultResponse<T> {
    Status: number;
    isError: boolean;
    isOk: boolean;
    Object: T;
}
