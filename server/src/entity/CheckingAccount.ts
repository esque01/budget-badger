import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity("checking_accounts")
export class CheckingAccount {
    
    @PrimaryGeneratedColumn("uuid")
    checkingId!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ type: 'real', default: 0, nullable: false })
    balance!: number;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => UserAccount, userAccount => userAccount.checkingAccounts)
    @JoinColumn({ name: "accountId"})
    userAccount!: UserAccount;

    constructor(checkingAccount: Partial<CheckingAccount>) {
        Object.assign(this, checkingAccount);
    }
}
