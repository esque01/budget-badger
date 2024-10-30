import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("expenses")
export class Expense {

    @PrimaryGeneratedColumn("uuid")
    expenseId!: string;

    @Column({ nullable: false })
    userId!: string;

    @Column({ type: 'real', nullable: false, default: 0 })
    amount!: number;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    category?: string;

    @Column({ type: "date", default: () => "CURRENT_DATE", nullable: true })
    date?: Date;

    @Column({ nullable: true })
    paymentMethod?: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date; 

    constructor(expense: Partial<Expense>) {
        Object.assign(this, expense);
    }

}