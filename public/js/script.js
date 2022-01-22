function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem!', error))
}


// gets the current time in a shortened way i.e.: 9:04 -> 9.04 (as a number)
function getShortTime() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    const nowShort = hours + minutes / 100
    return nowShort
}


function getTime() {
    const now = new Date()
    const hours = now.getHours()
    let minutes = now.getMinutes()
    if (minutes < 10) minutes = "0" + minutes
    const timeElement = document.querySelector(".time")

    timeElement.innerText = `Time: ${ hours }:${ minutes }`
}


function findCurrentRoutine(routines) {
    const cookie = document.cookie

    if (cookie === "routine=morningRoutine") {
        return routines.morningRoutine
    }
    else if (cookie === "routine=afternoonRoutine") {
        return routines.afternoonRoutine
    }
    else if (cookie === "routine=nightRoutine") {
        return routines.nightRoutine
    }

}


function highlightTaskAtHand() {
    fetchData("data/data.json").then(data => {
        console.log("data:", data)
        const routine = findCurrentRoutine(data)
        console.log(getShortTime())

        function findCurrentTaskIndex() {
            for (let i = 0; i < routine.length; i++) {
                let shortTime = getShortTime()
                let startHour = routine[i].startHour
                let endHour = routine[i].endHour
                if (endHour < startHour) {
                    endHour += 24
                    shortTime += 24
                }

                if (startHour + routine[i].startMinutes / 100 <= shortTime && endHour + routine[i].endMinutes / 100 > shortTime) {
                    return i
                    // test
                }
            }
        }

        const taskElements = document.querySelectorAll(".task")

        function updateUI() {
            taskElements.forEach(e => e.classList.remove("highlighted"))
            taskElements.forEach((e, i) => {
                if (i === findCurrentTaskIndex()) e.classList.add("highlighted")
            })
        }

        const render = setInterval(function () {
            getTime()
            updateUI()
        }, 1000)


        //delete cookies at the end
        function deleteAllCookies() {
            let cookies = document.cookie.split(";")

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i]
                let eqPos = cookie.indexOf("=")
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
            }
        }

        deleteAllCookies()

    })
}


highlightTaskAtHand()






























