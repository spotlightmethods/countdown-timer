document.addEventListener("DOMContentLoaded", () => {
  let time = 20 * 60
  let interval = null
  let isPaused = false

  const display = document.getElementById("display")
  const sound = document.getElementById("ding-sound")
  const startBtn = document.getElementById("start-btn")

  function updateDisplay() {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60)).padStart(2, '0')
    display.value = `${minutes}:${seconds}`
  }

  function parseTimeInput() {
    const raw = display.value.trim()
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
      startBtn.textContent = "Start"
      sound.currentTime = 0
      sound.play().catch(() => {})
    }
  }

  startBtn.addEventListener("click", () => {
    if (interval && !isPaused) {
      // Pause
      clearInterval(interval)
      isPaused = true
      startBtn.textContent = "Start"
    } else {
      // Start or Resume
      if (!isPaused) {
        time = parseTimeInput()
      }
      interval = setInterval(tick, 1000)
      isPaused = false
      startBtn.textContent = "Pause"
    }
  })

  document.getElementById("cancel-btn").addEventListener("click", () => {
    clearInterval(interval)
    interval = null
    isPaused = false
    time = 20 * 60
    startBtn.textContent = "Start"
    updateDisplay()
  })

  document.querySelector(".adjust-symbol:first-of-type").addEventListener("click", () => {
    time = parseTimeInput()
    time = Math.max(0, time - 60)
    updateDisplay()
  })

  document.querySelector(".adjust-symbol:last-of-type").addEventListener("click", () => {
    time = parseTimeInput()
    time = time + 60
    updateDisplay()
  })

  updateDisplay()
})
