import React from 'react'
import './Morphtext.scss'

const LINE_ONE = [
  "Hi,", "I'm", "Devashish", "Sharma,", "Computer", "Science",
  "undergraduate", "passionate", "about", "Full", "Stack",
  "Development", "and", "Generative", "AI,", "building", "scalable",
  "platforms,", "intelligent", "APIs,", "and", "impactful", "digital",
  "products."
]

const LINE_TWO_NORMAL = ["Explore", "my", "work", "through", "the"]
const LINE_TWO_HIGHLIGHT = ["Dock", "below", "and", "get", "in", "touch."]

const Morphtext = () => {
  let index = 0

  const renderWords = (words, extraClass = '') =>
    words.map((word) => {
      const delay = `${index * 0.08}s`
      index++

      return (
        <span
          key={`${word}-${index}`}
          className={`morph-word ${extraClass}`}
          style={{ animationDelay: delay }}
        >
          {word}
        </span>
      )
    })

  return (
    <div className="hero-subtitle morph-container">
      <div className="morph-line">
        {renderWords(LINE_ONE)}
      </div>

      <div className="morph-line">
        {renderWords(LINE_TWO_NORMAL)}
        {renderWords(LINE_TWO_HIGHLIGHT, 'hero-highlight')}
      </div>
    </div>
  )
}

export default Morphtext