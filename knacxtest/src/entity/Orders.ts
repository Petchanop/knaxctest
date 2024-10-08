import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { OrderPayment } from "./Order_payment";

/*
order_id	bigint(20)	Id รายการสั่งซื้อ
order_no	varchar(100)	รหัสรายการสินค้า
branch_id	bigint(20)	Id สาขา
cn_number	varchar(200)	เลขประจำตัวผู้ป่วย
vn_number	varchar(200)	เลข visit
total_price	double(8,2)	ราคาทั้งหมด
status	enum(‘ค้างชำระ, 
‘ชำระเงินแล้ว’ , ‘ยกเลิก’)	สถานะ
code_cancel	varchar(20)	รหัสพนักงานที่ยกเลิก
remark_cancel	text	หมายเหตุการยกเลิก
*/

export enum OrderStatus {
    NOTPAID = 1,
    PAID = 2,
    CANCEL = 3,
}

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number

    @CreateDateColumn()
    create_at: Date


    @PrimaryGeneratedColumn()
    order_no: number

    @Column()
    branch_id: number

    @ManyToOne(() => Patient, (patient) => patient.order, { 
        nullable: true , cascade: ["insert", "update"],
    })
    @JoinColumn()
    patient: Patient

    @Column()
    vn_number: number

    @Column()
    total_price: number

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.NOTPAID
    })
    status: OrderStatus

    @Column()
    code_cancel: string

    @Column()
    remark_cancel: string

    @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.order, { 
        nullable: true,
        cascade: ["insert", "update"],
    })
    order_payments: OrderPayment[]

    constructor(partial: Partial<Order>) {
        Object.assign(this, partial);
      }
}