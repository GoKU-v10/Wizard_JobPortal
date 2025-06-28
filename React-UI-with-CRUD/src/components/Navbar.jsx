import React from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Grid,
    Typography,
    Button,
  } from "@mui/material";
  
  
const Navbar = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
        <Box sx={{ flexGrow: 1 }}>
<AppBar position="fixed" style={{ background: 'Black' }}>
            <Toolbar variant="dense">
<Typography variant="h4" align='left' component="div" sx={{ flexGrow: 1, fontFamily:"revert", fontWeight: 400, color:"white" }}>
                <b>Wizard</b> <small><span style={{ marginLeft: '1rem',fontSize:'1.4rem' }} ><i>JobPortal</i></span></small>
              </Typography>

              <Box sx={{ m: 1.5, mx: 'auto', width: 80 }}>
<Button variant="outlined" href='http://localhost:3000' sx={{ color: 'whitesmoke', borderColor: 'white' }}>Home</Button>
               </Box>
              <Box sx={{ m: 1.5, mx: 'auto', width: 100 }}>
<Button variant="outlined" href='http://localhost:3000/create' sx={{ color: 'whitesmoke', borderColor: 'whitesmoke' }}>Add Job</Button>
              </Box>
      
        </Toolbar>
      </AppBar>
    </Box>
    </Grid>
      <Grid item xs={12} md={12} lg={12}>
      </Grid>
    </div>
  )
}

export default Navbar
