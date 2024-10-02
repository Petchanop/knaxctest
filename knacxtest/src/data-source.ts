import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Gender, Patient } from "./entity/Patient";

export const generateSamplePatients = (count: number) => {
    const samplePatients = [];

    for (let i = 1; i <= count; i++) {
        const patient = {
            branch_id: Math.floor(Math.random() * 100) + 1,
            cn_number: `CN${100000 + i}`,
            branch_cn_number: `BCN${900000 + i}`,
            id_card: `${Math.floor(1000000000000 + Math.random() * 9000000000000)}`, // Random 13-digit ID
            phone: `08${Math.floor(100000000 + Math.random() * 900000000)}`, // Random 10-digit phone number
            prefix_id: Math.floor(Math.random() * 5) + 1, // Random prefix ID (1 to 5)
            firstname: `Firstname${i}`,
            lastname: `Lastname${i}`,
            display_name: `Firstname${i} Lastname${i}`,
            gender: i % 2 === 0 ? Gender.MALE : Gender.FEMALE, // Alternating between male and female
            date_of_birth: new Date(1990, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            blood_type_id: Math.floor(Math.random() * 4) + 1 // Blood type IDs 1 to 4 (A, B, AB, O)
        };

        samplePatients.push(patient);
    }

    return samplePatients;
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "knacxtestdb",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Patient],
    migrations: [],
    subscribers: [],
})
