let time = 0
let interval = null

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')
  document.getElementById('display').textContent = `${minutes}:${seconds}`
}

function startTimer() {
  if (interval) return

  const minutesInput = parseInt(document.getElementById('minutes').value) || 0
  const secondsInput = parseInt(document.getElementById('seconds').value) || 0
  time = minutesInput * 60 + secondsInput

  if (time <= 0) return

  updateDisplay()

  interval = setInterval(() => {
    time--
    updateDisplay()
    if (time <= 0) {
      clearInterval(interval)
      interval = null
      alert("Time's up!")
    }
  }, 1000)
}

function resetTimer() {
  clearInterval(interval)
  interval = null
  time = 0
  updateDisplay()
  document.getElementById('minutes').value = ''
  document.getElementById('seconds').value = ''
}

updateDisplay()
