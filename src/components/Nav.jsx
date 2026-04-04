import React, { useEffect, useState } from 'react'
import './Nav.scss'
import DateTime from './DateTime'

const STORAGE_KEY = 'sky-mode'

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sky-icon">
            <path
                d="M19 14.5A7.5 7.5 0 0 1 9.5 5a8.5 8.5 0 1 0 9.5 9.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sky-icon">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M12 2.5V5.2M12 18.8v2.7M21.5 12h-2.7M5.2 12H2.5M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9M18.7 18.7l-1.9-1.9M7.2 7.2 5.3 5.3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    )
}

const Nav = () => {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved === 'moon' ? 'moon' : 'sun'
    })

    useEffect(() => {
        document.body.classList.remove('theme-sun', 'theme-moon')
        document.body.classList.add(mode === 'sun' ? 'theme-sun' : 'theme-moon')
    }, [mode])

    const updateSkyMode = (nextMode) => {
        setMode(nextMode)
        localStorage.setItem(STORAGE_KEY, nextMode)

        document.body.classList.remove('theme-sun', 'theme-moon')
        document.body.classList.add(nextMode === 'sun' ? 'theme-sun' : 'theme-moon')

        window.dispatchEvent(
            new CustomEvent('sky-mode-change', { detail: { mode: nextMode } })
        )
    }

    return (
        <div className="nav">
            <div className="nav-left">
                <div className="apple-icon">
                    <img src="/nav-icons/apple.svg" alt="" />
                </div>

                <div className="nav-item nav-name">
                    <p>Devashish Sharma</p>
                </div>

                <div className="nav-item nav-desktop-only"><p>File</p></div>
                <div className="nav-item nav-desktop-only"><p>Edit</p></div>
                <div className="nav-item nav-desktop-only"><p>Window</p></div>
                <div className="nav-item nav-desktop-only"><p>Terminal</p></div>
            </div>

            <div className="nav-right">
                <div className="sky-toggle">
                    <button
                        onClick={() => updateSkyMode('moon')}
                        className={`sky-btn${mode === 'moon' ? ' sky-btn--active' : ''}`}
                        aria-label="Activate moon mode"
                        title="Moonlight mode"
                        type="button"
                    >
                        <MoonIcon />
                        <span className="sky-btn-label">Moonlight</span>
                    </button>

                    <button
                        onClick={() => updateSkyMode('sun')}
                        className={`sky-btn${mode === 'sun' ? ' sky-btn--active' : ''}`}
                        aria-label="Activate sun mode"
                        title="Sunlit mode"
                        type="button"
                    >
                        <SunIcon />
                        <span className="sky-btn-label">Sunlit</span>
                    </button>
                </div>

                <div className="wifi-icon nav-desktop-only">
                    <img src="/nav-icons/wifi.svg" alt="WiFi" />
                </div>

                <div className="nav-item nav-datetime">
                    <DateTime />
                </div>
            </div>
        </div>
    )
}

export default Nav