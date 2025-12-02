import { useState } from 'react'
import './App.css'
import Recipe from './components/Recipie'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Recipe/>
    </>
  )
}

export default App
