import React, { useState, useEffect } from 'react'
import "./style.css";
import Weathercard from './weathercard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("delhi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherData = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=de535522293ed363c632670e1f5ebc5a`;

            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherData();
    },[]);


    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    />

                    <button className='searchButton'
                        type='button'
                        onClick={getWeatherData}>
                        search
                    </button>
                </div>
            </div>

            {/* weather card */}
            <Weathercard tempInfo={tempInfo} />

        </>
    )
}

export default Temp