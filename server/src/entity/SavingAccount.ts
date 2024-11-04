import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity("saving_accounts")
export class SavingAccount {

    @PrimaryGeneratedColumn("uuid")
    savingId!: string;

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

    @ManyToOne(() => UserAccount, userAccount => userAccount.savingAccounts)
    @JoinColumn({ name: "accountId"})
    userAccount!: UserAccount;

    constructor(savingAccount: Partial<SavingAccount>) {
        Object.assign(this, savingAccount);
    }
}
