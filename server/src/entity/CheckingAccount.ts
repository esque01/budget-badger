import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("checking_accounts")
export class CheckingAccount {
    
    @PrimaryGeneratedColumn("uuid")
    checkingId!: string;

    @Column({ nullable: false })
    accountId!: string;

    @Column({ type: 'real', default: 0, nullable: false })
    balance!: number;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(checkingAccount: Partial<CheckingAccount>) {
        Object.assign(this, checkingAccount);
    }
}
