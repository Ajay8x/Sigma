import './InfoBox.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




export default function InfoBox(info) {


    const INIT_URL = "https://images.unsplash.com/photo-1722858343990-1604f540c15d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const HOT_URL = "https://images.unsplash.com/photo-1593705528563-c193527ea423?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1bW1lciUyMHN1bnxlbnwwfHwwfHx8MA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ";
    const RAIN_URL = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN4bDYzMmNqd3h4YTFwY3U0eGhiZHJ3aXgyODRrenJwNjE3ZWE1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRbNFMuFt5Zm372/giphy.gif";





    let weatherInfo = info.info;

    return (
        <div className="InfoBox">
            <br />
            <div className="cardContainer">


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}


                        image={weatherInfo.temperature > 25 ? HOT_URL : weatherInfo.temperature < 15 ? COLD_URL : weatherInfo.weatherType === "Rain" ? RAIN_URL : INIT_URL}


                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {weatherInfo.city}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            <div> City: {weatherInfo.city}, {weatherInfo.country}</div>
                            <div> Temperature: {weatherInfo.temperature} °C</div>
                            <div> Humidity: {weatherInfo.humidity}%</div>
                            <div> Wind Speed: {weatherInfo.windSpeed} m/s</div>
                            <div> Pressure: {weatherInfo.pressure} hPa</div>
                            <div> Weather: {weatherInfo.weatherType}</div>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}