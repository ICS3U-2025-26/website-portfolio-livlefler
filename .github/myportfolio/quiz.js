let score = 0;

alert("Welcome to the JavaScript Quiz!");

let q1 = confirm("The Earth revolves around the Sun.");
if (q1 === true) {
  alert("Correct!");
  score++;
} else {
  alert("Nope! The Earth does revolve around the Sun.");
}

let q2 = confirm("JavaScript and Java are the same thing.");
if (q2 === false) {
  alert("Correct! They are completely different languages.");
  score++;
} else {
  alert("Nope! JavaScript and Java are not the same.");
}

let q3 = prompt("What is 5 + 3?");
if (q3 === "8") {
  alert("Correct!");
  score++;
} else {
  alert("Incorrect. The answer is 8.");
}

let q4 = prompt("What is Toronto's Major League Baseball team named?");
if (q4.toLowerCase() === "blue jays") {
  alert("Correct!");
  score++;
} else {
  alert("Nope! The correct answer is Blue Jays.");
}

let q5 = prompt("What is the capital city of Canada");
if (q5.toLowerCase() === "ottawa") {
  alert("Correct!");
  score++;
} else {
  alert("Incorrect. The answer is Ottawa.");
}

alert(`Quiz complete! You got ${score}/5 correct.`);
console.log(`Player scored ${score}/5.`);