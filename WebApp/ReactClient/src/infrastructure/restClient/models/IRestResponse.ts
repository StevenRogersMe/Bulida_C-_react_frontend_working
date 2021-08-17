import { IErrorContent } from "./IErrorContent";

export interface IRestResponse<T> {
    is_error?: boolean;
    error_content?: IErrorContent;
    content?: T;
}