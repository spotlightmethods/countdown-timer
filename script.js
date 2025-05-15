const presets = [
  { label: "Timer 1 (120 min)", seconds: 120 * 60 },
  { label: "Timer 2 (60 min)", seconds: 60 * 60 },
  { label: "Timer 3 (30 min)", seconds: 30 * 60 },
  { label: "Timer 4 (20 min)", seconds: 20 * 60 },
  { label: "Timer 5 (15 min)", seconds: 15 * 60 },
  { label: "Timer 6 (10 min)", seconds: 10 * 60 },
  { label: "Timer 7 (5 min)", seconds: 5 * 60 }
]

let intervals = []
const ding = document.getElementById("ding-sound")

function createTimers() {
  const container = document.getElementById("carousel")
  presets.forEach((preset, index) => {
    const card = document.createElement("div")
    card.className = "timer-card"

    card.innerHTML = `
      <div class="timer-title">${preset.label}</div>
      <div id="display-${index}" class="display">20:00</div>
      <div>
        <input type="number" id="min-${index}" placeholder="Min" min="0" max="999">
        <input type="number" id="sec-${index}" placeholder="Sec" min="0" max="59">
      </div>
      <div>
        <button onclick="startTimer(${index})">Start</button>
        <button onclick="resetTimer(${index}, ${preset.seconds})">Reset</button>
      </div>
    `
    container.appendChild(card)
    resetTimer(index, preset.seconds)
  })
}

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0')
  const sec = String(seconds % 60).padStart(2, '0')
  return `${min}:${sec}`
}

function startTimer(index) {
  if (intervals[index]) return

  const min = parseInt(document.getElementById(`min-${index}`).value) || 0
  const sec = parseInt(document.getElementById(`sec-${index}`).value) || 0
  let time = min * 60 + sec

  const display = document.getElementById(`display-${index}`)
  display.textContent = formatTime(time)

  intervals[index] = setInterval(() => {
    time--
    display.textContent = formatTime(time)
    if (time <= 0) {
      clearInterval(intervals[index])
      intervals[index] = null
      ding.play()
    }
  }, 1000)
}

function resetTimer(index, defaultTime) {
  clearInterval(intervals[index])
  intervals[index] = null
  document.getElementById(`display-${index}`).textContent = formatTime(defaultTime)
  document.getElementById(`min-${index}`).value = Math.floor(defaultTime / 60)
  document.getElementById(`sec-${index}`).value = defaultTime % 60
}

function scrollTimers(direction) {
  const carousel = document.getElementById("carousel")
  const width = carousel.clientWidth
  carousel.scrollBy({ left: width * direction, behavior: "smooth" })
}

createTimers()
