export const renderAudioVisualizer = (audioFile) => {
  
  const canvas = document.querySelector("canvas")
  const canvasCtx = canvas.getContext("2d")

  const audio = new Audio(audioFile)
  const realAudio = document.querySelector("#real-audio") as HTMLAudioElement


  const audioCtx = new window.AudioContext()
  const analyser = audioCtx.createAnalyser()

  const audioSource = audioCtx.createMediaElementSource(audio)
  audioSource.connect(analyser)
  
  audio.play()
  realAudio.play()

  analyser.fftSize = 256

  const bufferLength = analyser.frequencyBinCount
  const dataArr = new Uint8Array(bufferLength)

  canvasCtx.clearRect(0, 0, 500, 500)

  const draw = () => {
    const drawVisual = requestAnimationFrame(draw)
    
    analyser.getByteFrequencyData(dataArr)
  
    canvasCtx.fillStyle = 'rgb(50, 58, 73)'
    canvasCtx.fillRect(0, 0, 500, 500)
  
    const barWidth = (500 / bufferLength) * 2.5
    let barHeight = undefined
    
    let x = 0
  
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArr[i] / 2
      canvasCtx.fillStyle = `rgb(${barHeight + 100}, 255, 168)`
      canvasCtx.fillRect(x, 500 - barHeight / 2, barWidth, barHeight)
  
      x += barWidth + 1
    }
  }
  
  draw()
}
