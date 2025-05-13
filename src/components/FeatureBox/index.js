import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, Typography, Grid, Dialog } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    transition: 'all 0.25s',
    cursor: 'pointer',
    borderRadius: 12,
    boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
    },
  },
  img: {
    width: '5rem',
    height: '5rem',
    objectFit: 'contain',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  dialog: {
    padding: theme.spacing(4),
    borderRadius: 16,
  },
  subFeatureCard: {
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s',
    borderRadius: 12,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
      backgroundColor: theme.palette.background.default,
    },
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: '0.95rem',
  },
  dialogTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  }
}));

function FeatureBox({ imgUrl, title, subTitle, to, subFeatures }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (subFeatures) {
      setOpen(true);
    }
  };

  return (
    <>
      <Card className={classes.root} onClick={handleClick}>
        {!subFeatures ? (
          <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <img className={classes.img} src={imgUrl} alt={title} />
                <Box ml={3}>
                  <Typography variant="h6" className={classes.title}>{title}</Typography>
                  <Typography variant="body2" className={classes.subtitle}>{subTitle}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Link>
        ) : (
          <CardContent>
            <Box display="flex" alignItems="center">
              <img className={classes.img} src={imgUrl} alt={title} />
              <Box ml={3}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {subTitle}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box className={classes.dialog}>
          <Typography variant="h5" className={classes.dialogTitle} gutterBottom>{title}</Typography>
          <Grid container spacing={3}>
            {subFeatures?.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card className={classes.subFeatureCard}>
                  <Link to={feature.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <img className={classes.img} src={feature.imgUrl} alt={feature.title} />
                        <Box ml={3}>
                          <Typography variant="h6">{feature.title}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {feature.subTitle}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}

FeatureBox.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  subTitle: PropTypes.string,
};

FeatureBox.defaultProps = {
  imgUrl: '',
  title: '',
  to: '',
  subTitle: '',
};

export default FeatureBox;
