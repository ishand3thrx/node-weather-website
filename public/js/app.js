
console.log('client side js is loaded')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = 'Loading....'
    msgTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                msgTwo.textContent = ''
            }else{
                console.log(data)
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
            
        })
    })
})