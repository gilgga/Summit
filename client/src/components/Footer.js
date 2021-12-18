import react from 'react';
import { Box, Container, Grid } from '@material-ui/core';

const Footer = (props) => {
    return (
        <footer>
            <Box px={{ xs: 3 }} py={{ xs: 3 }} bgcolor="darkGrey">
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>Made with ♡ by the Summit Team</p>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;