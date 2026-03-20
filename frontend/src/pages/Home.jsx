import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ ...styles.panel, ...styles.leftPanel }}>
          <h1 style={styles.title}>New User ?</h1>
           <Link to="/register" style={styles.button}>SIGN UP</Link>
          <h1 style={styles.title}>Already A Customer !</h1>
         
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={styles.button}>SIGN IN</Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f8',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  card: {
    display: 'flex',
    width: '900px',
    maxWidth: '100%',
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
    overflow: 'hidden'
  },
  panel: {
    flex: 1,
    padding: '40px',
    color: '#222',
    minHeight: '440px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftPanel: {
    background: 'linear-gradient(160deg, #4b6cb7, #182848)'
  },
  rightPanel: {
    background: '#f7f7f7'
  },
  title: {
    color: '#fff',
    fontSize: '2rem',
    marginBottom: '15px'
  },
  text: {
    color: '#fafafa',
    marginBottom: '25px',
    textAlign: 'center',
    maxWidth: '280px'
  },
  button: {
    margin: '10px 0',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#5a41ff',
    fontWeight: 600,
    cursor: 'pointer'
  }
};