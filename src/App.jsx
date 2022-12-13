import './App.css'
import React from 'react'

import MandaMQTT from './components/sendMQTT';
import Title from './components/tituloHeader';
import Connector from './components/connection';


export default function App() {
  return (
 
      <div>
        <Title />
        <MandaMQTT />
        <Connector />
      </div>
 
  )
}
