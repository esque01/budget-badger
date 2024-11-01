import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("saving_accounts")
export class SavingAccount {

    @PrimaryGeneratedColumn("uuid")
    savingId!: string;

    @Column({ type: 'real', default: 0, nullable: false })
    balance!: number;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(savingAccount: Partial<SavingAccount>) {
        Object.assign(this, savingAccount);
    }
}
