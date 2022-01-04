const card = document.querySelector('.card'),
card1 = card.querySelector('.card1'),
cardtext = card1.querySelector(".Card1DigiteNomeError"),
cardinput = card1.querySelector('.Card1InputDigiteNome')

cardinput.addEventListener('keyup', e =>{
    if(e.key = "Enter" && cardinput.value != ""){
        requestApi(cardinput.value)
    }
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API key}`
}