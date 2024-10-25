import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("saving_accounts")
export class SavingAccount {
    @PrimaryColumn()
    savingId: string;

    @Column({ nullable: false })
    accountId: string;

    @Column({ type: 'real', default: 0, nullable: false })
    balance: number;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(savingAccount: Partial<SavingAccount>) {
        this.savingId = savingAccount.savingId || '';
        this.accountId = savingAccount.accountId || '';
        this.balance = savingAccount.balance || 0;
    }
}
