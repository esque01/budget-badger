import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
};

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column({ nullable: false })
    firstName!: string

    @Column({ nullable: false })
    lastName!: string

    @Column({ nullable: true })
    middleName?: string

    @Column({ nullable: false })
    emailAddress!: string;

    @Column({ nullable: false })
    phoneNumber!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ type: "text", enum: Role, default: Role.USER, nullable: false})
    role!: Role;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date | null;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
};
