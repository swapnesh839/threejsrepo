import React from 'react'
import { Container } from 'react-bootstrap'
import Component1 from './Component/Component1'


const App = () => {
  return (
    <div className="bg-info-subtle w-100 vh-100 d-flex">
      <div style={{ width: "640px", height: "100vh" }} className="m-auto bg-black">
        <Component1 />
      </div>
    </div>
  )
}

export default App