import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../store/alertsSlice';

function Filters() {
  const dispatch = useDispatch();
  const { districts, subjects, dateDebut, dateFin } = useSelector(state => state.alerts.activeFilters);

  // On définit la liste de valeurs possibles
  const allDistricts = [
    'Ville-Marie',
    'Le Plateau-Mont-Royal',
    'Rosemont',
    'Sud-Ouest',
    'Côte-des-Neiges',
    'Outremont'
  ];
  const allSubjects = [
    'Travaux',
    'Services',
    'Circulation',
    'Environnement',
    'Événements',
    'Installations'
  ];

  // Gérer le clic sur une case à cocher (arrondissement)
  const handleDistrictCheck = (district) => {
    let newDistricts = [...districts];
    if (newDistricts.includes(district)) {
      // si déjà présent, on retire
      newDistricts = newDistricts.filter(d => d !== district);
    } else {
      // sinon on ajoute
      newDistricts.push(district);
    }
    dispatch(setFilters({ districts: newDistricts }));
  };

  // Pour les sujets
  const handleSubjectCheck = (subject) => {
    let newSubjects = [...subjects];
    if (newSubjects.includes(subject)) {
      newSubjects = newSubjects.filter(s => s !== subject);
    } else {
      newSubjects.push(subject);
    }
    dispatch(setFilters({ subjects: newSubjects }));
  };

  // Gérer les dates
  const handleDateChange = (name, value) => {
    dispatch(setFilters({ [name]: value }));
  };

  const hasActiveFilter = 
    districts.length > 0 ||
    subjects.length > 0 ||
    dateDebut ||
    dateFin;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '4px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Arrondissements</p>
          {allDistricts.map((d) => (
            <div key={d} style={{ marginBottom: '0.25rem' }}>
              <input
                type="checkbox"
                checked={districts.includes(d)}
                onChange={() => handleDistrictCheck(d)}
                id={`dist-${d}`}
              />
              <label htmlFor={`dist-${d}`} style={{ marginLeft: '0.5rem' }}>
                {d}
              </label>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '1rem', borderRadius: '4px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Sujets</p>
          {allSubjects.map((s) => (
            <div key={s} style={{ marginBottom: '0.25rem' }}>
              <input
                type="checkbox"
                checked={subjects.includes(s)}
                onChange={() => handleSubjectCheck(s)}
                id={`sub-${s}`}
              />
              <label htmlFor={`sub-${s}`} style={{ marginLeft: '0.5rem' }}>
                {s}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '1rem',
        background: 'white',
        padding: '1rem',
        borderRadius: '4px'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Période</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Date début (AAAA-MM-JJ)"
            value={dateDebut}
            onChange={(e) => handleDateChange('dateDebut', e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="text"
            placeholder="Date fin (AAAA-MM-JJ)"
            value={dateFin}
            onChange={(e) => handleDateChange('dateFin', e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
      </div>

      {hasActiveFilter && (
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
          Tout effacer
        </button>
      )}
    </div>
  );
}

export default Filters;