// Tailwind + shared logic
function initTailwind() {
    return { config() { return { theme: { extend: {} } } }, theme: { extend: {} } }
}

// Scroll animations + typing
function initAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
        el.style.opacity = 0
        new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                el.style.transitionDelay = (i * 80) + 'ms'
                el.style.opacity = 1
                el.style.transform = 'translateY(0)'
            }
        }, { threshold: 0.2 }).observe(el)
    })

    // Typing headline on home
    const headline = document.getElementById('hero-headline')
    if (headline) headline.style.width = '0'
}

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu')
    const icon = document.getElementById('hamburger-icon')
    const open = !menu.classList.contains('hidden')
    if (open) {
        menu.classList.add('hidden')
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />`
    } else {
        menu.classList.remove('hidden')
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6h12v12" />`
    }
}

// === GROK AI CHATBOT LOGIC (interactive & fun) ===
let grokResponses = {
    default: "As Grok, built by xAI, I love that question! What aspect of AI are you most curious about?",
    portfolio: "This portfolio was built to showcase real AI engineering skills. Want to see the source code on GitHub?",
    ai: "Large language models + beautiful interfaces = magic. I can help you build agents, RAG systems, or generative UIs.",
    project: "My favorite project is the autonomous AI agent that writes code while you sleep. Want the live demo?",
    contact: "Best way to reach me is hello@yourname.dev or just keep chatting here. I'm always online! 🚀",
    hello: "Hello! I'm Grok, your AI sidekick for this portfolio. How can I help you today?"
}

function addMessage(text, isUser) {
    const container = document.getElementById('chat-messages')
    const msg = document.createElement('div')
    msg.className = isUser ?
        'ml-auto max-w-[75%] bg-[#00d4ff] text-zinc-950 rounded-3xl rounded-br-none px-5 py-3' :
        'mr-auto max-w-[75%] bg-zinc-800 rounded-3xl rounded-bl-none px-5 py-3'
    msg.textContent = text
    container.appendChild(msg)
    container.scrollTop = container.scrollHeight
}

function handleGrokChat(e) {
    e.preventDefault()
    const input = document.getElementById('chat-input')
    const query = input.value.trim().toLowerCase()
    if (!query) return

    addMessage(query, true)
    input.value = ''

    // Simulate thinking + Grok response
    setTimeout(() => {
        let reply = grokResponses.default
        if (query.includes('portfolio') || query.includes('this site')) reply = grokResponses.portfolio
        else if (query.includes('ai') || query.includes('llm') || query.includes('model')) reply = grokResponses.ai
        else if (query.includes('project') || query.includes('demo')) reply = grokResponses.project
        else if (query.includes('contact') || query.includes('email')) reply = grokResponses.contact
        else if (query.includes('hi') || query.includes('hello')) reply = grokResponses.hello

        addMessage(reply, false)
    }, 800)
}

function toggleGrokChat() {
    const win = document.getElementById('chat-window')
    win.classList.toggle('hidden')
    if (!win.classList.contains('hidden')) {
        document.getElementById('chat-input').focus()
            // Welcome message once
        if (document.getElementById('chat-messages').children.length === 0) {
            setTimeout(() => addMessage("Hi! I'm Grok, powered by xAI. Ask me anything about AI, this portfolio, or how to build your own agents.", false), 400)
        }
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initTailwind()
    initAnimations()

    // Mobile button
    document.getElementById('mobile-menu-button') ? .addEventListener('click', toggleMobileMenu)

    // Chat form
    const chatForm = document.getElementById('chat-form')
    if (chatForm) chatForm.addEventListener('submit', handleGrokChat)

    console.log('%c🚀 AI Portfolio fully loaded with Grok chatbot & advanced animations!', 'color:#00d4ff; font-family:monospace; font-size:13px')
})