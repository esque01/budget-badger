import { Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { CheckingAccount } from "./CheckingAccount";
import { SavingAccount } from "./SavingAccount";
import { User } from "./User";

@Entity("user_accounts")
export class UserAccount {
    
    @PrimaryGeneratedColumn("uuid")
    accountId!: string;

    @ManyToOne(() => User, user => user.userId, { nullable: false })
    @JoinColumn({ name: "userId"})
    user!: User;

    @ManyToOne(() => CheckingAccount, checkingAccount => checkingAccount.checkingId, { nullable: false })
    @JoinColumn({ name: "checkingAccountId"})
    checkingAccount!: CheckingAccount;

    @ManyToOne(() => SavingAccount, savingAccount => savingAccount.savingId, { nullable: false })
    @JoinColumn({ name: "savingAccountId"})
    savingAccount!: SavingAccount;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(userAccount: Partial<UserAccount>) {
        Object.assign(this, userAccount);
    }
}