import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Patient } from "./Patient"
import { User } from "./User"
/*
appointment_id	bigint(20)	Id การนัด
appointment_no	varchar(200)	 เลขที่นัดหมาย
patient_id	bigint(20)	 id ผู้ป่วย
cn_number	varchar(200)	 เลขประจำตัวผู้ป่วย
branch_id	bigint(20)	 Id สาขา
operative_type_id	varchar(255)	 I’d รายการรับบริการ
doctor_id	bigint(20)	 Id หมอ
date	date	 วันที่
start_time	time	 เวลา
duration	int(11)	 ระยาเวลา
practice	text	 การปฏิบัติ
price	double(8,2)	 ราคาโดยประมาณ
status	enum(‘ปกติ’, ‘ยืนยัน’, ‘เลื่อนนัด’, ‘ยกเลิก’)	 สถานะ
isDone	tinyint(4)	(0=ยังไม่เสร็จ, 1=เสร็จสิ้น)
*/

export enum Status {
    NORMAL = 1,
    CONFIRM = 2,
    POSTPONE = 3,
    CANCEL = 4,
}

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    appointment_id: number

    @PrimaryGeneratedColumn()
    appointment_no: number

    @OneToOne(() => Patient)
    patient: Patient

    @Column()
    operative_type_id: string

    @OneToOne(() => User)
    doctor: User

    @Column({
        type: 'date',
    })
    date: Date

    @Column({
        type: "timestamp with local time zone",
    })
    start_time: Timestamp

    @Column()
    duration: number

    @Column()
    practice : string

    @Column()
    price: number

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status

    @Column()
    isDone: boolean
}