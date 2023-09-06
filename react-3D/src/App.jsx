import { useState } from 'react'
import Landing from './components/landingPage/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Landing /> 
    </>
  )
}

export default App
