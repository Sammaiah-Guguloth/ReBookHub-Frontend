// components/TypewriterText.jsx
import React, { useEffect, useState } from 'react'
import HilightTextOrange from './HilightTextOrange'

const TypewriterText = ({ text = "", speed = 170, pause = 600 }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (index < text.length) {
          setDisplayedText(prev => prev + text[index])
          setIndex(prev => prev + 1)
        } else {
          setDeleting(true)
          setTimeout(() => {}, pause)
        }
      } else {
        if (index > 0) {
          setDisplayedText(prev => prev.slice(0, -1))
          setIndex(prev => prev - 1)
        } else {
          setDeleting(false)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [index, deleting])

  return (
    <span className=''><HilightTextOrange>{displayedText}</HilightTextOrange></span>
  )
}

export default TypewriterText
