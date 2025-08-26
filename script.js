const formget = document.querySelector("#form");
const name1 = document.querySelector("#username");
const num1 = document.querySelector("#num");
const email1 = document.querySelector("#email");
const message1 = document.querySelector("#message");




// const formget = document.querySelector("#form");
// const name1 = document.querySelector("#username");
// const num1 = document.querySelector("#num");
// const email1 = document.querySelector("#email");
// const message1 = document.querySelector("#message");

// formget.addEventListener('submit', (e) => {
//     e.preventDefault();

//     validateInputs();

//     const formData = {
//         name: name1.value.trim(),
//         number: num1.value.trim(),
//         email: email1.value.trim(),
//         message: message1.value.trim()
//     };

//     console.log("Form Data:", formData);
// });


// function validateInputs() {
//     const name2 = name1.value.trim();
//     const num2 = num1.value.trim();
//     const email2 = email1.value.trim();
//     const message2 = message1.value.trim();

//     if (name2 === '') {
//         setError(name1, "*Required");
//     } else {
//         setSuccess(name1);
//     }

//     if (num2 === '') {
//         setError(num1, "*Required");
//     } else {
//         setSuccess(num1);
//     }

//     if (email2 === "") {
//         setError(email1, "*Required");
//     } else if (!validateEmail(email2)) {
//         setError(email1, "*Provide a valid email");
//     } else {
//         setSuccess(email1);
//     }

//     if (message2 === "") {
//         setError(message1, "*Required");
//     } else {
//         setSuccess(message1);
//     }
// }

// function setError(element, message) {
//     const inputvalue = element.parentElement;
//     const errorElement = inputvalue.querySelector(".error");

//     errorElement.innerText = message;
//     inputvalue.classList.add('error');
//     inputvalue.classList.remove('success');
// }

// function setSuccess(element) {
//     const inputvalue = element.parentElement;
//     const errorElement = inputvalue.querySelector(".error");

//     errorElement.innerText = '';
//     inputvalue.classList.add('success');
//     inputvalue.classList.remove('error');
// }

// const validateEmail = (email) => {
//     return String(email)
//         .toLowerCase()
//         .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
// }