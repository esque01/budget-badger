import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from "typeorm"

@Entity("users")
export class User {

    @PrimaryColumn()
    userId: string;

    @Column({ nullable: false })
    firstName: string

    @Column({ nullable: false })
    lastName: string

    @Column({ nullable: false })
    emailAddress: string;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date; 


    constructor(user: Partial<User>) {
        this.userId = user.userId || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.emailAddress = user.emailAddress || '';
        this.phoneNumber = user.phoneNumber || '';
        this.password = user.password || '';
    }
};
