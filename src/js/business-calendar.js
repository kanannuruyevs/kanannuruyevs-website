//
const arrowLeft = document.getElementById('arrowLeftButton');
const arrowRight = document.getElementById('arrowRightButton');
const juneCalendar = document.querySelector('.JuneMonth');
const julyCalendar = document.querySelector('.JulyMonth');

arrowLeft.addEventListener("click", () => {
  if (julyCalendar.style.display !== "none") {
    julyCalendar.style.display = "none";
    juneCalendar.style.display = "table";
  }
});

arrowRight.addEventListener("click", () => {
  if (juneCalendar.style.display !== "none") {
    juneCalendar.style.display = "none";
    julyCalendar.style.display = "table";
  }
});

//
const juneCells = document.querySelectorAll('.JuneMonth .activated');
let juneValue = 10000;
let juneSum = 10000;
juneCells.forEach((document, i) => {
    juneCalendar.style.backgroundImage = 'url("/media/business-calendar-project/business-calendar-june.jpg")';
    document.querySelector('.day').textContent = i + 1;
    document.querySelector('.title').textContent = '$' + juneValue.toLocaleString();
    document.querySelector('.growing-number').textContent = '$' + juneSum.toLocaleString();
    juneSum += 10000;
});

const julyCells = document.querySelectorAll('.JulyMonth .activated');
let julyValue = 0.01;
let julySum = 0;
julyCells.forEach((document, i) => {
    julyCalendar.style.backgroundImage = 'url("/media/business-calendar-project/business-calendar-july.jpg")';
    julySum += julyValue;
    document.querySelector('.day').textContent = i + 1;
    document.querySelector('.title').textContent = julyValue > 1000 ? '$' + parseInt(julyValue).toLocaleString() : '$' + julyValue.toFixed(2);
    document.querySelector('.growing-number').textContent = julySum > 1000 ? '$' + parseInt(julySum).toLocaleString() : '$' + julySum.toFixed(2);
    julyValue *= 2;
});
