let interval = null
let time = 20 * 60  // 20 minutes default
const ding = document.getElementById("ding-sound")

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')
  document.getElementById('display').textContent = `${minutes}:${seconds}`
}

function startTimer() {
  if (interval) return

  const min = parseInt(document.getElementById('minutes').value) || 0
  const sec = parseInt(document.getElementById('seconds').value) || 0
  time = min * 60 + sec

  updateDisplay()

  interval = setInterval(() => {
    time--
    updateDisplay()
    if (time <= 0) {
      clearInterval(interval)
      interval = null
      ding.play()
    }
  }, 1000)
}

function resetTimer() {
  clearInterval(interval)
  interval = null
  time = 20 * 60
  document.getElementById('minutes').value = 20
  document.getElementById('seconds').value = 0
  updateDisplay()
}

updateDisplay()
