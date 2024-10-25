import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("incomes")
export class Income {
    @PrimaryColumn()
    incomeId: string;

    @Column({ nullable: false })
    userId: string;

    @Column({ type: 'real', default: 0, nullable: false })
    amount: number;

    @Column({ nullable: true })
    source: string;

    @Column({ nullable: true })
    category: string;

    @Column({ type: "date", default: () => "CURRENT_DATE", nullable: true })
    date: Date;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;

    constructor(income: Partial<Income>) {
        this.incomeId = income.incomeId || ''; 
        this.userId = income.userId || ''; 
        this.amount = income.amount || 0; 
        this.source = income.source || '';
        this.category = income.category || '';
        this.date = income.date || new Date();
    }
}
