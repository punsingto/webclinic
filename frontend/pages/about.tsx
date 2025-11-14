export default function About() {
  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>About Webclinic</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        Webclinic is a modern full-stack web application built with cutting-edge technologies.
      </p>

      <section style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2>Project Structure</h2>
        <p>This monorepo contains two main components:</p>
        <ul style={{ fontSize: '1rem', lineHeight: '1.8' }}>
          <li>
            <strong>Frontend:</strong> A Next.js application with TypeScript for type-safe React components
          </li>
          <li>
            <strong>Backend:</strong> A Go service using Fiber framework for high-performance REST APIs
          </li>
        </ul>
      </section>

      <section>
        <h2>Getting Started</h2>
        <pre style={{
          backgroundColor: '#f4f4f4',
          padding: '1rem',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
{`# Install frontend dependencies
cd frontend
npm install
npm run dev

# In another terminal, start the backend
cd backend
go mod download
go run ./cmd/server
`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Integration Tests</h2>
        <p>Run integration tests to verify frontend-backend communication:</p>
        <pre style={{
          backgroundColor: '#f4f4f4',
          padding: '1rem',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
{`./integration_test.sh`}
        </pre>
      </section>
    </main>
  )
}
