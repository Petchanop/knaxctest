import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Gender, Patient } from "./entity/Patient";
import { Appointment, Status } from "./entity/Appointments";
import { Order, OrderStatus } from "./entity/Orders";
import { OrderPayment } from "./entity/Order_payment";

export const generateSamplePatients = (count: number) : Patient[] => {
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

export const mockUsers: User[] = [
    {
        user_id: 1,
        user_code: 'USR001',
        firstname: 'John',
        lastname: 'Doe',
        display_name: 'JohnD',
        email: 'john.doe@example.com',
        id_card: '1234567890',
        date_of_birth: new Date('1990-05-15'),
        phone: '555-1234',
        position_id: 101,
    } as User,
    {
        user_id: 2,
        user_code: 'USR002',
        firstname: 'Jane',
        lastname: 'Smith',
        display_name: 'JaneS',
        email: 'jane.smith@example.com',
        id_card: '9876543210',
        date_of_birth: new Date('1985-11-20'),
        phone: '555-5678',
        position_id: 102,
    } as User,
    {
        user_id: 3,
        user_code: 'USR003',
        firstname: 'Michael',
        lastname: 'Johnson',
        display_name: 'MikeJ',
        email: 'michael.johnson@example.com',
        id_card: '5556667778',
        date_of_birth: new Date('1978-08-25'),
        phone: '555-9012',
        position_id: 103,
    } as User,
];

export const generateMockAppointments = (patients: Patient[], doctors: User[], count: number): Appointment[] => {
    const appointments: Appointment[] = [];

    for (let i = 0; i < count; i++) {
        const patient = patients[i % patients.length]; // Cycle through patients
        const doctor = doctors[i % doctors.length];   // Cycle through doctors
        const date = new Date();
        date.setDate(date.getDate() + i);
        const randomDays = Math.floor(Math.random() * 30); // Randomly choose between 0 to 29 days
        const appointmentDate = new Date(date);
        appointmentDate.setDate(appointmentDate.getDate() + randomDays);          // Set each appointment on a different day
        appointmentDate.setHours(9 + (i % 8));             // Vary start time between 9 AM and 4 PM
        appointmentDate.setMinutes(0);
        appointmentDate.setSeconds(0); 
        const appointment: Appointment = {
            appointment_id: i + 1,
            appointment_no: 1000 + i,
            patient: patient,
            operative_type_id: `OT${Math.floor(100 + Math.random() * 900)}`,  // Random operation ID
            doctor: doctor,
            date: appointmentDate,
            start_time: appointmentDate.getHours(),  // Vary start time by hour (9 AM - 4 PM)
            duration: 30 + (i % 4) * 15,                      // Duration between 30 to 75 minutes
            practice: `Clinic ${i % 3 + 1}`,                  // Assign to one of three clinics
            price: 150 + (i % 5) * 50,                        // Vary price (150, 200, 250, etc.)
            status: Math.floor(Math.random() * 4) + 1,                         // Set status to 'Scheduled'
            isDone: false                                     // Default to not completed
        };

        appointments.push(appointment);
    }

    return appointments;
}

export const generateMockOrders = (patients: Patient[], count: number): Order[] => {
    const orders: Order[] = [];

    for (let i = 0; i < count; i++) {
        const patient = patients[i % patients.length]; // Cycle through patients
        const order: Order = {
            order_id: i + 1,
            order_no: 1000 + i,
            branch_id: Math.floor(Math.random() * 10) + 1, // Random branch ID between 1 and 10
            patient: patient,
            vn_number: Math.floor(Math.random() * 1000000), // Random vn_number
            total_price: Math.floor(Math.random() * 1000) + 100, // Total price between 100 and 1099
            status: Math.random() < 0.5 ? OrderStatus.NOTPAID : OrderStatus.PAID, // Randomly set status
            code_cancel: Math.random() < 0.2 ? `CANCEL${i}` : '', // 20% chance of having a cancel code
            remark_cancel: Math.random() < 0.2 ? 'Order canceled due to issue' : '', // 20% chance of having a cancel remark
        } as Order;

        orders.push(order);
    }

    return orders;
}

export const generateMockOrderPayments = (orders: Order[], count: number): OrderPayment[] => {
    const orderPayments: OrderPayment[] = [];

    for (let i = 0; i < count; i++) {
        const order = orders[i % orders.length]; // Cycle through orders

        const total_price = order.total_price; // Use total price from the related order
        const price = Math.floor(Math.random() * total_price * 0.8) + 1; // Random payment up to 80% of total price
        const balance = total_price - price; // Calculate balance
        const date = new Date();
        date.setDate(date.getDate() + i);
        const randomDays = Math.floor(Math.random() * 30);
        const orderDate = new Date(date);
        orderDate.setDate(orderDate.getDate() + randomDays);
        const orderPayment: OrderPayment = {
            create_at: orderDate,
            order_payment_id: i + 1,
            branch_id: order.branch_id, // Use the branch ID from the related order
            order: order, // Reference the related order
            payment_no: `PAY${1000 + i}`, // Payment number, e.g., PAY1000
            stage: Math.floor(Math.random() * 5), // Random stage between 0 to 4
            payment_channel_id: Math.floor(Math.random() * 5) + 1, // Random payment channel
            bank_id: Math.floor(Math.random() * 10) + 1, // Random bank ID between 1 and 10
            total_price: total_price, // Use total price from the related order
            price: price, // Randomly calculated payment amount
            balance: balance // Calculate remaining balance
        };

        orderPayments.push(orderPayment);
    }

    return orderPayments;
}


export default mockUsers;


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [User, Patient, Appointment, Order, OrderPayment],
    migrations: [],
    subscribers: [],
})
