import RestClient from "../../infrastructure/restClient/RestClient";
import { GoogleAccountListResponce } from "../google/models/GoogleAccountListResponce";

export default class GoogleService {
  public static getGoogleAccountList() {
    let query = `api/google-ads/google-users`;
    return RestClient.get<GoogleAccountListResponce>(query);
  }
}
