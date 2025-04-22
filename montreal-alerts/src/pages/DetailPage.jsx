import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DetailPage() {
  const { id } = useParams();
  const alert = useSelector(state => 
    state.alerts.items.find(item => item.id === parseInt(id))
  );

  if (!alert) return <div>Alerte non trouvée</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Retour aux alertes
        </Button>

        <Paper
          component={motion.div}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          sx={{ p: 3 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {alert.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {new Date(alert.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            {alert.content}
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default DetailPage;