const apikey = 'da5fa962f528d64731c3ad0c3c90ca4e'

const hoursAgo = (hours)=>{
  const now = new Date()
  const then = new Date(now)
  then.setHours(now.getHours() - hours)
  return then
}

const getWeather = async (timestamp, lat, lon)=>{
  return await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.round(timestamp.getTime() / 1000)}&appid=${apikey}`)
    .then(res=>res.json())
}

const checkForRain = async (timestamp, lat, lon)=>{
  let it_rained = false
  weatherResp = await getWeather(timestamp, lat, lon)
  weatherResp.hourly.forEach(
    (hr)=>{
      if (hr.weather[0].main === "Rain"){
        it_rained = true
      }
    }
  )
  return it_rained
}

const checkRainAndDisplay = async (geolocation)=>{
  const rained_el = document.getElementById("rained")
  if(await checkForRain(hoursAgo(12), geolocation.coords.latitude, geolocation.coords.longitude)){
    document.getElementById("rained").innerText = 'YES'
  } else {
    document.getElementById("rained").innerText = 'NO'
  }
}

window.navigator.geolocation
  .getCurrentPosition(checkRainAndDisplay, console.log);
