import { Repository } from "typeorm";
import { appDataSource } from "../data-source";
import { User } from "../entity/User";


class UserService {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
        const user: User | null = await this.userRepository.findOne({
            where: {
                phoneNumber
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}

export default UserService;