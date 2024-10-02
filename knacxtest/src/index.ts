import { AppDataSource, generateSamplePatients } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import { Patient } from "./entity/Patient";

AppDataSource.initialize()
  .then(async () => {
    const patients = generateSamplePatients(10);
    const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patients).execute()
    console.log(result)
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
    console.log(start, star)
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

app.listen(port, () => {
  console.log(`Knacxtest http://localhost:${port}`);
});
