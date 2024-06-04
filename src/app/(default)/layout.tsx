"use client"
import * as React from 'react';
import { CssVarsProvider, StyledEngineProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useEffect } from 'react';



export default function RootLayout({ 
    children,
} :{
    children: React.ReactNode;
}) {

    const checkToken = () => {
        const token = localStorage.getItem('token');
        console.log(token);
            if (!token) {
                window.location.href = '/';
            }
    }

    useEffect(() => {
        checkToken();
    }, []);
    
    
  return (
    <div>
      <StyledEngineProvider injectFirst>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
                <Header />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                    pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        md: 3,
                    },
                    pb: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                    },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                    overflow: 'auto',
                    }}
                >
                    {children}
                </Box>
                </Box>
            </CssVarsProvider>
            </StyledEngineProvider>
    </div>
  );
}

