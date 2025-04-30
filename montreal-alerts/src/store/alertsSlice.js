import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour charger les données depuis l’API de la Ville de Montréal
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async () => {
    // URL de l’API JSON
    const url = 'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336';
    const response = await fetch(url);
    const data = await response.json();

    // On récupère le tableau d’enregistrements dans data.result.records
    // Puis on mappe ces enregistrements pour obtenir un format cohérent
    // Étant donné que la structure de l’API diffère, vous devrez adapter
    // la correspondance des champs (title → titre, content → description, etc.)
    // Ci-dessous juste un exemple simplifié :
    const records = data.result.records.map((item, index) => ({
      id: index + 1,
      title: item.titre || 'Alerte sans titre',
      date: item.date || new Date().toISOString().slice(0, 10),
      district: item.arrondissement || 'Non spécifié',
      content: item.message || 'Pas de contenu',
      subject: item.sujet || 'Sujet inconnu',
      dateDebut: item.date_debut || new Date().toISOString().slice(0, 10),
      dateFin: item.date_fin || new Date().toISOString().slice(0, 10)
    }));

    return records;
  }
);

const initialState = {
  // On laisse items vide au départ
  items: [],
  filteredItems: [],
  activeFilters: {
    search: '',
    // On utilise désormais des tableaux
    districts: [],
    subjects: [],
    dateDebut: '',
    dateFin: ''
  },
  status: 'idle', // Pour suivre l’état de la requête
  error: null
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // fusionner les anciens filtres avec la payload
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload
      };

      // On applique maintenant les filtres
      let filtered = [...state.items];

      const { search, districts, subjects, dateDebut, dateFin } = state.activeFilters;

      // Filtre de recherche sur le titre
      if (search) {
        const searchTerm = search.toLowerCase();
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchTerm)
        );
      }

      // Filtre par arrondissements multiples
      if (districts.length > 0) {
        filtered = filtered.filter(item =>
          districts.includes(item.district)
        );
      }

      // Filtre par sujets multiples
      if (subjects.length > 0) {
        filtered = filtered.filter(item =>
          subjects.includes(item.subject)
        );
      }

      // Filtre par date (intervalle)
      if (dateDebut) {
        filtered = filtered.filter(item =>
          new Date(item.dateDebut) >= new Date(dateDebut)
        );
      }
      if (dateFin) {
        filtered = filtered.filter(item =>
          new Date(item.dateFin) <= new Date(dateFin)
        );
      }

      state.filteredItems = filtered;
    },
    clearFilters: (state) => {
      // On réinitialise complètement
      state.activeFilters = {
        search: '',
        districts: [],
        subjects: [],
        dateDebut: '',
        dateFin: ''
      };
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Les items sont chargés depuis l’API
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFilters, clearFilters } = alertsSlice.actions;

export default alertsSlice.reducer;