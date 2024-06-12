import React, { useEffect, useState } from 'react'
import Weathercard from './weatherCard'
import "./style.css"

const Temp = () => {

    const [searchValue, setSearchValue] = useState("Raipur");
    //We have passed an empty object
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=89080871cd7a94bd3b07829a9b6630b8`;

            // fetch(url) sends a network request to the specified URL.
            // await pauses the execution of the function until the fetch operation completes, allowing us to write asynchronous code in a synchronous style.
            // res (short for response) is the response object returned by the fetch call.

            const res = await fetch(url);
            const data = await res.json();

            //Object Destructuring
            const {temp, humidity, pressure} = data.main;

            // Weather is an array of object 
            //We have changed the name 'main' to 'weathermood' 
            const {main : weathermood} = data.weather[0]
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;


            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

        setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // For the first time we load the page, this function should be called 
        getWeatherInfo();
    }, [])
    // This empty array means that the useEffect hook has no dependencies. Therefore, the callback function will only run once, when the component is first mounted.


    return (
        <>
            <div className="wrap">
                <div className="search">
                    {/* Auto focus directly places on the search bar when the page refreshes */}
                    <input type="search" placeholder='Search...' autoFocus id="search" className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

                    <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

            <Weathercard temperatureInfo = {tempInfo}/>
        </>
    )
}

export default Temp
