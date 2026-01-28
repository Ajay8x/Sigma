import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState , useEffect} from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';







export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("mirzapur");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;



    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
            let jsonResponse = await response.json();
            let result = {
                temperature: jsonResponse.list[0].main.temp,
                humidity: jsonResponse.list[0].main.humidity,
                weatherType: jsonResponse.list[0].weather[0].main,
                city: jsonResponse.city.name,
                country: jsonResponse.city.country,
                windSpeed: jsonResponse.list[0].wind.speed,
                pressure: jsonResponse.list[0].main.pressure
            }
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };



//AUTO SEARCH FOR A DEFAULT CITY ON COMPONENT MOUNT




useEffect(() => {
  if (city) {
    (async () => {
      try {
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
      } catch (err) {
        setError(true);
      }
    })();
  }
}, []);







    return (
        <div className="search-box">

     


            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type='submit'>Search</Button>
               
 
<Snackbar
  open={error}
  autoHideDuration={5000}
  onClose={() => setError(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert severity="error">
    Could not fetch weather data.
  </Alert>
</Snackbar>


            </form>
        </div>
    );
}
