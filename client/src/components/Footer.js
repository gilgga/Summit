import { Box, Container, Grid } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#121212',
    },
    action: {
      active: "white",
      activeOpacity: 1,
    }
  },
});

const Footer = (props) => {
    return (
        <footer style={{backgroundColor: "#121212"}}>
            <Box px={{ xs: 3 }} py={{ xs: 3 }} >
                <Container maxWidth="xl" >
                    <Grid container spacing={2} sx={{ backgroundColor: "#121212"}}>
                        <Grid item xs={12}>
                            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', color: "white"}}>Made with ♡ by the Summit Team</p>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;