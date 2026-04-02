import { useEffect, useRef } from 'react'

const N = 55
function rand(a, b) { return a + Math.random() * (b - a) }

function makeStar(W, H) {
    return {
        x: rand(0, W), y: rand(0, H),
        size: rand(0.3, 0.8),
        alpha: rand(0.1, 0.28),
        twinklePhase: rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.005, 0.015),
    }
}

function spawnShoot(W, H) {
    const angle = rand(Math.PI * 0.18, Math.PI * 0.38)
    const speed = rand(18, 28)
    const len = rand(180, 320)
    return {
        x: rand(W * 0.05, W * 0.85),
        y: rand(H * 0.02, H * 0.45),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len, maxLen: len, life: 1,
        decay: rand(0.007, 0.013),
        width: rand(1.8, 2.8),
    }
}

export default function ParticleBg() {
    const cvRef = useRef(null)

    useEffect(() => {
        const cv = cvRef.current
        const ctx = cv.getContext('2d')
        let W, H, stars = [], shootingStars = [], raf
        let lastShoot = 0, nextDelay = 1800
        const mouse = { x: -9999, y: -9999 }

        const resize = () => {
            W = cv.width = window.innerWidth
            H = cv.height = window.innerHeight
            stars = Array.from({ length: N }, () => makeStar(W, H))
        }

        const fisheye = (px, py) => {
            const dx = px - mouse.x, dy = py - mouse.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d >= 180 || d < 0.5) return { x: px, y: py }
            const f = 1 - (d / 180) * (d / 180)
            return { x: px + (dx / d) * f * 65, y: py + (dy / d) * f * 65 }
        }

        const frame = (now) => {
            ctx.clearRect(0, 0, W, H)

            if (now - lastShoot > nextDelay) {
                shootingStars.push(spawnShoot(W, H))
                lastShoot = now
                nextDelay = rand(1800, 4500)
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i]
                s.life -= s.decay
                if (s.life <= 0 || s.x > W + 400 || s.y > H + 400) { shootingStars.splice(i, 1); continue }

                const angle = Math.atan2(s.vy, s.vx)
                const tailLen = s.maxLen * s.life
                const tx = s.x - Math.cos(angle) * tailLen
                const ty = s.y - Math.sin(angle) * tailLen

                // 3 layered strokes — outer glow, mid, sharp core
                const layers = [
                    { lw: (s.width + 6) * s.life, stops: [[0, 'rgba(255,255,255,0)'], [0.55, `rgba(200,180,255,${(s.life * 0.08).toFixed(3)})`], [0.85, `rgba(220,200,255,${(s.life * 0.18).toFixed(3)})`], [1, `rgba(255,255,255,${(s.life * 0.25).toFixed(3)})`]] },
                    { lw: (s.width + 2.5) * s.life, stops: [[0, 'rgba(255,255,255,0)'], [0.5, `rgba(210,190,255,${(s.life * 0.25).toFixed(3)})`], [0.85, `rgba(235,220,255,${(s.life * 0.55).toFixed(3)})`], [1, `rgba(255,255,255,${(s.life * 0.75).toFixed(3)})`]] },
                    { lw: s.width * s.life, stops: [[0, 'rgba(255,255,255,0)'], [0.4, `rgba(240,230,255,${(s.life * 0.55).toFixed(3)})`], [1, `rgba(255,255,255,${s.life.toFixed(3)})`]] },
                ]

                for (const layer of layers) {
                    const grd = ctx.createLinearGradient(tx, ty, s.x, s.y)
                    layer.stops.forEach(([pos, col]) => grd.addColorStop(pos, col))
                    ctx.beginPath()
                    ctx.strokeStyle = grd
                    ctx.lineWidth = layer.lw
                    ctx.lineCap = 'round'
                    ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y); ctx.stroke()
                }

                // head glow
                const hSize = (3.5 + s.width) * s.life
                const hgrd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hSize * 3)
                hgrd.addColorStop(0, `rgba(255,255,255,${s.life.toFixed(3)})`)
                hgrd.addColorStop(0.3, `rgba(220,200,255,${(s.life * 0.7).toFixed(3)})`)
                hgrd.addColorStop(1, 'rgba(180,150,255,0)')
                ctx.beginPath(); ctx.arc(s.x, s.y, hSize * 3, 0, Math.PI * 2)
                ctx.fillStyle = hgrd; ctx.fill()

                // bright core dot
                ctx.beginPath(); ctx.arc(s.x, s.y, hSize * 0.55, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${s.life.toFixed(3)})`; ctx.fill()

                s.x += s.vx; s.y += s.vy
            }

            for (const p of stars) {
                p.twinklePhase += p.twinkleSpeed
                const t = 0.7 + 0.3 * Math.sin(p.twinklePhase)
                const { x, y } = fisheye(p.x, p.y)
                ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${(p.alpha * t).toFixed(3)})`; ctx.fill()
            }

            raf = requestAnimationFrame(frame)
        }

        const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
        const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

        resize(); raf = requestAnimationFrame(frame)
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas ref={cvRef} style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 1, pointerEvents: 'none',
        }} />
    )
}