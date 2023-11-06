let boton = document.querySelector(".button")
let input = document.querySelector("input")
let clima = document.querySelector(".clima")
let tiempo = document.querySelector(".temperatura p")
let imagen = document.querySelector(".temperatura img")
let body = document.querySelector("body")

let date = new Date()
let hora = date.getHours()
if(hora >= 7 && hora < 12){
    body.style.background="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('./asset/day.png')" 
}else if(hora >= 12 && hora < 16){
    body.style.background="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('./asset/day_1.png')"
}else if(hora >= 16 && hora < 19){
    body.style.background="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('./asset/day_2.png')"
}else if(hora >= 19 || hora <= 7){
    body.style.background="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('./asset/day_3.png')"
}

miAPI("la paz")
boton.addEventListener("click",function(){
    miAPI(input.value)
    input.value = ""
})

function miAPI(city){
    let date = new Date()
    let dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
    apikey = "d1c46d390ffa9ddb119cb48f60322409"
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(data => data.json())
    .then(data => {
            console.log(data)
            let temp = Math.round(data.main.temp - 273.15)
            let maximo = Math.round(data.main.temp_max - 273.15)
            let minimo = Math.round(data.main.temp_min - 273.15)

            clima.innerHTML = `
                    <h2>${temp}°c</h2>
                    <div class="max_min">
                        <h3>${maximo}°c <br> <span>MAXIMA</span></h3>
                        <h3>${minimo}°c <br> <span>MINIMA</span></h3>
                    </div>
                    <h1>${data.name}</h1>
                    <p>${dias[date.getDay()]} ${date.getHours()}:${date.getMinutes() } ${date.getHours() >= 12 ? "PM":"AM"}</p>
            `
            tiempo.textContent = data.weather[0].description
            imagen.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            let grados = document.querySelector(".clima h2")
            setTimeout(()=>{
                grados.style.fontSize="13em"
            },300)
        })
        .catch(error => {
            console.log(error.message)
            clima.innerHTML = `<h6>NO EXISTE</h6>`
        })
    }


