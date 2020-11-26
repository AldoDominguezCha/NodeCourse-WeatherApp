console.log('Fetching the weather for the location provided')

const weatherForm = document.getElementById('weather')
const searchPlace = document.getElementById('searchPlace')
const displayResults = document.getElementById('display')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    place = searchPlace.value

    displayResults.style.fontSize = '26px'
    displayResults.style.marginTop = '40px'
    displayResults.style.paddingRight = '0'
    displayResults.textContent = 'Loading...'

    fetch(`/weather?address=${place}`).then((response) => {
        response.json().then(({error, searchedPlace, locationFound, forecast}) => {
            if(error){
                displayResults.style.fontSize = '26px'
                displayResults.style.marginTop = '40px'
                displayResults.style.paddingRight = '0'
                displayResults.textContent = error
            } 
            else{
                displayResults.style.fontSize = '23px'
                displayResults.style.marginTop = '85px'
                displayResults.style.paddingRight = '170px'
                displayResults.innerHTML = `You looked for: ${searchedPlace} <br> 
                                            Location found: ${locationFound} <br>
                                            Weather: ${forecast}`
             } 
        })
    })

})