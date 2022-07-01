export enum ReduxStateType {
    INIT = 'init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
    CANCELLED = 'cancelled',
    SUCCESS = 'success',
    SUBMITTING = 'submitting',
    SUBMITTED = 'submitted',
}

export interface ReduxData<T> {
    data: T;
    status: ReduxStateType;
    error?: Error;
}
