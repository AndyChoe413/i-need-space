const searchBtn = document.querySelector('#search')
searchBtn.addEventListener('click', () => {
    //grab the input fields
    const apiInput = document.querySelector('#api-key').value
    const addressInput = document.querySelector('#address').value
    
    //encode the address 
    const address = encodeURI(addressInput)
    console.log(address)

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiInput}`
    fetch(mapBoxUrl)
        .then(raw => raw.json())
        .then(data => {
            console.log(data)

            //grab the longitude and latitude data to use for norad
            const longitude = data.features[0].center[0]
            const latitude = data.features[0].center[1]
            console.log(longitude, latitude)

            console.log(data.features[0].place_name)

            //query the norad value
            const norad = document.querySelector('#norad').value

            //adding background based on satellite id
            if (Number(norad) === 25544) {
                const content = document.querySelector('.content')
                content.style.backgroundImage = 'url(https://media.giphy.com/media/3M9B6dT7CIEzBPzdaj/giphy.gif)'
                
            }
            else if (Number(norad) === 20580) {
                const content = document.querySelector('.content')
                content.style.backgroundImage = 'url(https://media.giphy.com/media/udmBJM74oxUuA/giphy.gif)'
            }
            else {
                const content = document.querySelector('.content')
                content.style.backgroundImage = 'url(https://media.giphy.com/media/xT9IgooLQOU7thNOr6/giphy.gif)'
                
            }

            const noradUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`

            fetch(noradUrl)
                .then(rawData => rawData.json())
                .then(data => {

                    
                    
                    const culminate = data[0].culmination.utc_datetime
                    const rise = data[0].rise.utc_datetime
                    const set = data[0].set.utc_datetime

                    //Local time converter helper function
                    const convert = date => {
                        var newDate = new Date(date);
                        return newDate;
                    }

                    // console.log(data.features[0].place_name)
                
                    const detailsContainer = document.querySelector('.details-container')
                    detailsContainer.className = 'section details-container'

                    //info container
                    const details = document.querySelector('#detailed-info')
                    const heading = document.createElement('h2')
                    heading.className = 'row'
                    heading.innerText = 'Dates & times of the Apocalypse'
                    details.append(heading)

                    // const place = document.createElement('div')
                    // place.className = 'item'
                    // place.innerHTML = `<p>Culminate date-time: <br> <br>${convert(culminate)}</p>`
                    // details.append(place)

                    const item1 = document.createElement('div')
                    item1.className = 'item'
                    item1.innerHTML = `<p>Culminate date-time: <br> <br>${convert(culminate)}</p>`
                    details.append(item1)

                    const item2 = document.createElement('div')
                    item2.className = 'item'
                    item2.innerHTML = `<p>Rise date-time: <br> <br>${convert(rise)}</p>`
                    details.append(item2)

                    const item3 = document.createElement('div')
                    item3.className = 'item'
                    item3.innerHTML = `<p>Set date-time: <br> <br>${convert(set)}</p>`
                    details.append(item3)

            })
    })
})

//new search function, clears out input values and erases result div
const newSearchBtn = document.querySelector('#new-search')
newSearchBtn.addEventListener('click', () => {
    //clears the inputted values for a new search
    let apiInput = document.querySelector('#api-key')
    let addressInput = document.querySelector('#address')
    let norad = document.querySelector('#norad')

    apiInput.value = ''
    addressInput.value = ''
    norad.value = ''

    //clears the newly created div
    const details = document.querySelector('#detailed-info')
    details.innerText = ""
    const detailsContainer = document.querySelector('.details-container')
    detailsContainer.classList.remove('section')
    
    //resets the background image
    const content = document.querySelector('.content')
    content.style.backgroundImage = 'url("https://media.giphy.com/media/MaThe6p8WAKbf9NDDM/giphy.gif")'
})



