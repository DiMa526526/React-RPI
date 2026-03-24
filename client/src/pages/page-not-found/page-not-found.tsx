import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function PageNotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#333'
      }}>
        PAGE NOT FOUND
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#666',
        margin: '20px 0',
        maxWidth: '500px'
      }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to={AppRoute.Main}
        style={{
          display: 'inline-block',
          marginTop: '30px',
          padding: '12px 30px',
          backgroundColor: '#4481c3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Перейдите на главную страницу
      </Link>
    </div>
  );
}

export { PageNotFound };
