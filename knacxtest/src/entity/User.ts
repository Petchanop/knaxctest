import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Appointment } from "./Appointments";
/*
user_id	bigint(20)	Id  พนักงาน / แพทย์
user_code	varchar(20)	รหัสพนักงาน/แพทย์
firstname	varchar(100)	ชื่อจริง
lastname	varchar(100)	นามสกุล
display_name	varchar(50)	ชื่อเล่น
email	varchar(150)	อีเมล
id_card	varchar(20)	เลขประจำตัวประชาชน
date_of_birth	date	วันเกิด
phone	varchar(20)	เบอร์โทร
position_id	bigint(20)	ตำแหน่ง

*/

/* 
Postition
position_id	bigint(20)	Id ตำแหน่ง
position_name_th	varchar(50)	ชื่อตำแหน่ง
*/

@Entity('user')
export class User {
    
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    user_id: number;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
        nullable: false,
    })
    user_code: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstname: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    lastname: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    display_name: string;

    @Column({
        type: 'varchar',
        length: 150,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
        nullable: true,
    })
    id_card: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    date_of_birth: Date;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    phone: string;

    @Column({
        type: 'bigint',
        nullable: true,
    })
    position_id: number;

    @OneToMany(()=> Appointment, (appoinment) => appoinment.doctor,{ nullable: true })
    @JoinColumn()
    appointment: Appointment 
}

