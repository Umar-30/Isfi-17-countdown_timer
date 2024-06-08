#! /usr/bin/env node
//import inquirer
import inquirer from "inquirer";
//import date-fns
import { differenceInSeconds } from "date-fns";
//import chalk
import chalk from "chalk";
// take input from user
let rspo = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.yellow("Please enter the amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.blue("Please enter only number");
            }
            else if (input > 60) {
                return chalk.blue("second must be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
// counter inilization
let input = rspo.userInput;
//function to create a countdown timer
function startTime(value) {
    let intTime = new Date().setSeconds(new Date().getSeconds() + value);
    let intervalTime = new Date(intTime);
    setInterval((() => {
        let currentTime = new Date();
        let timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.magentaBright("Timer has expired"));
            process.exit();
        }
        let min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        let sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
