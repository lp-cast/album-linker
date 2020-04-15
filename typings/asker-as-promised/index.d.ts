declare module "asker-as-promised" {
    import * as http from "http";

    export = ask;

    function ask(params: ask.Params): ask.Response;

    namespace ask {
        export type ResponseValue = {
            statusCode: number;
            headers: {
                [name: string]: string;
            };
            meta: {
                time: {
                    network: number;
                    total: number;
                };
                options: Params;
                retries: {
                    used: number;
                    limit: number;
                };
            };
            data: Buffer | null;
        };

        export type Response = Promise<ask.ResponseValue>;

        export type Params = {
            host?: string;
            hostname?: string;
            port?: number;
            path?: string;
            protocol?: string;
            url?: string;
            method?: string;
            headers?: {
                [name: string]: string;
            };
            query?: {
                [name: string]: string;
            };
            requestId?: string;
            body?: any;
            bodyEncoding?: "raw" | "string" | "json" | "urlencoded" | "multipart";
            queueTimeout?: number;
            timeout?: number;
            maxRetries?: number;
            minRetriesTimeout?: number;
            maxRetriesTimeout?: number;
            allowGzip?: boolean;
            agent?: http.Agent | false;
            isNetworkError?(statusCode: number): boolean;
            isRetryAllowed?(retryReason: Error): boolean;
        };

        export class Error extends global.Error {
            static CODES: ErrorList;
            code: string;
            data: ResponseValue;
        }

        export type ErrorList = {
            QUEUE_TIMEOUT: string;
            SOCKET_TIMEOUT: string;
            UNEXPECTED_STATUS_CODE: string;
            HTTP_CLIENT_REQUEST_ERROR: string;
            REQUEST_ALREADY_RUNNING: string;
            RETRIES_LIMIT_EXCEEDED: string;
            GUNZIP_ERROR: string;
            AGENT_NAME_ALREADY_IN_USE: string;
            BODY_ENCODER_NOT_EXIST: string;
            UNEXPECTED_BODY_TYPE: string;
            UNEXPECTED_ENCODER_ERROR: string;
        };
    }
}
