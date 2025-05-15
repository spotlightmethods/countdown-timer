let time = 1200  // 20 minutes in seconds
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
  const total = minutesInput * 60 + secondsInput

  if (total > 0) time = total

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
  time = 1200  // Reset to 20 minutes
  document.getElementById('minutes').value = ''
  document.getElementById('seconds').value = ''
  updateDisplay()
}

function setPreset(seconds) {
  clearInterval(interval)
  interval = null
  time = seconds
  document.getElementById('minutes').value = ''
  document.getElementById('seconds').value = ''
  updateDisplay()
}

updateDisplay()
