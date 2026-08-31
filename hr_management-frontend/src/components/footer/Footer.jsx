import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#0f172a', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                        HR Management Operations Suite • Full-Stack MERN
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Designed & Developed by <strong style={{ color: '#38bdf8' }}>Saisaran J</strong> | Powered by React, Express, Node.js & MongoDB
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
