import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlerts } from '../store/alertsSlice'; // Import du thunk
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import NotificationsIcon from '@mui/icons-material/Notifications';

function HomePage() {
  const dispatch = useDispatch();
  const { filteredItems, status, error } = useSelector(state => state.alerts);
  const [showMore, setShowMore] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const initialDisplayCount = 5;
  const displayedAlerts = showMore ? filteredItems : filteredItems.slice(0, initialDisplayCount);

  useEffect(() => {
    // Lors du montage, on va chercher les données
    if (status === 'idle') {
      dispatch(fetchAlerts());
    }
  }, [status, dispatch]);

  const handleSubscribe = () => {
    setOpenSnackbar(true);
  };

  if (status === 'loading') {
    return <div>Chargement des alertes...</div>;
  }
  if (status === 'failed') {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div className="mtl-page-header" style={{
        backgroundColor: 'white',
        padding: '2rem 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div className="mtl-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Avis et alertes
          </h1>
          
          <button
            onClick={handleSubscribe}
            className="mtl-subscribe-button"
          >
            <NotificationsIcon style={{ marginRight: '0.5rem' }} />
            M'abonner aux alertes
          </button>
        </div>
      </div>

      <main className="mtl-container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <SearchBar />
        <Filters />

        <div style={{ marginTop: '2rem' }}>
          {displayedAlerts.map((alert) => (
            <Link
              key={alert.id}
              to={`/alerte/${alert.id}`}
              style={{
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              <article style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '1.5rem',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <time style={{ color: '#666666' }}>
                    {new Date(alert.date).toLocaleDateString('fr-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="mtl-tag">{alert.district}</span>
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  color: '#0033a0',
                  marginBottom: '1rem'
                }}>
                  {alert.title}
                </h2>
                <span className="mtl-tag">{alert.subject}</span>
              </article>
            </Link>
          ))}

          {filteredItems.length > initialDisplayCount && !showMore && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={() => setShowMore(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #0033a0',
                  color: '#0033a0',
                  borderRadius: '4px',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Voir plus d'alertes
              </button>
            </div>
          )}
        </div>
      </main>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          La fonctionnalité d'abonnement aux alertes n'est pas encore disponible.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default HomePage;