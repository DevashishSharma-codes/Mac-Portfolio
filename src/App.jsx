import React from 'react'
import './app.scss'
import { useState } from 'react'
import Dock from './components/Dock.jsx'
import Nav from './components/Nav.jsx'
import Github from './components/windows/Github';
import Note from './components/windows/Note';
import Resume from './components/windows/Resume';
import Spotify from './components/windows/Spotify';
import Cli from './components/windows/Cli';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github.js'

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
      <Nav></Nav>
      <Dock setWindowsState={setWindowsState}></Dock>
      {WindowsState.github && <Github windowName='GitHub' setWindowsState={setWindowsState}/>}
      {WindowsState.note && <Note windowName='Note' setWindowsState={setWindowsState}/>}
      {WindowsState.resume && <Resume windowName='Resume' setWindowsState={setWindowsState}/>}
      {WindowsState.spotify && <Spotify windowName='Spotify' setWindowsState={setWindowsState}/>}
      {WindowsState.cli && <Cli windowName='CLI' setWindowsState={setWindowsState}/>}
    </main>
  )
}

export default App
