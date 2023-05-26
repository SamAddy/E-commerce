import React, { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'
import { FormControlLabel, Switch, styled } from '@mui/material'

export const StyledContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    textEmphasisColor:"",
    padding: '1rem',
  }))

const ThemeSwitcher = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="secondary"
                />
            }
            label="Dark Mode"
        />
    )
}

export default ThemeSwitcher