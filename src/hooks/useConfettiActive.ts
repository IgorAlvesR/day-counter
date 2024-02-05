import { useState } from 'react'
import confettiSound from '../assets/sound.mp3'

function useConfettiActive() {
  const [confettiActive, setConfettiActive] = useState(false)

  const handleActiveConfetti = () => {
    setConfettiActive(true)

    const sound = new Audio(confettiSound)
    sound.volume = 1

    sound.play()

    setTimeout(() => {
      sound.pause()
      setConfettiActive(false)
    }, 5000)
  }

  return {
    confettiActive,
    handleActiveConfetti,
  }
}

export default useConfettiActive
