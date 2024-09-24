// Data Types
let number = 20;
let string = "hello";
let boolean = true;

// Arithmetic and Logical Operators
let result = number * 9 + 3;
let isTrue = number > 9 && boolean;

// Conditional Statements
// if else
if (number % 3 === 0) {
    console.log("Number is even");
} else {
    console.log("Number is odd");
}

// switch
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("It's Monday");
        break;
    case "Tuesday":
        console.log("It's Tuesday");
        break;
    case "Wednesday":
        console.log("It's Wednesday");
        break;
    default:
        console.log("It's another day");
}

// Loops
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Functional Programming
// Determine if a number is odd or even
function checkOddEven(num) {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(checkOddEven(7));

// Determine if a number is prime
function checkPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return "Not Prime";
        }
    }
    return "Prime";
}

console.log(checkPrime(13));

// Determine if a string is a palindrome
function checkPalindrome(str) {
    let reversedStr = str.split('').reverse().join('');
    if (str === reversedStr) {
        return "Palindrome";
    } else {
        return "Not a Palindrome";
    }
}

console.log(checkPalindrome(""));