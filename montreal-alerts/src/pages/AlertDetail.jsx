import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AlertDetail() {
  const { id } = useParams();
  const alert = useSelector(state => 
    state.alerts.items.find(item => item.id === parseInt(id))
  );

  if (!alert) {
    return (
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#0033a0',
            textDecoration: 'none',
            fontSize: '1rem',
            marginBottom: '2rem'
          }}
        >
          <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
          Retour à la liste des avis
        </Link>
        <h1>Alerte non trouvée</h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      {/* En-tête de la page */}
      <header className="mtl-page-header" style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '2rem 0'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#0033a0',
              textDecoration: 'none',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
            Retour à la liste des avis
          </Link>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#000000',
            margin: '0'
          }}>
            {alert.title}
          </h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <article style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* Métadonnées de l'alerte */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2rem',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '1.5rem'
          }}>
            {/* Date */}
            <div>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#666666',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>
                Date de publication
              </h2>
              <p style={{ margin: 0, color: '#242424' }}>
                {new Date(alert.date).toLocaleDateString('fr-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Arrondissement */}
            <div>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#666666',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>
                Arrondissement
              </h2>
              <p style={{ margin: 0, color: '#242424' }}>
                {alert.district}
              </p>
            </div>

            {/* Sujet */}
            <div>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#666666',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>
                Sujet
              </h2>
              <p style={{ margin: 0, color: '#242424' }}>
                {alert.subject}
              </p>
            </div>

            {/* Période */}
            <div>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#666666',
                marginBottom: '0.5rem',
                textTransform: 'uppercase'
              }}>
                Période
              </h2>
              <p style={{ margin: 0, color: '#242424' }}>
                Du {new Date(alert.dateDebut).toLocaleDateString('fr-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} au {new Date(alert.dateFin).toLocaleDateString('fr-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Contenu de l'alerte */}
          <div style={{
            color: '#242424',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            {alert.content.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Bouton de retour en bas de page */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#0033a0',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid #0033a0',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
          >
            <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
            Retour à la liste des avis
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AlertDetail;