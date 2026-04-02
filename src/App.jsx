import React from 'react'
import './app.scss'
import { useState } from 'react'
import ParticleBg from './components/ParticleBg'
import Dock from './components/Dock.jsx'
import Nav from './components/Nav.jsx'

import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'

const App = () => {

    const [WindowsState, setWindowsState] = useState({
        github: false,
        note: false,
        resume: false,
        spotify: false,
        cli: false
    })

    return (
        <main>

            {/* Stripe style shader background */}
            <div className="shader-bg">
                <div className="shader-stripes"></div>
                <div className="shader-overlay"></div>
            </div>
            <ParticleBg />
            {/* Hero Section */}
            <div className="hero-landing">
                <div className="hero-badge">
                    Built with React + Vite &nbsp;→
                </div>

                <h1 className="hero-title">
                    This MacBook is<br />
                    Built on React,<br />
                    No kidding.
                </h1>

                <p className="hero-subtitle">
                    Hi, I'm Devashish Sharma, <br />
                    a full-stack developer with a passion for building innovative web applications.<br />
                    Use the Dock below to explore my work and get in touch.
                </p>
            </div>

            <Nav />

            <Dock setWindowsState={setWindowsState} />

            {WindowsState.github && <Github windowName='GitHub' setWindowsState={setWindowsState} />}
            {WindowsState.note && <Note windowName='Note' setWindowsState={setWindowsState} />}
            {WindowsState.resume && <Resume windowName='Resume' setWindowsState={setWindowsState} />}
            {WindowsState.spotify && <Spotify windowName='Spotify' setWindowsState={setWindowsState} />}
            {WindowsState.cli && <Cli windowName='CLI' setWindowsState={setWindowsState} />}

        </main>
    )
}

export default App