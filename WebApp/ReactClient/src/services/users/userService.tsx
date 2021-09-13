import RestClient from '../../infrastructure/restClient/RestClient';
import { UserRegistration } from './models/UserRegistration';

export default class UserService {
    public static registerUser(request: UserRegistration ) { 
        return RestClient.post('api/users/register', request);
    }
}