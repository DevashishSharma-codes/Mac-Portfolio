
import React, { useEffect,useState } from 'react'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MacWindow from './MacWindow'
import "./note.scss"
const Note = ({ setWindowsState , windowName}) => {
    const [markdownContent, setMarkdownContent] = useState(null);
    useEffect(()=>{
       fetch('/note.txt')
       .then(response => response.text())

       .then(text => setMarkdownContent(text))
    },[])
    
  return (
    <MacWindow setWindowsState={setWindowsState} windowName="Note" >
        <div className="note-window">
      { markdownContent ? <SyntaxHighlighter language='typescript' style={atelierDuneDark} >{markdownContent}</SyntaxHighlighter> : <p>Loading...</p> }
        </div>
    </MacWindow>
  )
}

export default Note