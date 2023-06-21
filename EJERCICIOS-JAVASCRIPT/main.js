// NOTE: Ejercicio 1
// let name = "John Kervin";
// window.alert(name);

// NOTE: Ejercicio 2
// let sign = prompt("What's your name?");
// alert("Hi " + sign)

// NOTE: Ejercicio 3
// let undefined;
// let vNull = null;
// let string = "String";
// let number = 1;
// let boolean = false;
// let symbol = Symbol("sup");

// console.log(undefined);
// console.log(vNull);
// console.log(string);
// console.log(number);
// console.log(boolean);
// console.log(symbol.description);

// NOTE: Ejercicio 4
// arrow function

console.log(`---------------------------------------------`);
console.log(`EJERCICIO4`);
const myName = (name, surname) => {
  return `${name} ${surname}`.toUpperCase();
};

// name function
function booleanFunction(boolean) {
  console.log(`Printing boolean value: ${boolean}`);
}

// unlimited function
const unliParameters = (...element) => {
  let pos = 0;
  element.forEach((element) => {
    pos++;
    console.log(`Element ${pos}: ${element}`);
  });
};

// function calls
console.log(myName("John", "Valle"));
booleanFunction(true);
unliParameters("sup", 1, true, null, undefined);

console.log(`---------------------------------------------\n\n`);

// NOTE: Ejercicio 5
console.log(`-------------------------------------------`);
console.log(`EJERCICIO 5 - Functions`);
let num = Math.round(Math.random());

const random = (number) => {
  if (number == 0) return `Number is 0 => ${number}`;
  return `Number is 1 => ${number}`;
};

function getNumbers(num1, num2, num3) {
  return `Numbers: ${num1} - ${num2} - ${num3}`;
}

function getName(name, surname, lastname) {
  return `Name: ${name} ${surname} ${lastname}`;
}

function whoIsBigger(num1, num2) {
  return `Between the numbers ${num1} and ${num2}: \nNumber ${
    num1 > num2 ? num1 : num2
  } is bigger`;
}

console.log(random(num));
console.log(getNumbers(4, 40, 400));
console.log(getName("John Kervin", "Valle", "Cabuntasan"));
console.log(whoIsBigger(4, 40));
console.log(`---------------------------------------------\n\n`);

// NOTE: Ejercicio 6
console.log(`---------------------------------------------`);
console.log(`EJERCICIO 6 - Switch`);

let month = "8";
month = parseInt(month);

switch (month) {
  case 1:
    console.log("January");
    break;
  case 2:
    console.log("February");
    break;
  case 3:
    console.log("March");
    break;
  case 4:
    console.log("April");
    break;
  case 5:
    console.log("May");
    break;
  case 6:
    console.log("June");
    break;
  case 7:
    console.log("July");
    break;
  case 8:
    console.log("August");
    break;
  case 9:
    console.log("September");
    break;
  case 10:
    console.log("October");
    break;
  case 11:
    console.log("November");
    break;
  case 12:
    console.log("December");
    break;
  default:
    console.log("Please, put a correct month number");
    break;
}

console.log(`---------------------------------------------\n\n`);

// NOTE: Ejercicio 6
console.log(`---------------------------------------------`);
console.log(`EJERCICIO 7 - Math`);
console.log(`Getting a number between 0 and 1: ${Math.round(Math.random())}`);
console.log(`Getting a number to round PI number: ${Math.round(Math.PI)}`);

console.log(`---------------------------------------------\n\n`);

// NOTE: Ejercicio 6
console.log(`---------------------------------------------`);
console.log(`EJERCICIO 8 - Strings`);
function changeAforO(string) {
  return string.toUpperCase().replaceAll("A", "O");
}

function startsWithAca(string) {
  return string.toLowerCase().startsWith("aca")
    ? `'${string}' does start with 'aca'`
    : `'${string}' doesn't start with 'aca'`;
}

function salute(string) {
  return string.repeat(3);
}

console.log(changeAforO("javascript"));
console.log(startsWithAca("academia"));
console.log(startsWithAca("escuela"));
console.log(salute("Hola"));

console.log(`---------------------------------------------\n\n`);

// NOTE: Ejercicio 6
console.log(`---------------------------------------------`);
console.log(`EJERCICIO 10 - Loops`);
let pos = 0;
let exit = true;
let posConsole = 1;

while (exit) {
  pos++;
  console.log(`${posConsole} WHILE: I <3 Code`);
  posConsole++;
  exit = pos < 10 ? true : false;
}
console.log(`\n`);
posConsole = 1;
for (let pos = 0; pos < 10; pos++) {
  console.log(`${posConsole++} FOR: I <3 Code`);
}
console.log(`---------------------------------------------\n\n`);

console.log(`---------------------------------------------`);
console.log(`EJERCICIO 11 - Arrays`);
let array = ["a", "b", "c", "d", "e"];
array.forEach((element) => {
  console.log(element);
});

console.log(`\n`);

let number = 5;
while (number > 0) {
  number--;
  console.log(number);
}

console.log(`\n`);

console.log(`Cuántas iteraciones da?`);
console.log(`Dara unas 5 veces, hasta que número sea mas pequeño `);
console.log(`Cuando entrará en el if`);
console.log(`Únicamente la primera vez el resto`);
console.log(`Y en el else?`);
console.log(`Después de haber hecho el primer if`);

console.log(`\n`);

const arr1 = ["🍔", "🌯", "🍣", "🍕", "🍜", "🍱", "🍙", "🍘", "🥩"];
arr1.fill("🍺", arr1.indexOf("🍕"), arr1.length);
console.log(`Array 1: ${arr1}`);

const arr2 = ["🍕", "🍕", "🍍", "🍕", "🍕"];
console.log(
  arr2.includes("🍍") ? `Array 2: Yes, it does` : `Array 2 : No, it doesn't`
);
arr2.splice(arr2.indexOf("🍍"), 1);
console.log(`Array 2 (without pineapple): ${arr2}`);

const arr3 = ["🍓", "🍋", "🍓", "🍋", "🍓"];
arr3.forEach((element) => {
  if (element === "🍓") arr3.splice(arr3.indexOf(element), 1, "🍄");
});
console.log(arr3);

// TODO: ejercicios
const arr4 = ["🌶", "🥛", "🌶", "🥛", "🌶", "🥛"];
let pointer = 0;
// arr4.forEach((element) => {
//   if (element == "🌶") {
//     let destination = pointer + 1;
//     arr4.splice(destination, 0, "🥵");
//     console.log(destination);
//   }
//   pointer++;
// });
console.log(arr4.indexOf(🌶"))
const arr5 = ["🎴", "🎴", "🎴", "🃏", "🎴", "🎴", "🎴"];
