const data = new Date();

const dniMiesiąca = document.querySelector(".days");

let dni = "";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const headMonth = (document.querySelector(".month").textContent =
  months[data.getMonth()]);

const fullDate = (document.querySelector(".fulldate").textContent =
  data.toDateString());

for (let i = 1; i < 31; i++) {
  dni += `<div>${i}</div>`;
}

dniMiesiąca.innerHTML = dni;
