import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity("incomes")
export class Income {

    @PrimaryGeneratedColumn("uuid")
    incomeId!: string;

    @Column({ nullable: false })
    userId!: string;

    @Column({ type: 'real', default: 0, nullable: false })
    amount!: number;

    @Column({ nullable: true })
    source?: string;

    @Column({ nullable: true })
    category?: string;

    @Column({ type: "date", default: () => "CURRENT_DATE", nullable: true })
    date?: Date;

    @CreateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateCreated!: Date;

    @UpdateDateColumn({ type: "date", default: () => "CURRENT_DATE" })
    dateModified!: Date;
    
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date | null;

    constructor(income: Partial<Income>) {
        Object.assign(this, income);
    }
}
