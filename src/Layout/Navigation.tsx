import { Tab, Tabs } from "@mui/material"
import HouseIcon from '@mui/icons-material/House'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import { useContext } from "react"
import { Pages } from "../Constants"
import { AppContext } from "../contexts/AppContextProvider"

export const Navigation = () => {
  const [appContext, setAppContext] = useContext(AppContext)

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setAppContext({ page: newTab })
  }

  return (
    <Tabs value={appContext.page} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<HouseIcon />} label="Houses" value={Pages.Houses} />
      <Tab icon={<FavoriteIcon />} label="Guilds" disabled />
      <Tab icon={<PersonPinIcon />} label="Hunting" disabled />
    </Tabs>
  )
}
