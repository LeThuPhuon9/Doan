import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Box,
  IconButton,
  Tooltip 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import wordApi from 'apis/wordApi';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
  },
  wordTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  actions: {
    marginTop: theme.spacing(2),
  },
  approve: {
    color: theme.palette.success.main,
  },
  reject: {
    color: theme.palette.error.main,
  },
}));

function WordApproval() {
  const classes = useStyles();
  const [pendingWords, setPendingWords] = useState([]);

  useEffect(() => {
    loadPendingWords();
  }, []);

  const loadPendingWords = async () => {
    try {
      const response = await wordApi.getPendingWords();
      console.log('API Response:', response);
      
      // Extract the list array from response
      const words = response?.data?.list || [];
      setPendingWords(words);
    } catch (error) {
      console.error('Failed to load pending words:', error);
      setPendingWords([]);
    }
  };

  const handleApprove = async (wordId) => {
    try {
      await wordApi.approveWord(wordId);
      loadPendingWords(); // Reload the list
    } catch (error) {
      console.error('Failed to approve word:', error);
    }
  };

  const handleReject = async (wordId) => {
    try {
      await wordApi.rejectWord(wordId);
      loadPendingWords(); // Reload the list
    } catch (error) {
      console.error('Failed to reject word:', error);
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Word Approval Dashboard
      </Typography>

      {pendingWords.map((word) => (
        <Card key={word._id} className={classes.card}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" className={classes.wordTitle}>
                  {word.word}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Type: {word.type} | Level: {word.level} | Specialty: {word.specialty}
                </Typography>
                <Typography variant="body1">
                  Meaning: {word.mean}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phonetic: {word.phonetic}
                </Typography>
                {word.examples?.length > 0 && (
                  <Typography variant="body2">
                    Examples: {word.examples.join(', ')}
                  </Typography>
                )}
                {word.synonyms?.length > 0 && (
                  <Typography variant="body2">
                    Synonyms: {word.synonyms.join(', ')}
                  </Typography>
                )}
                {word.antonyms?.length > 0 && (
                  <Typography variant="body2">
                    Antonyms: {word.antonyms.join(', ')}
                  </Typography>
                )}
                {word.note && (
                  <Typography variant="body2">
                    Note: {word.note}
                  </Typography>
                )}
                {word.picture && (
                  <Box mt={2}>
                    <img 
                      src={word.picture} 
                      alt={word.word}
                      style={{ maxWidth: '200px', height: 'auto' }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" justifyContent="flex-end" className={classes.actions}>
                  <Tooltip title="Approve">
                    <IconButton 
                      onClick={() => handleApprove(word._id)}
                      className={classes.approve}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton 
                      onClick={() => handleReject(word._id)}
                      className={classes.reject}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {pendingWords.length === 0 && (
        <Typography variant="body1" align="center">
          No pending words to review
        </Typography>
      )}
    </Container>
  );
}

export default WordApproval;