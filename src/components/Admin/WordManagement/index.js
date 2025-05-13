import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Box,
  IconButton,
  Tooltip,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PendingIcon from '@material-ui/icons/History';
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
  pending: {
    color: theme.palette.warning.main,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  image: {
    maxWidth: '200px',
    height: 'auto',
    marginTop: theme.spacing(2),
  },
}));

function WordManagement() {
  const classes = useStyles();
  const [approvedWords, setApprovedWords] = useState([]);

  useEffect(() => {
    loadApprovedWords();
  }, []);

  const loadApprovedWords = async () => {
    try {
      const response = await wordApi.getApprovedWords();
      const words = response?.data?.list || [];
      setApprovedWords(words);
    } catch (error) {
      console.error('Failed to load approved words:', error);
      setApprovedWords([]);
    }
  };

  const handleSetToPending = async (wordId) => {
    try {
      await wordApi.setWordToPending(wordId);
      loadApprovedWords();
    } catch (error) {
      console.error('Failed to set word to pending:', error);
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Word Management
      </Typography>

      {approvedWords.map((word) => (
        <Card key={word._id} className={classes.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" className={classes.wordTitle}>
                    {word.word} [{word.phonetic}]
                  </Typography>
                  <Tooltip title="Set to Pending">
                    <IconButton 
                      onClick={() => handleSetToPending(word._id)}
                      className={classes.pending}
                    >
                      <PendingIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography variant="subtitle1" color="textSecondary">
                  Type: {word.type} | Level: {word.level} | Specialty: {word.specialty}
                </Typography>

                <Typography variant="body1" paragraph>
                  <strong>Meaning:</strong> {word.mean}
                </Typography>

                {word.note && (
                  <Typography variant="body2" paragraph>
                    <strong>Note:</strong> {word.note}
                  </Typography>
                )}

                {word.examples?.length > 0 && (
                  <Box mb={2}>
                    <Typography variant="subtitle2">Examples:</Typography>
                    {word.examples.map((example, index) => (
                      <Typography key={index} variant="body2">
                        • {example}
                      </Typography>
                    ))}
                  </Box>
                )}

                {word.synonyms?.length > 0 && (
                  <Box mb={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      Synonyms:
                    </Typography>
                    {word.synonyms.map((synonym, index) => (
                      <Chip
                        key={index}
                        label={synonym}
                        size="small"
                        className={classes.chip}
                      />
                    ))}
                  </Box>
                )}

                {word.antonyms?.length > 0 && (
                  <Box mb={1}>
                    <Typography variant="subtitle2" gutterBottom>
                      Antonyms:
                    </Typography>
                    {word.antonyms.map((antonym, index) => (
                      <Chip
                        key={index}
                        label={antonym}
                        size="small"
                        className={classes.chip}
                      />
                    ))}
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                {word.picture && (
                  <img 
                    src={word.picture} 
                    alt={word.word}
                    className={classes.image}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {approvedWords.length === 0 && (
        <Typography variant="body1" align="center">
          No approved words found
        </Typography>
      )}
    </Container>
  );
}

export default WordManagement;