import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
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

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
