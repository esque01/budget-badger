import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("expenses")
export class Expense {

    @PrimaryColumn()
    expenseId: string;

    @Column({ nullable: false })
    userId: string;

    @Column({ type: 'real', nullable: false })
    amount: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    category: string;

    @Column({ type: "date", default: () => "CURRENT_DATE", nullable: true })
    date: Date;

    @Column({ nullable: true })
    paymentMethod: string;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date; 


    constructor(expense: Partial<Expense>) {
        this.expenseId = expense.expenseId || '';
        this.userId = expense.userId || '';
        this.amount = expense.amount || 0; 
        this.description = expense.description || '';
        this.category = expense.category || '';
        this.date = expense.date || new Date();
        this.paymentMethod = expense.paymentMethod || '';
    }

}