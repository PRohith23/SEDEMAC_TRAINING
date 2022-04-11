import React from 'react'
import './App.css'
import Stock from './Stock.js'

class App extends React.Component{
  render() {
    return (
      <div className='app'>
        <div>
          <Stock/>
        </div>
      </div>
    )
  }
}

export default App
