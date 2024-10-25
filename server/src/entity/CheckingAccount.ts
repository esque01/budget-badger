import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("checking_accounts")
export class CheckingAccount {
    @PrimaryColumn()
    checkingId: string;

    @Column({ nullable: false })
    accountId: string;

    @Column({ type: 'real', default: 0, nullable: false })
    balance: number;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(checkingAccount: Partial<CheckingAccount>) {
        this.checkingId = checkingAccount.checkingId || '';
        this.accountId = checkingAccount.accountId || '';
        this.balance = checkingAccount.balance || 0;
    }
}
