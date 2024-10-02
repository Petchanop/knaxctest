import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Orders"
/*
order_payment_id	bigint(20)	Id การชำระเงิน
branch_id	bigint(20)	Id สาขา
order_id	bigint(20)	Id รายการสั่งซื้อ
payment_no	varchar(20)	เลขที่ใบชำระเงิน
stage	int(11)	รอบการชำระเงิน
payment_channel_id	bigint(20)	Id ช่องทางการชำระเงิน
bank_id	bigint(20)	Id ธนาคาร
total_price	double(8,2)	ราคารวมทั้งหมด
price	double(8,2)	เงินที่จ่าย
balance	double(8,2)	ยอดคงเหลือ
*/

export enum PaymentChannel {
    CASH = 1,
    TRANSFER_APP = 2,
    TRANSFER_BANK = 3,
    CHECK = 4,
    CREDIT = 5,
}

@Entity()
export class OrderPayment {
    @PrimaryGeneratedColumn()
    order_payment_id: number

    @Column()
    branch_id: number

    @OneToOne(() => Order)
    order : Order

    @Column()
    payment_no: string

    @Column()
    stage: number

    @Column({
        type: 'enum',
        enum: PaymentChannel,
    })
    payment_channel_id : PaymentChannel

    @Column()
    bank_id: number

    @Column()
    total_price: number

    @Column()
    price: number

    @Column()
    balance: number
    // payment_channel_id	bigint(20)	Id ช่องทางการชำระเงิน
    // bank_id	bigint(20)	Id ธนาคาร
    // total_price	double(8,2)	ราคารวมทั้งหมด
    // price	double(8,2)	เงินที่จ่าย
    // balance	double(8,2)	ยอดคงเหลือ
}