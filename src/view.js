import Logo from "./img/logo.png";
const DAYS = [
  "Sunday",
  "Monsday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const divAddress = document.querySelector("#address");
const divTemp = document.querySelector("#temp");
const divIcon = document.querySelector("#icon");
const ulHours = document.querySelector(".hours ul");
const divSunrise = document.querySelector("#sunrise");
const divSunset = document.querySelector("#sunset");
const divRainchance = document.querySelector("#rainchance");
const divHumidity = document.querySelector("#humidity");
const divWind = document.querySelector("#wind");
const divFeels = document.querySelector("#feels");
const divPressure = document.querySelector("#pressure");
const divUvindex = document.querySelector("#uvindex");
const divPrecipitation = document.querySelector("#precipitation");
const divVisibility = document.querySelector("#visibility");
const divNextWeek = document.querySelector(".next-week");
const imgLogo = document.querySelector("#logo");
const btnSearch = document.querySelector("#search-btn");
const inputSearch = document.querySelector("#search-input");
imgLogo.src = Logo;

export default class {
  bindSearchHandler(func) {
    btnSearch.addEventListener("click", () => {
      let key = inputSearch.value;
      func(key).then(this.displayWeather.bind(this));
    });
  }
  displayWeather(data) {
    this.showCurrentCondition(data);
    this.showHoursCondition(data);
    this.showNextWeek(data);
  }
  showCurrentCondition(data) {
    divAddress.textContent = data.address;
    divTemp.textContent = data.currentConditions.temp;
    divIcon.textContent = data.currentConditions.conditions;

    divSunrise.textContent = data.currentConditions.sunrise;
    divSunset.textContent = data.currentConditions.sunset;
    divHumidity.textContent = data.currentConditions.humidity;
    divRainchance.textContent = data.currentConditions.dew;
    divFeels.textContent = data.currentConditions.feelslike;
    divPressure.textContent = data.currentConditions.pressure;
    divUvindex.textContent = data.currentConditions.uvindex;
    divVisibility.textContent = data.currentConditions.visibility;
    divPrecipitation.textContent = data.currentConditions.precip;
    divWind.textContent = data.currentConditions.windspeed;
  }
  createHoursHtml(hour) {
    return `<li>
                  <div class="hour">${hour.hour}</div>
                  <div class="humidity">${hour.humidity}%</div>
                  <div class="condition">${hour.conditions.split(",")[0]}</div>
                  <div class="temp">${hour.temp}°</div>
            </li>
            `;
  }
  showHoursCondition(data) {
    const hoursToday = data.days[0].hours;
    const hoursTomorrow = data.days[1].hours;
    const thisHour = parseInt(data.currentConditions.datetime.split(":")[0]);
    const hours = [
      ...hoursToday.slice(thisHour),
      ...hoursTomorrow.slice(0, thisHour),
    ];
    hours.forEach((value, index) =>
      index === 0
        ? (hours[index].hour = "Now")
        : (hours[index].hour = value.datetime.split(":")[0])
    );

    ulHours.innerHTML = hours.map((hr) => this.createHoursHtml(hr)).join("");
  }
  showNextWeek(data) {
    const daysCondition = data.days.slice(1, 8);
    divNextWeek.innerHTML = [
      "Day",
      "",
      "CHANCE OF RAIN",
      "HUMIDITY",
      "TEMPERATURE",
    ]
      .map((e) => `<div>${e}</div>`)
      .join("");
    daysCondition.forEach((day) => {
      divNextWeek.innerHTML += [
        DAYS[new Date(day.datetime).getDay()],
        "pic",
        day.dew,
        day.humidity,
        `${day.tempmin} ${day.tempmax}`,
      ]
        .map((e) => `<div>${e}</div>`)
        .join("");
    });
  }
}
