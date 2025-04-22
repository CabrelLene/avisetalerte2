import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { setFilters } from '../store/alertsSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    dispatch(setFilters({ search: value }));
  };

  return (
    <div style={{
      marginBottom: '1.5rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '0.75rem',
        backgroundColor: 'white'
      }}>
        <SearchIcon style={{ 
          color: '#666666',
          marginRight: '0.75rem'
        }} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher un avis ou une alerte"
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '1rem',
            color: '#242424'
          }}
        />
        {searchValue && (
          <button
            onClick={() => handleSearch('')}
            style={{
              border: 'none',
              background: 'none',
              padding: '4px',
              cursor: 'pointer'
            }}
          >
            <ClearIcon style={{ color: '#666666' }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;