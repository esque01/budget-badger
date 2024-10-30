import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_accounts")
export class UserAccount {
    
    @PrimaryGeneratedColumn("uuid")
    accountId!: string;

    @Column({ nullable: false })
    userId!: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    constructor(userAccount: Partial<UserAccount>) {
        Object.assign(this, userAccount);
    }
}