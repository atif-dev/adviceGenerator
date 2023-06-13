// Add an event listen to new advice button.
// when it is clicked call the api and bring a new advice. render the new advice

// HTML ELEMENTS

caches.keys().then(keyList => Promise.all(keyList.map(key => caches.delete(key))));

const adviceNumber = document.getElementById('advice_num')
const advice = document.getElementById('advice')
const newAdviceGen = document.getElementById('advice_gen')

// API SETTINGS
const API_URL = 'https://api.adviceslip.com/advice'

let previousAdvice = {}

// FETCH A NEW ADVICE AND RENDER IT
newAdviceGen.addEventListener('click', fetchAdvice)

async function fetchAdvice(){
    advice.innerText = 'Loading Advice...'
    newAdviceGen.disabled = true
    const res = await fetch(API_URL);
    const data = await res.json()
    
    const adviceObj = data.slip
    if (adviceObj.id == previousAdvice.id){
        await fetchAdvice()
    } else {
        adviceNumber.innerText = `Advice # ${adviceObj.id}`
        advice.innerText = adviceObj.advice
        previousAdvice = adviceObj
        newAdviceGen.disabled = false
    }
}