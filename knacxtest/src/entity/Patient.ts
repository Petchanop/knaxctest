import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointments"
import { Order } from "./Orders"
/*
patient_id	bigint(20)	 Id ผู้ป่วย
branch_id	bigint(20)	 Id สาขา
cn_number	varchar(20)	 เลขประจำตัวผู้ป่วย
branch_cn_number	varchar(20)	 เลขประจำตัวสาขา
id_card	varchar(20)	 เลขบัตรประชาชน
phone	varchar(20)	 เบอร์
prefix_id	bigint(20)	 Id คำนำหน้า
firstname	varchar(100)	 ชื่อจริง
lastname	varchar(100)	 นามสกุล
display_name	varchar(50)	 ชื่อเล่น
gender	enum('1', '2', '3')	 เพศ (1 = หญิง, 2= ชาย, 3= ไม่ระบุ)
date_of_birth	date	 วันเกิด
blood_type_id	bigint(20)	 Id กรุ๊ปเลือด
*/

export enum Gender {
    FEMALE = 1,
    MALE = 2,
    NOTANSWER = 3,
}
@Entity("patient")
export class Patient {
    @PrimaryGeneratedColumn()
    patient_id: number
    
    @Column()
    branch_id: number

    @Column()
    cn_number: string

    @Column()
    branch_cn_number: string

    @Column()
    id_card: string

    @Column()
    phone: string

    @Column()
    prefix_id: number

    @Column()
    firstname: string

    @Column()
    lastname : string

    @Column()
    display_name : string

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.NOTANSWER,
    })
    gender: Gender

    @Column({
        type: 'date',
    })
    date_of_birth: Date 

    @Column()
    blood_type_id : number

    @OneToMany(()=> Appointment, (appoinment) => appoinment.patient, { nullable: true })
    appointment: Appointment 

    @OneToMany(()=> Order, (order) => order.patient, { nullable: true })
    order: Order
}
