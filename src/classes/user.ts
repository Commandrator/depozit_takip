import UserDTO from "../interfaces/UserDTO"
export class User {
    username: string;
    email: string;
    constructor(parameters: UserDTO) {
        if (parameters) {
            this.username = parameters.username; // Parametreden alınıyor
            this.email = parameters.email;       // Parametreden alınıyor
        }
    }
}
