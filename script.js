let time = 20 * 60
let interval = null
let isPaused = false

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

function tick() {
  if (time > 0) {
    time--
    updateDisplay()
  } else {
    clearInterval(interval)
    interval = null
    isPaused = false
    document.getElementById("start-btn").textContent = "Start"
    const sound = document.getElementById("ding-sound")
    sound.currentTime = 0
    sound.play().catch(() => {})
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn")
  const cancelBtn = document.getElementById("cancel-btn")
  const minusBtn = document.getElementById("minus")
  const plusBtn = document.getElementById("plus")

  startBtn.addEventListener("click", () => {
    if (interval && !isPaused) {
      // Pause
      clearInterval(interval)
      interval = null
      isPaused = true
      startBtn.textContent = "Start"
    } else {
      // Start or resume
      if (!isPaused) {
        time = parseTimeInput()
      }
      interval = setInterval(tick, 1000)
      isPaused = false
      startBtn.textContent = "Pause"
    }
  })

  cancelBtn.addEventListener("click", () => {
    clearInterval(interval)
    interval = null
    isPaused = false
    time = 20 * 60
    updateDisplay()
    startBtn.textContent = "Start"
  })

  minusBtn.addEventListener("click", () => {
    time = parseTimeInput()
    time = Math.max(0, time - 60)
    updateDisplay()
  })

  plusBtn.addEventListener("click", () => {
    time = parseTimeInput()
    time += 60
    updateDisplay()
  })

  updateDisplay()
})
