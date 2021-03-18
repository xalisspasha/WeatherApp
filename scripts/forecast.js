//api key
const key = '3vn0WtElyOhsvbkFgU8Guzz3BPtee6sG'

// get weather infromation
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query)
    const data = await response.json()

    return data[0]

}

// get city information
const getCity = async (city) => {

    // base for city search
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`

    // fetch data
    const response = await fetch(base + query)
    // change data to json
    const data = await response.json();
    // return first data
    return data[0]

}

// call async function

// getCity("london")
//     .then(data => {
//         return getWeather(data.Key)
//     }).then(data => {
//         console.log(data)
//     })
//     .catch(err => console.log(err))