// import './App.css'
import { Navigation } from './Layout/Navigation'
import { Container } from '@mui/material'
import { AppContextProvider } from './contexts/AppContextProvider'
import { Houses } from './page/Houses'


function App() {

  return (
    <Container maxWidth="md">
      <AppContextProvider>
        <h1>Simply Tibia stuff</h1>
        <Navigation />
        <Houses />
      </AppContextProvider>
    </Container>
  )
}

export default App
