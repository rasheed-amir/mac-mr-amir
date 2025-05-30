// Configuration
const config = {
  whatsappLink:
    "https://wa.me/201009604044?text=Hi%20Mr%20Amir%2C%20I%E2%80%99d%20like%20to%20schedule%20a%20class%20with%20you.%20Could%20you%20please%20let%20me%20know%20your%20available%20days%20and%20times%3F",
  facebookLink: "https://facebook.com/MACMansoura",
  mapsLink: "https://maps.app.goo.gl/WxgRMgnqVPjZ35DdA",
  educatorName: "Mr. Amir MoheyEldin",
  educatorTitle: "Experienced English Educator",
  educatorSpecialty: "SAT, ACT, & EST Prep Specialist",
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initCanvas()
  setupEventListeners()
  updateContactLinks()
  updateEducatorInfo()
})

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const isDark = savedTheme === "light" ? false : true

  if (!isDark) {
    document.body.classList.remove("dark")
  } else {
    document.body.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }

  updateThemeIcons(isDark)
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark")

  if (isDark) {
    document.body.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    document.body.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }

  updateThemeIcons(!isDark)
  drawCanvas()
}

function updateThemeIcons(isDark) {
  const sunIcon = document.getElementById("sunIcon")
  const moonIcon = document.getElementById("moonIcon")

  if (sunIcon && moonIcon) {
    sunIcon.style.display = isDark ? "block" : "none"
    moonIcon.style.display = isDark ? "none" : "block"
  }
}

// Canvas Background
function initCanvas() {
  const canvas = document.getElementById("backgroundCanvas")
  if (!canvas) return

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawCanvas()
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()
}

function drawCanvas() {
  const canvas = document.getElementById("backgroundCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const isDark = document.body.classList.contains("dark")

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

  if (isDark) {
    gradient.addColorStop(0, "#0f172a")
    gradient.addColorStop(0.5, "#1e293b")
    gradient.addColorStop(1, "#0f172a")
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
    ctx.fillStyle = "rgba(148, 163, 184, 0.05)"
  } else {
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(0.5, "#f1f5f9")
    gradient.addColorStop(1, "#e2e8f0")
    ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fillStyle = "rgba(59, 130, 246, 0.05)"
  }

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw grid pattern
  ctx.lineWidth = 1
  const gridSize = 50

  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }

  // Draw subtle academic elements
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 20 + 15

    // Draw book shape
    ctx.fillRect(x, y, size, size * 0.7)
    ctx.fillRect(x + size * 0.1, y - size * 0.1, size * 0.8, size * 0.8)
  }
}

// Event Listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Share button
  const shareButton = document.getElementById("shareButton")
  if (shareButton) {
    shareButton.addEventListener("click", shareContent)
  }
}

// Share functionality
async function shareContent() {
  const shareData = {
    title: "MAC - Mansoura American Diploma Center",
    text: `Expert SAT, ACT, & EST preparation with ${config.educatorName}`,
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  } catch (error) {
    console.error("Error sharing:", error)
  }
}

// Update content with configuration
function updateContactLinks() {
  // WhatsApp links
  const whatsappLinks = document.querySelectorAll("#whatsappLink, #whatsappLink2")
  whatsappLinks.forEach((link) => {
    if (link) {
      link.href = config.whatsappLink
    }
  })

  // Facebook links
  const facebookLinks = document.querySelectorAll("#facebookLink, #facebookLink2")
  facebookLinks.forEach((link) => {
    if (link) {
      link.href = config.facebookLink
    }
  })

  // Maps links
  const mapsLinks = document.querySelectorAll("#mapsLink, #mapsLink2")
  mapsLinks.forEach((link) => {
    if (link) {
      link.href = config.mapsLink
    }
  })
}

function updateEducatorInfo() {
  // Educator name
  const nameElements = document.querySelectorAll("#educatorName, #educatorName2")
  nameElements.forEach((el) => {
    if (el) el.textContent = config.educatorName
  })

  // Educator title
  const titleElements = document.querySelectorAll("#educatorTitle, #educatorTitle2")
  titleElements.forEach((el) => {
    if (el) el.textContent = config.educatorTitle
  })

  // Educator specialty
  const specialtyElements = document.querySelectorAll("#educatorSpecialty, #educatorSpecialty2")
  specialtyElements.forEach((el) => {
    if (el) el.textContent = config.educatorSpecialty
  })
}

// Load saved configuration if available
function loadSavedConfig() {
  const savedConfig = localStorage.getItem("macConfig")
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig)
      Object.assign(config, parsedConfig)
    } catch (error) {
      console.error("Error loading saved config:", error)
    }
  }
}

// Initialize with saved config
loadSavedConfig()
