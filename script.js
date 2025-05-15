let time = 20 * 60
let interval = null

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')
  document.getElementById("display").value = `${minutes}:${seconds}`
}

function parseTimeInput() {
  const raw = document.getElementById("display").value.trim()
  const parts = raw.split(":")
  const min = parseInt(parts[0]) || 0
  const sec = parseInt(parts[1]) || 0
  return min * 60 + sec
}

function adjustTime(amount) {
  time = parseTimeInput()
  time = Math.max(0, time + amount)
  updateDisplay()
}

function startTimer() {
  if (interval) return
  time = parseTimeInput()
  updateDisplay()

  interval = setInterval(() => {
    if (time > 0) {
      time--
      updateDisplay()
    } else {
      clearInterval(interval)
      interval = null
      const sound = document.getElementById("ding-sound")
      sound.currentTime = 0
      sound.play().catch(err => console.warn("Sound failed:", err))
    }
  }, 1000)
}

function resetTimer() {
  clearInterval(interval)
  interval = null
  time = 20 * 60
  updateDisplay()
}

updateDisplay()
