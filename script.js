let time = 0
let interval = null

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')
  document.getElementById('display').textContent = `${minutes}:${seconds}`
}

function startTimer() {
  if (interval) return
  interval = setInterval(() => {
    time++
    updateDisplay()
  }, 1000)
}

function resetTimer() {
  clearInterval(interval)
  interval = null
  time = 0
  updateDisplay()
}

updateDisplay()
