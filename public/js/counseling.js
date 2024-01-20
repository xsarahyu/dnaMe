const days = document.querySelector('.days')
const currentDate = document.querySelector('.month-year')
const prevNextIcon = document.querySelectorAll('.icons span')

// Get new date, current year, and month
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()

// Store full names of all months in an array
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

const renderCalendar = () => {
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
  const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay()
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()

  let li = ''

  for (let i = firstDayOfMonth; i > 0; i--) {
    li += `<li class='inactive'>${lastDateOfLastMonth - i + 1}</li>`
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear() ? 'active' : ''
    li += `<li class='${isToday}'>${i}</li>`
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    li += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`
  days.innerHTML = li
}

renderCalendar()

prevNextIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'left' ? currMonth - 1 : currMonth + 1

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate())
      currYear = date.getFullYear()
      currMonth = date.getMonth()
    } else {
      date = new Date()
    }

    renderCalendar()
  })
})