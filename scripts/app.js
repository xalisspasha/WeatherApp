const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");



const updateUi = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // Destructring properties
    const {
        cityDets,
        weather
    } = data;

    // update details template
    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
                <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            </div>`;

    //  remove class d-none to display
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    }

    // ternary operator (if/else)
    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";


    // update src of image time
    time.setAttribute("src", timeSrc)

    // update icon
    icon.setAttribute("src", `img/icons/${weather.WeatherIcon}.svg`)


}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // if key and value same thing we can use object shorthand just write one of them !
    return {
        cityDets,
        weather
    }

}

cityForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset()


    updateCity(city).then(data => updateUi(data)).catch(err => console.log(err))

    localStorage.setItem('city', city);

})

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUi(data))
        .catch(err => console.log(err))
}
