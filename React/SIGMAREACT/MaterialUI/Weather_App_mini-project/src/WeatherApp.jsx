
import InfoBox from './InfoBox.jsx';
import SearchBox from './SearchBox.jsx';
import { useState } from 'react';


export default function WeatherApp() {

    const [weatherInfo, setWeatherInfo] = useState(
        {

            city: "Delhi",
            country: "IN",
            humidity: 88,
            pressure: 1016,
            temperature: 15.05,
            weatherType: "Rain",
            windSpeed: 4.37




            
        }
    );


    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }


    return (
        <div style={{ textAlign: "center" }}>
            <h2>Weather App </h2>
            <SearchBox  updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo} />


        </div>
    );
}   