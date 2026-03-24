import React from 'react'
import Macwindow from './MacWindow'
import "./resume.scss"
const Resume = ({ setWindowsState , windowName}) => {
  return (
    <Macwindow setWindowsState={setWindowsState}  windowName={windowName}>
        <div className="resume">
          <embed src="/resume.pdf" frameborder="0"></embed>
        </div>
    </Macwindow>
  )
}

export default Resume