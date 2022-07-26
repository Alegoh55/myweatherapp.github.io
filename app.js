//load para cargar todos los recursos//
window.addEventListener ('load', ()=> {
    //referenciar al DOM y guardarlo en variables//
    let lon
    let lat
    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperaturadescripcion')
    let ubicacion = document.getElementById('ubication')
    let iconoAnimado = document.getElementById('icono-animado')
    let vientoVelocidad = document.getElementById ('viento-velocidad')

    if (navigator.geolocation){
        

        navigator.geolocation.getCurrentPosition (posicion =>{
            let lon = posicion.coords.longitude
            let lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d035f538177b51351f411937198de680`
            //peticiones a la API//
            fetch (url)
            .then (response =>{return response.json(); })
            .then (data =>{
        
                let temp = Math.round(data.main.temp - 273)
                //pasamos al elemento de id temperatura-valor los datos de temp//
                temperaturaValor.textContent = `${temp} °C`
        
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                
                let ciudad = data.name
                ubicacion.textContent = data.name
                let windSpeed = data.wind.speed
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
                
                //iconos animados//
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
    


            })
            .catch(error =>{
                console.log(error)
            })
        })
    }
})
