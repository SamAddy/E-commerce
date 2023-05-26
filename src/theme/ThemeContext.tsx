import { createTheme, ThemeProvider as MuiThemeProvider, } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
    darkMode: boolean
    toggleDarkMode: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
    darkMode: false,
    toggleDarkMode: () => { },
})

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode)
    }
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode])
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#ffff',
            },
            secondary: {
                light: '#ff7961',
                main: '#3d5afe',//'#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            }
        },
    })
    const contextValue: ThemeContextType = {
        darkMode,
        toggleDarkMode,
    }
    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={contextValue}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    )
}

