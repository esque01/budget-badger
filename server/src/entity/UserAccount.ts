import { Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
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

    @OneToMany(() => CheckingAccount, checkingAccount => checkingAccount.userAccount, { nullable: false })
    checkingAccounts!: CheckingAccount[];

    @OneToMany(() => SavingAccount, savingAccount => savingAccount.userAccount, { nullable: false })
    savingAccounts!: SavingAccount[];

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(userAccount: Partial<UserAccount>) {
        Object.assign(this, userAccount);
    }
}