import React from 'react';

interface LoadingPageProps {
  fullScreen?: boolean;
  transparent?: boolean;
  text?: string;
}

const LoadingPage = ({ fullScreen = true, transparent = false, text = "Загрузка предложений..." }: LoadingPageProps) => {
  
  const styles = {
    container: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minHeight: fullScreen ? '100vh' : '400px',
      width: '100%',
      backgroundColor: transparent ? 'transparent' : '#f8f9fa'
    },
    spinnerWrapper: {
      display: 'flex' as const,
      gap: '12px',
      marginBottom: '16px'
    },
    dot: {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#4481c3',
      animation: 'bounce 1.4s infinite ease-in-out both' as const
    },
    text: {
      color: '#666',
      fontSize: '16px',
      margin: 0,
      animation: 'pulse 1.5s infinite' as const,
      fontWeight: 500,
      letterSpacing: '0.3px'
    }
  };

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes bounce {
        0%, 80%, 100% { 
          transform: scale(0);
          opacity: 0.3;
        } 40% { 
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spinnerWrapper}>
        <div style={{...styles.dot, animationDelay: '-0.32s'}} />
        <div style={{...styles.dot, animationDelay: '-0.16s'}} />
        <div style={styles.dot} />
      </div>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

export { LoadingPage };