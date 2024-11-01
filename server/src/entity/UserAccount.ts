import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_accounts")
export class UserAccount {
    
    @PrimaryGeneratedColumn("uuid")
    accountId!: string;

    @Column({ nullable: false })
    userId!: string;

    @Column({ nullable: false })
    checkingId!: string;

    @Column({ nullable: false })
    savingId!: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(userAccount: Partial<UserAccount>) {
        Object.assign(this, userAccount);
    }
}