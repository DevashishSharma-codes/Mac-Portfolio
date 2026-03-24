import React from 'react'
import './Dock.scss'
const Dock = ({setWindowsState }) => {
  return (
    <footer className='dock'>
      <div onClick={() => {
        setWindowsState(prev => ({ ...prev, github: true }))
      }} className='icon github'><img src="/doc-icons/github.svg" alt="" /></div>


      <div   onClick={()=>{window.open("https://calendar.google.com/","_blank")}} className='icon calender'><img src="/doc-icons/calender.svg" alt="" /></div>


      <div  onClick={()=>{window.open("https://www.linkedin.com/in/devashish-sharma-aa470832a","_blank")}} className='icon link'><img src="/doc-icons/link.svg" alt="" /></div>

      <div onClick={() => {
        setWindowsState(prev => ({ ...prev, note: true }))
      }} className='icon note'><img src="/doc-icons/note.svg" alt="" /></div>

      <div onClick={() => {
        setWindowsState(prev => ({ ...prev, resume: true }))
      }} className='icon pdf'><img src="/doc-icons/pdf.svg" alt="" /></div>


<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=devashishsharma2157@gmail.com&su=Portfolio%20Contact&body=Hello%20I%20want%20to%20connect"
  target="_blank"
  rel="noopener noreferrer"
  className="icon mail"
>
  <img src="/doc-icons/mail.svg" alt="mail" />
</a>

      <div onClick={() => {
        setWindowsState(prev => ({ ...prev, spotify: true }))
      }} className='icon spotify'><img src="/doc-icons/spotify.svg" alt="" /></div>
      <div onClick={() => {
        setWindowsState(prev => ({ ...prev, cli: true }))
      }} className='icon cli'><img src="/doc-icons/cli.svg" alt="" /></div>
    </footer>
  )
}

export default Dock