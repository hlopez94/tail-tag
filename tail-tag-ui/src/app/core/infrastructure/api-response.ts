import { ApiError } from "./api-error";

export interface ApiResponse{
  ok:boolean;
  reasonText?:string;
  errors?: ApiError[];
}

export interface TypedApiResponse<T> extends ApiResponse{
  data: T
}
