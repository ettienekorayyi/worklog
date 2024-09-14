import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const card = (title) => (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {title}
      </Typography>
      <Typography variant="h1" component="div" sx={{ textAlign: 'left', fontWeight: '800 !important', fontFamily: 'Comfortaa !important' }}>
        20
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {/* <ArrowUpwardIcon sx={{ position: 'relative', top: '5px', right: '2px', color: 'green' }} /> */}
        <Typography variant="span"></Typography>
      </Typography>
      
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function DashboardCard({ title }) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined" sx={{ border: 'none' }}>
        {card(title)}
      </Card>
    </Box>
  );
}

