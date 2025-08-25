function TestPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Test Page</h1>
        <p style={{ fontSize: '1.2rem' }}>If you can see this, React and routing are working!</p>
        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem' }}>Time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

export default TestPage;