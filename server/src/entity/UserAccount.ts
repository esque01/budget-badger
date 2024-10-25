import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("user_accounts")
export class UserAccount {
    @PrimaryColumn()
    accountId: string;

    @Column({ nullable: false })
    userId: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    constructor(userAccount: Partial<UserAccount>) {
        this.accountId = userAccount.accountId || '';
        this.userId = userAccount.userId || '';
    }
}