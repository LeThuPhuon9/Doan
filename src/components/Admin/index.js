import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  makeStyles 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AdminDashboard() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <AssignmentIcon className={classes.icon} />
              <Typography variant="h5" gutterBottom>
                Word Approval
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Review and approve pending vocabulary words
              </Typography>
              <Button
                component={Link}
                to="/admin/word-approval"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Manage Approvals
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <ListAltIcon className={classes.icon} />
              <Typography variant="h5" gutterBottom>
                Word Management
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Manage existing vocabulary words
              </Typography>
              <Button
                component={Link}
                to="/admin/word-management"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Manage Words
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;