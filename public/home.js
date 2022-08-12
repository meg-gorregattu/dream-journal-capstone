const dreamsContainer = document.getElementById('dreams-container')
const form = document.querySelector('form') 

const baseURL = `/api/dreams`

const dreamsCallback = ( res ) => displayDreams(res.data)
const errCallback = err => console.log(err.response.data)

const getAllDreams = () => axios.get(`${baseURL}/${localStorage.getItem('user')}`).then(dreamsCallback).catch(errCallback)
const createDream = body => axios.post(baseURL, body).then(dreamsCallback).catch(errCallback)
const deleteDream = id => axios.delete(`${baseURL}/${id}`, {headers: {'X-Auth-Token': localStorage.getItem('user')}}).then(dreamsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let date = document.getElementById('date')
    let title = document.getElementById('title')
    let dreamType = document.getElementById('type')
    let dreamDescription = document.getElementById('description')
    let mood = document.getElementById('mood')
    let activityLevel = document.querySelector('input[name="activity-level"]:checked')
    let hoursSlept = document.getElementById('hours-slept')

    let bodyObj = {
        id: localStorage.getItem('user'),
        date: date.value,
        title: title.value, 
        dreamType: dreamType.value,
        dreamDescription: dreamDescription.value,
        mood: mood.value,
        activityLevel: activityLevel.value,
        hoursSlept: hoursSlept.value
    }

    createDream(bodyObj)

    date.value = ''
    title.value = ''
    dreamType.value = ''
    dreamDescription.value = ''
    mood.value = ''
    activityLevel.checked = false
    hoursSlept.value = ''
};

function createDreamCard(dream) {
    const dreamCard = document.createElement('div')
    const linebreak = document.createElement('br')
    dreamCard.classList.add('dream-card')

    dreamCard.innerHTML = ` <article>
    <button onclick="deleteDream(${dream.id})">Delete</button>
    <p class="dream-date">${dream.date}</p>
    <p class="dream-title">${dream.title}</p>
    <p class="dream-description">${dream.dreamDescription}</p>
    <p class="dream-attributes"><b>Dream Type:</b>&nbsp; ${dream.dreamType}&nbsp;&nbsp;&nbsp; <b>Mood During Day:</b>&nbsp; ${dream.mood}&nbsp;&nbsp;&nbsp; <b>Activity Level:</b> &nbsp;${dream.activityLevel} &nbsp;&nbsp;&nbsp;<b>Hours of Sleep:</b>&nbsp; ${dream.hoursSlept}</p>
    </article>
    `


    dreamsContainer.appendChild(dreamCard)
};

function displayDreams(arr) {
    dreamsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDreamCard(arr[i])
    }
};


getAllDreams();
form.addEventListener('submit', submitHandler)

