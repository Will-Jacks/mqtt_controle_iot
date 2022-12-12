import '../App'
import React from 'react'

import mqtt from 'mqtt/dist/mqtt'
import { useEffect } from 'react'

import './btnStyle.css'

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

export default function MandaMQTT() {
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
    
    client.on('connect', () => {
      setConnectionStatus(true)
      client.subscribe('WILL/teste')
    })

    client.on('message', (topic, payload, packet) => {
      setMessages(payload.toString())
      console.log('New message: ' + payload.toString())
    })
  }, [])

    function handleClick(message) {
        const client = mqtt.connect(host, options)
        client.subscribe('WILL/teste')
        return client.publish('WILL/teste', message)
    }

    return(
        <div>
            <button type='button' onClick={ () => handleClick('Frente')}>Frente</button>
            <div>
                <button type='button' onClick={ () => handleClick('Esquerda')}>Esquerda</button>
                <button type='button' onClick={ () => handleClick('Direita')}>Direita</button>
            </div>
            <button type='button' onClick={ () => handleClick('Tras')}>Trás</button>
        </div>
    )

}