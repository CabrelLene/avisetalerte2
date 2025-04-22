import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      title: "Travaux majeurs sur la rue Sainte-Catherine",
      date: "2024-03-20",
      district: "Ville-Marie",
      content: "Des travaux de réfection majeurs de la chaussée auront lieu sur la rue Sainte-Catherine entre les rues Peel et de la Montagne. Ces travaux pourraient causer des perturbations importantes de la circulation.",
      subject: "Travaux",
      dateDebut: "2024-03-20",
      dateFin: "2024-04-20"
    },

    {
        id: 2,
        title: "Fermeture temporaire de la piscine du parc Laurier",
        date: "2024-03-21",
        district: "Le Plateau-Mont-Royal",
        content: "La piscine du parc Laurier sera temporairement fermée du 21 mars au 15 avril 2024 pour des travaux de maintenance essentiels. Ces travaux comprennent :\n\n- Rénovation du système de filtration\n- Mise à niveau des vestiaires\n- Réparation du système de chauffage\n\nPendant cette période, les résidents sont invités à utiliser les installations suivantes :\n- Piscine du YMCA du Parc (5550 avenue du Parc)\n- Piscine Saint-Roch (400 avenue Ball)\n\nNous nous excusons pour les inconvénients et vous remercions de votre compréhension.",
        subject: "Installations",
        dateDebut: "2024-03-21",
        dateFin: "2024-04-15"
      },
      {
        id: 3,
        title: "Travaux majeurs sur la rue Saint-Denis",
        date: "2024-03-22",
        district: "Rosemont",
        content: "Des travaux majeurs de réfection débuteront sur la rue Saint-Denis entre les rues Beaubien et Jean-Talon. Ces travaux incluent le remplacement des conduites d'eau et la réfection complète de la chaussée.\n\nImpacts:\n- Fermeture complète de la rue\n- Déviation des lignes d'autobus\n- Stationnement interdit\n\nDurée prévue: 12 semaines\nHoraire des travaux: 7h à 19h, du lundi au vendredi",
        subject: "Travaux",
        dateDebut: "2024-03-22",
        dateFin: "2024-06-22"
      }
    // Ajoutez plus d'alertes fictives ici
  ],
  filteredItems: [],
  activeFilters: {
    search: '',
    district: '',
    subject: '',
    dateDebut: '',
    dateFin: ''
  }
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    ...initialState,
    filteredItems: initialState.items
  },
  reducers: {
    setFilters: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        ...action.payload
      };
      
      // Appliquer les filtres
      let filtered = [...state.items];
      
      // Filtre de recherche
      if (state.activeFilters.search) {
        const searchTerm = state.activeFilters.search.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filtre par arrondissement
      if (state.activeFilters.district) {
        filtered = filtered.filter(item => 
          item.district === state.activeFilters.district
        );
      }
      
      // Filtre par sujet
      if (state.activeFilters.subject) {
        filtered = filtered.filter(item => 
          item.subject === state.activeFilters.subject
        );
      }
      
      // Filtre par date
      if (state.activeFilters.dateDebut) {
        filtered = filtered.filter(item => 
          new Date(item.dateDebut) >= new Date(state.activeFilters.dateDebut)
        );
      }
      
      if (state.activeFilters.dateFin) {
        filtered = filtered.filter(item => 
          new Date(item.dateFin) <= new Date(state.activeFilters.dateFin)
        );
      }
      
      state.filteredItems = filtered;
    },
    
    clearFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
      state.filteredItems = state.items;
    }
  }
});

export const { setFilters, clearFilters } = alertsSlice.actions;
export default alertsSlice.reducer;