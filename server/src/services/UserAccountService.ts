import { Repository } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { appDataSource } from "../data-source";


class UserAccountService {

    private userAccountRepository: Repository<UserAccount>;

    constructor() {
        this.userAccountRepository = appDataSource.getRepository(UserAccount);
    }

    async getUserAccount(userId: string): Promise<UserAccount> {
        const userAccount: UserAccount |  null = await this.userAccountRepository.findOne({
            where: {
                user: {
                    userId
                }
            },
            relations: ["checkingAccount", "savingAccount"]
        });

        if (!userAccount) {
            throw new Error("Account not found");
        }

        return userAccount;
    };

}

export default UserAccountService;