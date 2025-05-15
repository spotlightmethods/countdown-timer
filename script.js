document.addEventListener("DOMContentLoaded", () => {
  let time = 20 * 60
  let interval = null
  const display = document.getElementById("display")
  const ding = document.getElementById("ding-sound")

  function updateDisplay() {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')
    display.textContent = `${minutes}:${seconds}`
  }

  window.adjustTime = function (amount) {
    time = Math.max(0, time + amount)
    updateDisplay()
  }

  window.startTimer = function () {
    if (interval) return
    interval = setInterval(() => {
      if (time > 0) {
        time--
        updateDisplay()
      } else {
        clearInterval(interval)
        interval = null
        ding.play()
      }
    }, 1000)
  }

  window.resetTimer = function () {
    clearInterval(interval)
    interval = null
    time = 20 * 60
    updateDisplay()
  }

  updateDisplay()
})
