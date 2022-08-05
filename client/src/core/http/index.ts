import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { loadProgressBar } from 'x-axios-progress-bar';
import { HttpError } from './types';
import { API_REQUEST_TIMEOUT, RESPONSE_CODE } from '@/helpers/consts';
import storage from '@/helpers/storage';

const RESTFUL_BASE_URL = (window as any)?.env?.API || import.meta.env.VITE_APP_RESTFUL_BASE_URL;

enum LogType {
    REQUEST = 'req',
    RESPONSE = 'res',
    ERROR = 'err',
}

const log = (...params: any) => {
    if (process.env.NODE_ENV === `development`) {
    }
};

const requestLog = (method: string = '', url: string = '', data: any, type: LogType, baseURL: string) => {
    const tag = type === LogType.REQUEST || type === LogType.RESPONSE ? method : LogType.ERROR;
    const colors = {
        [LogType.REQUEST]: 'blue',
        [LogType.RESPONSE]: 'green',
        [LogType.ERROR]: 'red',
    };
    const icons = {
        [LogType.REQUEST]: '>>>',
        [LogType.RESPONSE]: '<<<',
        [LogType.ERROR]: 'xxx',
    };

    log(
        `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.replace(baseURL, '')} \n`,
        `color: ${colors[type]}; font-weight: bold`,
        'color: violet; font-weight: bold',
        data,
    );
};

const headers = {
    Authorization: 'Basic',
    'Content-Type': 'application/json',
};
abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(URL: string) {
        const baseURL = `${RESTFUL_BASE_URL}${URL}`;

        this.instance = axios.create({
            baseURL,
            headers,
            timeout: API_REQUEST_TIMEOUT,
        });
        loadProgressBar(undefined, this.instance);
        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.request.use(
            async (req: AxiosRequestConfig) => {
                const token = await storage.getAccessToken();
                if (token) {
                    req.headers['Authorization'] = `Bearer ${token}`;
                }
                requestLog(req.method, req.url, req, LogType.REQUEST, req.baseURL || '');

                return req;
            },
            (error) => {
                log('request.error', error?.response?.data);
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(this._handleResponse, this._handleError);
    };

    private _handleResponse = (response: AxiosResponse) => {
        const {
            config: { method, url, baseURL },
        } = response;
        if (response.data.Status === RESPONSE_CODE.TOKEN_EXPIRED) {
            storage.logOut();
            return null;
        }
        requestLog(method, url, response, LogType.RESPONSE, baseURL || '');
        return response;
    };

    protected _handleError = (error: any) => {
        const httpCode = error?.response?.status;
        let errorData: HttpError = error?.response?.data;
        // const config = error?.response?.config;
        // const refreshToken = storage.getRefreshToken();

        const serverCode = errorData?.code; //801
        let serverMessage = errorData?.description;
        let clientCode = serverCode;

        // Handle some special http errors
        if ([404, 500, 501, 502, 503, 403].includes(httpCode)) {
            clientCode = 'error.errorServer';
        } else {
            clientCode = `error.ERROR${serverCode?.toString().replaceAll('-', '_')}`;
        }

        if (typeof errorData === 'string') {
            serverMessage = errorData;
        }
        // Trả ra cho client
        errorData = {
            code: clientCode, // Key của intl
            description: serverMessage, // default message cho intl
        };
        if (!httpCode || [404, 403].includes(httpCode)) {
        }

        if (httpCode === RESPONSE_CODE.TOKEN_EXPIRED) {
            storage.logOut();
        }
        log('response.error', { error });
        return Promise.reject(errorData);
    };

    public get = <T>(url: string, params = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> =>
        this.instance.get<T>(url, { params, ...config });

    public post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        this.instance.post<T>(url, data, { ...config });

    public put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        this.instance.put<T>(url, data, { ...config });

    public patch = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        this.instance.patch<T>(url, data, { ...config });

    public delete = <T>(url: string, config: AxiosRequestConfig = {}) => this.instance.delete<T>(url, { ...config });
}

export default HttpClient;
