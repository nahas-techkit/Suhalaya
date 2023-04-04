import  Lottie from 'lottie-react'
import React from 'react'
import loadingAnimation from './loadingAnimation.json'

function LoadingScreen() {
  return (
    <Lottie animationData={loadingAnimation} loop={true} />
  )
}

export default LoadingScreen