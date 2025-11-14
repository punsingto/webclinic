import React, { useEffect, useState } from 'react'

export default function Home() {
  const [msg, setMsg] = useState('loading...')
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(d => setMsg(d.message || JSON.stringify(d)))
      .catch(() => setMsg('failed'))

    // Also check backend health
    fetch('http://localhost:8080/api/health')
      .then(r => r.json())
      .then(d => setStatus(d.status || 'unknown'))
      .catch(() => setStatus('offline'))
  }, [])

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to Webclinic</h1>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          A full-stack monorepo with Next.js frontend and Go Fiber backend.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Backend Status</h2>
          <p style={{ fontSize: '1.2rem' }}>
            Health: <strong style={{ color: status === 'ok' ? '#27ae60' : '#e74c3c' }}>
              {status}
            </strong>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Endpoint: <code>GET http://localhost:8080/api/health</code>
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>API Response</h2>
          <p style={{ fontSize: '1.2rem' }}>
            Message: <strong>{msg}</strong>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Endpoint: <code>GET /api/hello</code>
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px'
      }}>
        <h3>Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> Next.js 14.1.0 + TypeScript + React 18.2.0</li>
          <li><strong>Backend:</strong> Go + Fiber 2.52.9</li>
          <li><strong>Architecture:</strong> REST API communication</li>
        </ul>
      </div>
    </main>
  )
}
