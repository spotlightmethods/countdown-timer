document.addEventListener("DOMContentLoaded", () => {
  let time = 20 * 60
  let interval = null

  const display = document.getElementById("display")
  const sound = document.getElementById("ding-sound")
  const startBtn = document.getElementById("start-btn")

  function updateDisplay() {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')
    display.value = `${minutes}:${seconds}`
  }

  function parseTimeInput() {
    const raw = display.value.trim()
    const parts = raw.split(":")
    const min = parseInt(parts[0]) || 0
    const sec = parseInt(parts[1]) || 0
    return min * 60 + sec
  }

  function startTicking() {
    interval = setInterval(() => {
      if (time > 0) {
        time--
        updateDisplay()
      } else {
        clearInterval(interval)
        interval = null
        startBtn.textContent = "Start"
        startBtn.dataset.state = "stopped"
        sound.currentTime = 0
        sound.play().catch(() => {})
      }
    }, 1000)
  }

  startBtn.addEventListener("click", () => {
    const state = startBtn.dataset.state

    if (state === "stopped") {
      time = parseTimeInput()
      startTicking()
      startBtn.textContent = "Pause"
      startBtn.dataset.state = "running"
    } else if (state === "running") {
      clearInterval(interval)
      interval = null
      startBtn.textContent = "Start"
      startBtn.dataset.state = "paused"
    } else if (state === "paused") {
      startTicking()
      startBtn.textContent = "Pause"
      startBtn.dataset.state = "running"
    }
  })

  document.getElementById("cancel-btn").addEventListener("click", () => {
    clearInterval(interval)
    interval = null
    time = 20 * 60
    updateDisplay()
    startBtn.textContent = "Start"
    startBtn.dataset.state = "stopped"
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

  // Set initial state
  startBtn.dataset.state = "stopped"
  updateDisplay()
})
