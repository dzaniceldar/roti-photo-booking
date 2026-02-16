import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#fff', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1 style={{ color: '#d4a853', marginBottom: 16 }}>Greška u aplikaciji</h1>
          <pre style={{ background: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 8, overflow: 'auto', textAlign: 'left' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 16, padding: '12px 24px', background: '#d4a853', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            Osvježi stranicu
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
