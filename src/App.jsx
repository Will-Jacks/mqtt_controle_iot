import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import MandaMQTT from './components/sendMQTT';

import Componente from './components/h1';


import mqtt from 'mqtt/dist/mqtt'
import { useEffect } from 'react'

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

export default function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(false)
  const [messages, setMessages] = React.useState()

  const host = 'wss://broker.emqx.io:8084/mqtt'

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    }
  }
  useEffect(() => {
    
    
    console.log('Connecting mqtt client')
    const client = mqtt.connect(host, options)
    let cont = 0;
    client.on('connect', () => {
      
      setConnectionStatus(true)
      client.subscribe('WILL/teste')
      if(cont <= 0){client.publish('WILL/teste','Conectado com sucesso!');cont++}

    })

    client.on('message', (topic, payload, packet) => {
      setMessages(payload.toString())
      console.log('New message: ' + payload.toString())
    })
  }, [])
  


  return (
 
      <div>
        <Componente />
        <MandaMQTT />
        
        <h2>{messages && messages}</h2>
      </div>
 
  )
}
