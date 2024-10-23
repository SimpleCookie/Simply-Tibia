import { useState } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { useWorlds } from "../hooks/useWorlds"
import { useAllAuctionedHouses } from "../hooks/useAllAuctionedHouses"
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs"
dayjs.extend(relativeTime)

import './houses.css'

const columns = [
  { field: 'name', headerName: 'name', width: 275 },
  { field: 'town', headerName: 'town', width: 150 },
  { field: 'rent', headerName: 'Rent', width: 80 },
  { field: 'auctioned', headerName: 'Auctioned', width: 100 },
  { field: 'currentBid', headerName: 'Current bid', width: 100 },
  {
    field: 'hoursLeft', headerName: 'Time left', width: 100, renderCell: (params: GridRenderCellParams) => {
      const hours = params.value
      return <span>{dayjs().to(dayjs().add(hours, 'hour'))}</span>
    }
  },
]

export const Houses = () => {
  const worlds = useWorlds()
  const [filter, setFilter] = useState({
    world: "Bravoria",
    town: "ab'dendriel",
  })
  const houses = useAllAuctionedHouses({ world: filter.world })

  return <div>
    <h1>Houses</h1>
    <div>
      <i>Select your world</i>
      <Autocomplete
        disablePortal
        options={worlds}
        sx={{ width: 300 }}
        defaultValue={filter.world}
        onChange={(_event, value) => setFilter({ ...filter, world: value ?? filter.world })}
        renderInput={(params) => <TextField {...params} label={filter.world} />}
      />
    </div>

    <p>Currently active auctions</p>
    <div>
      <DataGrid rows={houses} columns={columns} />
    </div>
  </div>
}
