const weatherForm = document.querySelector('form')
console.log(weatherForm)
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')


msg1.textContent = 'WetherInformation'
weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent= ''
    e.preventDefault()
    const location = search.value
    fetch('/weather?add=' + location)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    msg1.textContent = 'Location:- ' + data.location
                    msg2.textContent = 'temperature :-' + data.temprature
                    document.getElementById("myImg").src = data.icon
                    msg3.textContent ='Today is ' +data.forecast



                }
            })
        })

})