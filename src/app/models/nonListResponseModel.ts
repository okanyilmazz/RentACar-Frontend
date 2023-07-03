import { ResponseModel } from "./responseModel";
export interface NonListResponseModel<T> extends ResponseModel {
  data: T;
}
