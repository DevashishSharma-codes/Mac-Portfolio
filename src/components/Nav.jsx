import React, { useEffect, useMemo, useState } from 'react'
import './Nav.scss'
import DateTime from './DateTime'

const STORAGE_KEY = 'sky-mode'

function MoonIcon({ size = 16 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
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

function SunIcon({ size = 16 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
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

    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'moon' || saved === 'sun') {
            setMode(saved)
        }
    }, [])

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const updateSkyMode = (nextMode) => {
        setMode(nextMode)
        localStorage.setItem(STORAGE_KEY, nextMode)
        window.dispatchEvent(
            new CustomEvent('sky-mode-change', {
                detail: { mode: nextMode },
            })
        )
    }

    const skyButtonBase = useMemo(
        () => ({
            appearance: 'none',
            outline: 'none',
            color: 'rgba(255,255,255,0.94)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            cursor: 'pointer',
            transition: 'all 180ms ease',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '0' : '8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
        }),
        [isMobile]
    )

    const getSkyButtonStyle = (active) => ({
        ...skyButtonBase,
        border: active
            ? '1px solid rgba(255,255,255,0.28)'
            : '1px solid rgba(255,255,255,0.14)',
        background: active
            ? 'rgba(255,255,255,0.14)'
            : 'rgba(255,255,255,0.08)',
        width: isMobile ? '25px' : 'auto',
        height: isMobile ? '20px' : '32px',
        minWidth: isMobile ? '30px' : 'unset',
        padding: isMobile ? '0' : '0 12px',
        borderRadius: '999px',
        fontSize: isMobile ? '0' : '0.8rem',
    })

    return (
        <div
            className="nav"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: isMobile ? '0 10px' : undefined,
                flexWrap: 'nowrap',
                overflow: 'hidden',
            }}
        >
            <div
                className="left"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '8px' : undefined,
                    minWidth: 0,
                    overflow: 'hidden',
                }}
            >
                <div className="apple-icon" style={{ flexShrink: 0 }}>
                    <img src="/nav-icons/apple.svg" alt="" />
                </div>

                <div
                    className="nav-item"
                    style={{
                        minWidth: 0,
                        maxWidth: isMobile ? '120px' : 'unset',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <p>Devashish Sharma</p>
                </div>

                {!isMobile && (
                    <>
                        <div className="nav-item">
                            <p>File</p>
                        </div>

                        <div className="nav-item">
                            <p>Edit</p>
                        </div>

                        <div className="nav-item">
                            <p>Window</p>
                        </div>

                        <div className="nav-item">
                            <p>Terminal</p>
                        </div>
                    </>
                )}
            </div>

            <div
                className="right"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '6px' : '10px',
                    flexShrink: 0,
                    minWidth: 0,
                }}
            >
                <div
                    className="sky-toggle"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '6px' : '8px',
                        marginRight: isMobile ? '4px' : '8px',
                        flexShrink: 0,
                    }}
                >
                    <button
                        onClick={() => updateSkyMode('moon')}
                        style={getSkyButtonStyle(mode === 'moon')}
                        aria-label="Activate moon mode"
                        title="Moonlight mode"
                    >
                        <MoonIcon size={isMobile ? 13 : 14} />
                        {!isMobile && <span>Moonlight</span>}
                    </button>

                    <button
                        onClick={() => updateSkyMode('sun')}
                        style={getSkyButtonStyle(mode === 'sun')}
                        aria-label="Activate sun mode"
                        title="Sunlit mode"
                    >
                        <SunIcon size={isMobile ? 13 : 14} />
                        {!isMobile && <span>Sunlit</span>}
                    </button>
                </div>

                {!isMobile && (
                    <div className="wifi-icon">
                        <img src="/nav-icons/wifi.svg" alt="WiFi" />
                    </div>
                )}

                <div
                    className="nav-item"
                    style={{
                        whiteSpace: 'nowrap',
                        fontSize: isMobile ? '0.74rem' : undefined,
                    }}
                >
                    <DateTime />
                </div>
            </div>
        </div>
    )
}

export default Nav