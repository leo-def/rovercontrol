
import fs from "fs";
import { ConsoleController } from "./controllers/ConsoleController";
const filePath = process.argv[process.argv.length -1];
if(!fs.existsSync(filePath)) {
    throw new Error('File not found')
}
const data = fs.readFileSync(filePath).toString();
ConsoleController.getInstance().exec(data);
  
