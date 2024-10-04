import mockUsers, { AppDataSource, generateMockAppointments, generateMockOrderPayments, generateMockOrders, generateSamplePatients } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import { Patient } from "./entity/Patient";
import { User } from "./entity/User";
import { Appointment } from "./entity/Appointments";
import { Order, OrderStatus } from "./entity/Orders";
import { OrderPayment, PaymentChannel } from "./entity/Order_payment";
import { LessThan, MoreThan } from "typeorm";

AppDataSource.initialize()
  .then(async () => {
    const isPatientinitialize = await AppDataSource.getRepository(Patient).find()
    if (!isPatientinitialize.length) {
      const patients = generateSamplePatients(10);
      const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patients).execute()
      console.log("insert patients : ", patients)
    }
    const isUserinitialize = await AppDataSource.getRepository(User).find()
    if (!isUserinitialize.length) {
      const users = await AppDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values(mockUsers).execute()
      console.log("insert user : ", users)
    }
    const isAppointmentinitialize = await AppDataSource.getRepository(Appointment).find()
    if (!isAppointmentinitialize.length) {
      const doctor = await AppDataSource.getRepository(User).find()
      const patientsData = await AppDataSource.getRepository(Patient).find()
      const appointments = generateMockAppointments(patientsData, doctor, 10)
      const insertAppointments = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Appointment)
        .values(appointments).execute()

      console.log("insert appointment : ", insertAppointments)
    }
    const isOrderinitialize = await AppDataSource.getRepository(Order).find()
    if (!isOrderinitialize.length) {
      const patientsData = await AppDataSource.getRepository(Patient).find()
      const orders = generateMockOrders(patientsData, 30)
      const insertOrders = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Order)
        .values(orders).execute()
      console.log("insert orders : ", insertOrders)

      const initializeOrder = await AppDataSource.getRepository(Order).find()
      const ordersPayment = generateMockOrderPayments(initializeOrder, 50)
      const insertOrdersPayment = await AppDataSource.createQueryBuilder()
        .insert()
        .into(OrderPayment)
        .values(ordersPayment).execute()
      console.log("insert orders payment : ", insertOrdersPayment)
    }
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const app = express();
app.use(express.json())
const port = 8080;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get("/testone", (req: Request, res: Response) => {
  let result = "<p>"
  let width = 20
  let start = (width / 2) + 10
  let star = 1
  for (let i = 0; i < 10; i++) {
    let count = star
    for (let j = 0; j <= width; j++) {
      if (j >= start && count != 0) {
        result += "*"
        count--
      } else {
        result += "&nbsp;"
      }
    }
    star += 2
    start -= 2
    result += "<br/>"
  }
  result += "</p>"
  res.send(result)
})

app.get("/testtwo", (req: Request, res: Response) => {
  let arr = [1, 5, 7, 4, 3, 2, 1, 5, 9, 0, 4, 2, 4, 5, 7, 2]
  let removeDuplicateArr = arr.filter((item: number, index: number) => arr.indexOf(item) === index);
  let sortArray = removeDuplicateArr.sort((a: number, b: number) => a - b)
  res.send(`input: [${arr}]<br />result:[${sortArray}]`)
})

app.get("/testthree", (req: Request, res: Response) => {
  let result = "<p>"
  let width = 25
  let stop = 23;
  for (let i = 0; i < 23; i++) {
    for (let k = 0; k < 3; k++) {
      for (let j = 0; j <= width; j++) {
        if (j >= stop && j < stop + 2) {
          result += "&nbsp;"
        } else if (k == 2 && j >= stop + 2) {
          continue
        } else {
          result += "*"
        }
      }
      result += "&nbsp;&nbsp;"
    }
    stop -= 1
    result += "<br/>"
  }
  result += "</p>"
  res.send(result)
})

app.get("/testfour", (req: Request, res: Response) => {
  let result = ""
  for (let i = 1; i <= 10; i++) {
    result += String(i)
    if (i != 10) {
      result += ","
    }
  }
  res.send(`result : ${result}`)
})

app.get("/patients", async (req: Request, res: Response) => {
  var result = await AppDataSource.getRepository(Patient).find()
  res.send(result)
})

app.get("/appointments/", async (req: Request, res: Response) => {
  const query = req.query
  console.log(req.query)
  try {
    var result = await AppDataSource.getRepository(Appointment).find({ where: query })
    if (!result) {
      res.status(500)
      res.send("Wrong Query Parameter")
    }
    res.send(result)
  } catch (error) {
    res.status(500).json(error) 
  }
})

app.get("/dailysales", async (req: Request, res: Response) => {

  const result = []
  const today = new Date().toLocaleString('en-TH', { timeZone: 'Asia/Bangkok' });
  const Yesterday = new Date(today)
  Yesterday.setDate(Yesterday.getDate())
  Yesterday.setHours(0, 0, 0, 0)
  const Tomorrow = new Date(today)
  Tomorrow.setDate(Tomorrow.getDate() + 1)
  Tomorrow.setHours(0, 0, 0, 0)
  const patients = await AppDataSource.getRepository(Patient).find({
    relations: {
      order: true
    },
  })
  for (let patient of patients) {
    for (let order of patient.order) {
      const orderPayment = await AppDataSource.getRepository(OrderPayment).find({
        relations: {
          order: true
        },
        where: {
          create_at: MoreThan(Yesterday) && LessThan(Tomorrow),
          order: { order_id: order.order_id }
        }
      })
      for (var orderPaid of orderPayment) {
        const saleOrder =
        {
          "date_time": order.create_at,           // a. วันที่- เวลา
          "item_code": order.order_no,                       // b. รหัสรายการสินค้า
          "payment_code": orderPaid.order_payment_id,                       // c. รหัสใบชำระเงิน
          "patient_name": `${patient.firstname} ${patient.lastname}`,                      // d. ชื่อ-สกุลผู้ป่วย
          "patient_id": patient.patient_id,                          // e. เลขประจำตัวผู้ป่วย
          "age": patient.date_of_birth,                                       // f. อายุ
          "payment_status": order.status,                        // g. สถานะชำระเงิน
          "total_price": order.total_price,                       // h. ราคาทั้งหมด
          "cash": orderPaid.payment_channel_id === PaymentChannel.CASH ? orderPaid.price : 0,                                  // i. เงินสด
          "transfer": orderPaid.payment_channel_id === PaymentChannel.TRANSFER_APP ? orderPaid.price : 0,                             // j. โอน
          "transfer_bank": orderPaid.payment_channel_id === PaymentChannel.TRANSFER_BANK ? orderPaid.price : 0,                       // k. โอน-ธนาคาร
          "credit_card": orderPaid.payment_channel_id === PaymentChannel.CREDIT ? orderPaid.price : 0,                           // l. บัตรเครดิต
          "check": orderPaid.payment_channel_id === PaymentChannel.CHECK ? orderPaid.price : 0,                                  // m. เช็ค
          "net_payment": orderPaid.total_price                       // n. ยอดชำระสุทธิ
        }
        result.push(saleOrder)
      }
    }
  }
  res.send(result)
})

app.get("/unpaid", async (req: Request, res: Response) => {
  const result = []
  const patients = await AppDataSource.getRepository(Patient).find({
    relations: {
      order: true
    },
    where: {
      order: {
        status: OrderStatus.NOTPAID,
      }
    }
  })
  for (let patient of patients){
    for (let order of patient.order) {
        const unpaidPayment = await AppDataSource.getRepository(OrderPayment).find({
          relations: {
            order : true
          },
          where : {
            order: {order_id: order.order_id}
          }
        })
        for (let unpaid of unpaidPayment) {
          const unpaidData = {
            "patient_name": `${patient.firstname} ${patient.lastname}`,                     // a. ชื่อ-สกุลผู้ป่วย
            "patient_id": patient.patient_id,                         // b. เลขประจำตัวผู้ป่วย
            "item_code": order.order_id,                       // c. รหัสรายการสินค้า
            "payment_code": unpaid.payment_no,                      // d. รหัสใบชำระเงิน
            "total_price": order.total_price,                          // e. ราคาทั้งหมด
            "outstanding_balance": unpaid.balance,                  // f. ยอดค้างคงเหลือ
            "last_payment_date": unpaid.create_at    // g. ชำระล่าสุดเมื่อ
          }
          result.push(unpaidData)
        }
      }
    }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Knacxtest http://localhost:${port}`);
});
