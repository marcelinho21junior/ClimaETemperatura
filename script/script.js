const card = document.querySelector('.card'),
card1 = card.querySelector('.card1'),
cardtext = card1.querySelector(".Card1DigiteNome"),
cardinput = card1.querySelector('.Card1InputDigiteNome')
card1Button = card1.querySelector(".card1Button")

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${`48e2b78c34f243619dcbfe87d8e567aa`}`
    fetchData();
}

function onError(error){
    cardtext.innerText = error.message;
    cardtext.classList.add("Card1DigiteNomeError")
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`48e2b78c34f243619dcbfe87d8e567aa`}`;
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
        cardtext.classList.remove("Card1DigiteNomePendente","Card1DigiteNomeError");
        card.classList.add("active")
        console.log(info)
    }
}