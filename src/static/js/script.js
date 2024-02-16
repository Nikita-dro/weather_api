let data = [];
let selectedDayIndex = 0;

async function fetchData(){
    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Dnipro?unitGroup=metric&key=PPFC9J4MASSRFC6H2VMJDDS9X&contentType=json&lang=uk"
    let response = await fetch(url);
    data = await response.json();
    processData(data);
}

function processData(data){
    let numberDays = data.days.length;
    let iconDir = "static/img/4th Set - Color/";
    let html = '<div class="row" style="margin-left: 3px;">';
    for (let i = 0; i < numberDays; i++) {
        html += '<div class="col-md-auto mb-3">';
        html += '<div class="card" id="day-' + i + '" style="width: 6rem;" onclick="updateWeatherDetails(' + i + ')">';
        html += '<img src="' + iconDir + data.days[i].icon + '.svg" class="card-img-top" alt="Фото категорії" style="width: 100%; height: 50px; object-fit: cover; margin-bottom: 5px;">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title" style="font-weight: bold; font-size: 1rem; text-align: center;">' + data.days[i].datetime.slice(5, 10) + '</h5>';
        html += '<div class="temperature" style="font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center; width: 100%;">';
        html += '<div class="min" style="display: flex; flex-direction: column; align-items: center; margin-left: -10px;">мін. <span>' + data.days[i].tempmin + '°</span></div>';
        html += '<div class="max" style="display: flex; flex-direction: column; align-items: center; margin-left: 10px; margin-right: 10px;">макс. <span>' + data.days[i].tempmax + '°</span></div>';
        html += '</div>';
        html += '</div></div></div>';
    }
    html += '</div>';
    document.getElementById("result").innerHTML = html;

    updateWeatherDetails(selectedDayIndex);
}

function updateWeatherDetails(dayIndex) {

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('selected');
    });

    let selectedCard = document.getElementById('day-' + dayIndex);
    selectedCard.classList.add('selected');

    selectedDayIndex = dayIndex;
    let selectedDay = data.days[dayIndex];
    let detailsHtml = '<table id="weatherTable">';
    detailsHtml += '<tr>';
    detailsHtml += '<th>Час</th>';
    detailsHtml += '<th>Температура</th>';
    detailsHtml += '<th>Відчувається як</th>';
    detailsHtml += '<th>Тиск</th>';
    detailsHtml += '<th>Вологість, %</th>';
    detailsHtml += '<th>Швидкість вітру</th>';
    detailsHtml += '</tr>';

    for (let hour of selectedDay.hours) {
        detailsHtml += '<tr>';
        detailsHtml += '<td>' + hour.datetime + '</td>';
        detailsHtml += '<td>' + hour.temp + '°</td>';
        detailsHtml += '<td>' + hour.feelslike + '°</td>';
        detailsHtml += '<td>' + hour.pressure + '</td>';
        detailsHtml += '<td>' + hour.humidity + '</td>';
        detailsHtml += '<td>' + hour.windspeed + '</td>';
        detailsHtml += '</tr>';
    }
    detailsHtml += '</table>';
    document.getElementById("weatherDetails").innerHTML = detailsHtml;
}

document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});