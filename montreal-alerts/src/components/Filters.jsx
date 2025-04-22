import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../store/alertsSlice';

function Filters() {
  const dispatch = useDispatch();
  const activeFilters = useSelector(state => state.alerts.activeFilters);

  const handleFilterChange = (type, value) => {
    dispatch(setFilters({ [type]: value }));
  };

  const districts = [
    "Ville-Marie",
    "Le Plateau-Mont-Royal",
    "Rosemont",
    "Sud-Ouest",
    "Côte-des-Neiges",
    "Outremont"
  ];

  const subjects = [
    "Travaux",
    "Services",
    "Circulation",
    "Environnement",
    "Événements",
    "Installations"
  ];

  const renderFilter = (label, name, value, options) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#666666',
        fontSize: '0.875rem'
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => handleFilterChange(name, e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          fontSize: '1rem',
          color: '#242424',
          backgroundColor: 'white'
        }}
      >
        <option value="">Tous</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {renderFilter('Arrondissement', 'district', activeFilters.district, districts)}
        {renderFilter('Sujet', 'subject', activeFilters.subject, subjects)}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#666666',
            fontSize: '0.875rem'
          }}>
            Période
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="date"
              value={activeFilters.dateDebut}
              onChange={(e) => handleFilterChange('dateDebut', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <input
              type="date"
              value={activeFilters.dateFin}
              onChange={(e) => handleFilterChange('dateFin', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      {Object.values(activeFilters).some(value => value) && (
        <button
          onClick={() => dispatch(clearFilters())}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            border: '1px solid #0033a0',
            borderRadius: '4px',
            background: 'none',
            color: '#0033a0',
            cursor: 'pointer'
          }}
        >
          Effacer les filtres
        </button>
      )}
    </div>
  );
}

export default Filters;