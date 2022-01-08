const card = document.querySelector('.card'),
card1 = card.querySelector('.card1'),
cardtext = card1.querySelector(".Card1DigiteNome"),
cardinput = card1.querySelector('.Card1InputDigiteNome')
card1Button = card1.querySelector(".card1Button")
wicon = document.querySelector(".Card2img img")

var api;

cardinput.addEventListener('keyup', e =>{
    if(e.key = "Enter" && cardinput.value != ""){
        requestApi(cardinput.value)
    }
});

card1Button.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert('seu navegador não suporta API de geolocalização')
    }
});

function onSuccess(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${`48e2b78c34f243619dcbfe87d8e567aa`}`
    fetchData();
}

function onError(error){

    cardtext.innerText = error.message;
    cardtext.classList.add("Card1DigiteNomeError")
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${`48e2b78c34f243619dcbfe87d8e567aa`}`;
    fetchData();
}

function fetchData(){
    cardtext.innerText = "obtendo detalhes do clima...!"
    cardtext.classList.add("Card1DigiteNomePendente")
    fetch(api).then(response => response.json().then(result => weatherDetails(result))); 
}

function weatherDetails(info){
    cardtext.classList.replace("Card1DigiteNomePendente","Card1DigiteNomeError");
    if(info.cod == "404"){
        cardtext.innerText = `${cardinput.value} não é um nome de cidade válido`
    }else{
        //propriedades e valores vindo de cada objeto da api
        const city = info.name;
        const country = info.sys.country;
        const{description,id} = info.weather[0];
        const{feels_like,humidity,temp} = info.main

        if(id == 800){
            wicon.src = "../img/ensolarado.JPG";
        }else if(id >= 200 && id <= 232){//trovoada
            wicon.src = "../img/trovoada.JPG";
        }else if(id >= 600 && id <= 622){//neve
            wicon.src = "../img/frio.jpg";
        }else if(id >= 701 && id <= 781){//atmosfera
            wicon.src = "../img/neblina.JPG";
        }else if(id >= 800 && id <= 804){//tempo aberto
            wicon.src = "../img/ensolarado.JPG";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){//garoa e chuva
            wicon.src = "../img/chuvoso.JPG";
        }

        //passar os valores particulares para cada elemento da api para o sistema
        card.querySelector('.temp .temperatura').innerText = Math.floor(temp);
        card.querySelector('.clima').innerText = description;
        card.querySelector('.localizacao span').innerText = `${city}, ${country}`;
        card.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
        card.querySelector('.details span').innerText = `${humidity}%`;

        cardtext.classList.remove("Card1DigiteNomePendente","Card1DigiteNomeError");
        card.classList.add("active")
        console.log(info)
    }
}