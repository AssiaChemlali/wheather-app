import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import humidity from'./assets/humidity.png'
import wind from'./assets/wind.png'
import search from'./assets/search.png'
import cloud from './assets/cloud.png'
import drizzle from './assets/drizzle.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'

function App() {
  const [location, setLocation] = useState("London")
  const[wheather,setWheather]=useState({})
  const API_KEY="3f0eea7b9acdf637a4b87e9ada5a0dfa"

 

  async function getData(){
    const API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3f0eea7b9acdf637a4b87e9ada5a0dfa`
    const response=await fetch(API_URL)
    const data=await response.json()

    let status=""
    if(data.weather[0].icon ==="02d"|| data.weather[0].icon==="02n"){
       status=cloud
    }else if(data.weather[0].icon ==="03d"|| data.weather[0].icon==="03n"){
      status=drizzle
    }
    else if(data.weather[0].icon ==="04d"|| data.weather[0].icon==="04n"){
      status=rain
    }


    setWheather(oldWheather=>{
      return{
        ...oldWheather,
        name:data.name,
        temp:data.main.temp,
        humidity:data.main.humidity,
        wind:data.wind.speed,
       image:status
      }
    })

  }
  useEffect(()=>{
    getData()
  },[])

  function handleSumbit(e){
    e.preventDefault()
    getData()

  }

  function handleChnage(value){
    setLocation(value)
  }

  return (
    <div className='wheather__app'>
        <form onSubmit={handleSumbit} className='wheather__form'>
          <input type="text" name="location" id="location" placeholder='New York' 
          onChange={(e)=>handleChnage(e.target.value)}/>
          <button className='btn-search'>
            <img src={search} alt="" />
            </button>
        </form>

        <div className="wheather__content">
          <img src={wheather.image} alt="" className='img-whether'/>
          <h1>{wheather.temp} °C</h1>
          <h2>{wheather.name}</h2>
          <div className='wheather__content-detail'>
            <div className="humidity flex__center">
              <img src={humidity} alt="" />
              <div>
                <h3>{wheather.humidity}%</h3>
                <p>humidity</p>
              </div>
            </div>

            <div className="wind flex__center">
              <img src={wind} alt="" />
              <div>
                <h3>{wheather.wind} km/h</h3>
                <p>wind speed</p>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default App
