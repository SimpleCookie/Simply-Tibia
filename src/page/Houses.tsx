import { useState } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { useWorlds } from "../hooks/useWorlds"
import { useAllAuctionedHouses } from "../hooks/useAllAuctionedHouses"
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs"
dayjs.extend(relativeTime)

import './houses.css'
import { BidHolder } from "./BidHolder"

export const Houses = () => {
  const worlds = useWorlds()
  const [filter, setFilter] = useState({
    world: "Bravoria",
    town: "ab'dendriel",
  })
  const [houses, guildHalls] = useAllAuctionedHouses({ world: filter.world })

  const columns = [
    { field: 'name', headerName: 'Name', width: 260 },
    { field: 'town', headerName: 'Town', width: 105 },
    {
      field: 'rent', headerName: 'Rent', width: 80, renderCell: (params: GridRenderCellParams) => {
        const rent = params.value
        return <span>{rent.toLocaleString()}</span>
      }
    },
    { field: 'currentBid', headerName: 'bid', width: 90 },
    {
      field: 'hoursLeft', headerName: 'Time left', width: 100, renderCell: (params: GridRenderCellParams) => {
        const hours = params.value
        return <span>{dayjs().to(dayjs().add(hours, 'hour'))}</span>
      }
    },
    {
      field: 'id', headerName: 'Bidder', width: 200, renderCell: (params: GridRenderCellParams) => {
        const houseId = params.value
        return <BidHolder houseId={houseId} world={filter.world} />
      }
    },
  ]

  return <div>
    <h1>Houses</h1>
    <Autocomplete
      disablePortal
      options={worlds}
      sx={{ width: 300 }}
      defaultValue={filter.world}
      onChange={(_event, value) => setFilter({ ...filter, world: value ?? filter.world })}
      renderInput={(params) => <TextField {...params} label={filter.world} />}
    />

    <h2>Guild hall auctions</h2>
    <DataGrid rows={guildHalls} columns={columns} />

    <h2>House auctions</h2>
    <DataGrid rows={houses} columns={columns} />
  </div>
}
