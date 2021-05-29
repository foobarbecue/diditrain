const apikey = '5114ed37436b479bb6e0b58a920b9111'

const hoursAgo = (hours)=>{
  const now = new Date()
  const then = new Date(now)
  then.setHours(now.getHours() - hours)
  return then
}

const rainylat=39
const rainylon=-75
const rainytime = 1622249755

const getWeather = async (timestamp, lat, lon)=>{
  await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp.getMilliseconds()/1000}&appid=5114ed37436b479bb6e0b58a920b9111`)
    .then(res=>res.json())
    .then(res=>{console.log(res)})
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

// document.body.innerText = `It is now ${new Date()} but 1 hour ago it was ${hoursAgo(1)}`
document.body.innerText += `It is now ${new Date()} but 1 hour ago it was ${hoursAgo(1)}`
document.body.innerText += `The weather was ${getWeather(hoursAgo(1))}`
if (checkForRain){document.body.innerText += `IT RAINED`}