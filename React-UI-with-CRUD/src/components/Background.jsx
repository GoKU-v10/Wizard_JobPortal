import { Box } from '@mui/material';

const Background = ({ children }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url(/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
    }}>
      {children}
    </Box>
  );
};

export default Background;
