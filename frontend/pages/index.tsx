import React, {useEffect, useState} from 'react'

export default function Home() {
  const [msg, setMsg] = useState('loading...')
  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(d => setMsg(d.message || JSON.stringify(d)))
      .catch(() => setMsg('failed'))
  }, [])

  return (
    <main style={{padding: 20}}>
      <h1>Webclinic</h1>
      <p>Backend says: {msg}</p>
    </main>
  )
}
