import Confetti from 'react-confetti'

type ConfettiEffectProps = {
  active: boolean
}

function ConfettiEffect({ active }: ConfettiEffectProps) {
  if (!active) {
    return null
  }
  return <Confetti tweenDuration={100} />
}

export default ConfettiEffect
