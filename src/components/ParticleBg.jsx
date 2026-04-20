import { useEffect, useRef, useState } from 'react'

const N = 80
const STORAGE_KEY = 'sky-mode'

function rand(a, b) {
    return a + Math.random() * (b - a)
}

function makeStar(W, H) {
    const bright = Math.random() < 0.18

    return {
        x: rand(W * 0.28, W),
        y: rand(0, H * 0.82),
        size: bright ? rand(0.9, 1.7) : rand(0.35, 0.8),
        alpha: bright ? rand(0.4, 0.85) : rand(0.08, 0.22),
        glow: bright ? rand(6, 12) : 0,
        twinklePhase: rand(0, Math.PI * 2),
        twinkleSpeed: bright ? rand(0.01, 0.02) : rand(0.003, 0.008),
    }
}

function spawnShoot(W, H) {
    const angle = rand(Math.PI * 0.2, Math.PI * 0.32)
    const speed = rand(18, 24)
    const len = rand(170, 250)

    return {
        x: rand(W * 0.4, W * 0.78),
        y: rand(H * 0.06, H * 0.24),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        maxLen: len,
        life: 1,
        decay: rand(0.01, 0.014),
        width: rand(1.6, 2.2),
    }
}

function getViewportMeta(W, H) {
    const isMobile = W <= 768
    const isSmallMobile = W <= 480

    return {
        isMobile,
        isSmallMobile,
        moonX: isMobile ? W * 0.78 : W * 0.82,
        moonY: isMobile ? H * 0.16 : H * 0.18,
        moonR: Math.min(W, H) * (isSmallMobile ? 0.03 : isMobile ? 0.035 : 0.04),
        sunX: isMobile ? W * 0.8 : W * 0.84,
        sunY: isMobile ? H * 0.2 : H * 0.22,
        sunR: Math.min(W, H) * (isSmallMobile ? 0.035 : isMobile ? 0.04 : 0.045),
        leftDarkCutoff: isMobile ? W * 0.58 : W * 0.46,
    }
}

export default function ParticleBg() {
    const cvRef = useRef(null)
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved === 'moon' ? 'moon' : 'sun'
    })

    useEffect(() => {
        const onSkyModeChange = (event) => {
            const nextMode = event?.detail?.mode
            if (nextMode === 'sun' || nextMode === 'moon') {
                setMode(nextMode)
                localStorage.setItem(STORAGE_KEY, nextMode)
            }
        }

        window.addEventListener('sky-mode-change', onSkyModeChange)
        return () => window.removeEventListener('sky-mode-change', onSkyModeChange)
    }, [])

    useEffect(() => {
        const cv = cvRef.current
        const ctx = cv.getContext('2d')

        let W = 0
        let H = 0
        let stars = []
        let shootingStars = []
        let raf
        let lastShoot = 0
        let nextDelay = rand(2200, 4200)
        let view = getViewportMeta(window.innerWidth, window.innerHeight)

        const resize = () => {
            W = cv.width = window.innerWidth
            H = cv.height = window.innerHeight
            view = getViewportMeta(W, H)
            stars = Array.from({ length: N }, () => makeStar(W, H))
        }

        const drawSunTheme = () => {
            const pinkGrad = ctx.createLinearGradient(W * 0.32, 0, W, H)
            pinkGrad.addColorStop(0, 'rgba(0,0,0,0)')
            pinkGrad.addColorStop(0.18, 'rgba(255, 190, 220, 0.04)')
            pinkGrad.addColorStop(0.48, 'rgba(252, 143, 188, 0.09)')
            pinkGrad.addColorStop(1, 'rgba(255, 105, 150, 0.07)')
            ctx.fillStyle = pinkGrad
            ctx.fillRect(0, 0, W, H)

            const bloom = ctx.createRadialGradient(
                view.sunX,
                view.sunY,
                0,
                view.sunX,
                view.sunY,
                Math.min(W, H) * (view.isMobile ? 0.28 : 0.34)
            )
            bloom.addColorStop(0, 'rgba(255, 235, 210, 0.15)')
            bloom.addColorStop(0.35, 'rgba(255, 190, 205, 0.10)')
            bloom.addColorStop(0.7, 'rgba(255, 135, 170, 0.05)')
            bloom.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.fillStyle = bloom
            ctx.fillRect(0, 0, W, H)

            const x = view.sunX
            const y = view.sunY
            const r = view.sunR

            const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5)
            glow.addColorStop(0, 'rgba(255, 238, 214, 0.18)')
            glow.addColorStop(0.3, 'rgba(255, 192, 200, 0.11)')
            glow.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.beginPath()
            ctx.arc(x, y, r * 5, 0, Math.PI * 2)
            ctx.fillStyle = glow
            ctx.fill()

            const disc = ctx.createRadialGradient(
                x - r * 0.18,
                y - r * 0.18,
                r * 0.1,
                x,
                y,
                r
            )
            disc.addColorStop(0, 'rgba(255, 248, 228, 0.98)')
            disc.addColorStop(0.65, 'rgba(255, 210, 155, 0.9)')
            disc.addColorStop(1, 'rgba(255, 166, 176, 0.78)')
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = disc
            ctx.fill()
        }

        const drawMoonTheme = () => {
            const bg = ctx.createLinearGradient(0, 0, 0, H)
            bg.addColorStop(0, '#050816')
            bg.addColorStop(0.45, '#08111f')
            bg.addColorStop(1, '#02040b')
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, W, H)

            const leftFade = ctx.createLinearGradient(0, 0, view.leftDarkCutoff, 0)
            leftFade.addColorStop(0, 'rgba(0,0,0,0.72)')
            leftFade.addColorStop(0.7, 'rgba(0,0,0,0.28)')
            leftFade.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = leftFade
            ctx.fillRect(0, 0, W, H)

            const coolBloom = ctx.createRadialGradient(
                view.moonX,
                view.moonY,
                0,
                view.moonX,
                view.moonY,
                Math.min(W, H) * (view.isMobile ? 0.22 : 0.28)
            )
            coolBloom.addColorStop(0, 'rgba(95, 135, 255, 0.10)')
            coolBloom.addColorStop(0.45, 'rgba(60, 95, 210, 0.06)')
            coolBloom.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.fillStyle = coolBloom
            ctx.fillRect(0, 0, W, H)

            const x = view.moonX
            const y = view.moonY
            const r = view.moonR

            const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
            glow.addColorStop(0, 'rgba(255,255,245,0.12)')
            glow.addColorStop(0.35, 'rgba(190,215,255,0.07)')
            glow.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.beginPath()
            ctx.arc(x, y, r * 4, 0, Math.PI * 2)
            ctx.fillStyle = glow
            ctx.fill()

            const body = ctx.createRadialGradient(
                x - r * 0.22,
                y - r * 0.22,
                r * 0.08,
                x,
                y,
                r
            )
            body.addColorStop(0, 'rgba(255,255,250,0.95)')
            body.addColorStop(0.7, 'rgba(225,232,245,0.82)')
            body.addColorStop(1, 'rgba(198,207,224,0.72)')
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = body
            ctx.fill()

            ctx.beginPath()
            ctx.arc(x + r * 0.34, y, r * 0.95, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(0,0,0,0.34)'
            ctx.fill()
        }

        const drawStars = () => {
            for (const p of stars) {
                p.twinklePhase += p.twinkleSpeed
                const t = 0.82 + 0.18 * Math.sin(p.twinklePhase)

                if (p.glow > 0) {
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow)
                    g.addColorStop(0, `rgba(255,255,255,${(p.alpha * 0.18 * t).toFixed(3)})`)
                    g.addColorStop(0.45, `rgba(190,210,255,${(p.alpha * 0.08 * t).toFixed(3)})`)
                    g.addColorStop(1, 'rgba(255,255,255,0)')
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.glow, 0, Math.PI * 2)
                    ctx.fillStyle = g
                    ctx.fill()
                }

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${(p.alpha * t).toFixed(3)})`
                ctx.fill()
            }
        }

        const drawShootingStars = (now) => {
            if (now - lastShoot > nextDelay) {
                shootingStars.push(spawnShoot(W, H))
                lastShoot = now
                nextDelay = rand(2200, 4200)
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i]
                s.life -= s.decay

                if (s.life <= 0 || s.x > W + 320 || s.y > H + 320) {
                    shootingStars.splice(i, 1)
                    continue
                }

                const angle = Math.atan2(s.vy, s.vx)
                const tailLen = s.maxLen * s.life
                const tx = s.x - Math.cos(angle) * tailLen
                const ty = s.y - Math.sin(angle) * tailLen

                const layers = [
                    {
                        lw: (s.width + 5) * s.life,
                        stops: [
                            [0, 'rgba(255,255,255,0)'],
                            [0.55, `rgba(150,180,255,${(s.life * 0.10).toFixed(3)})`],
                            [1, `rgba(255,255,255,${(s.life * 0.28).toFixed(3)})`],
                        ],
                    },
                    {
                        lw: s.width * s.life,
                        stops: [
                            [0, 'rgba(255,255,255,0)'],
                            [0.38, `rgba(235,242,255,${(s.life * 0.42).toFixed(3)})`],
                            [1, `rgba(255,255,255,${(s.life * 0.78).toFixed(3)})`],
                        ],
                    },
                ]

                for (const layer of layers) {
                    const grd = ctx.createLinearGradient(tx, ty, s.x, s.y)
                    layer.stops.forEach(([pos, col]) => grd.addColorStop(pos, col))
                    ctx.beginPath()
                    ctx.strokeStyle = grd
                    ctx.lineWidth = layer.lw
                    ctx.lineCap = 'round'
                    ctx.moveTo(tx, ty)
                    ctx.lineTo(s.x, s.y)
                    ctx.stroke()
                }

                const hSize = (3 + s.width) * s.life
                const head = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hSize * 3)
                head.addColorStop(0, `rgba(255,255,255,${s.life.toFixed(3)})`)
                head.addColorStop(0.35, `rgba(210,228,255,${(s.life * 0.62).toFixed(3)})`)
                head.addColorStop(1, 'rgba(160,185,255,0)')
                ctx.beginPath()
                ctx.arc(s.x, s.y, hSize * 3, 0, Math.PI * 2)
                ctx.fillStyle = head
                ctx.fill()

                s.x += s.vx
                s.y += s.vy
            }
        }

        const frame = (now) => {
            ctx.clearRect(0, 0, W, H)

            if (mode === 'sun') {
                drawSunTheme()
            } else {
                drawMoonTheme()
                drawStars()
                drawShootingStars(now)
            }

            raf = requestAnimationFrame(frame)
        }

        resize()
        raf = requestAnimationFrame(frame)
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [mode])

    return (
        <canvas
            ref={cvRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    )
}