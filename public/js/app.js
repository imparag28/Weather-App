const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


msg1.textContent = 'WetherInformation'
weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?add=' + location)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {

                    msg1.textContent = data.location
                    msg2.textContent = data.temprature
                    document.getElementById("myImg").src = data.icon

                }
            })
        })

})