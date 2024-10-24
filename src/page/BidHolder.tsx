import { CircularProgress, IconButton } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download'
import { useState } from "react"
import { endpoint } from "../Constants"
import { SingleHouseApiResponse } from "../DtoTypes/HouseTypes"

interface Props {
  world: string
  houseId?: number
}

interface House {
  houseId: number
  rent: number
  bidder: string
}

export const BidHolder = ({ world, houseId }: Props) => {
  const [house, setHouse] = useState<House | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const fetchBidder = async () => {
    console.log("hmm", houseId)
    setHouse(undefined)
    if (!houseId) return
    setIsLoading(true)
    const res = await fetch(endpoint.house(world, houseId))
    const data = await res.json() as SingleHouseApiResponse
    const auctionedHouse = {
      houseId: data.house.houseId,
      rent: data.house.rent,
      bidder: data.house.status.auction.current_bidder,
    }
    setHouse(auctionedHouse)
    setIsLoading(false)
  }

  if (isLoading) return <CircularProgress />
  if (house) return <span>{house.bidder}</span>
  return <IconButton aria-label="Fetch bidder" onClick={fetchBidder}>
    <DownloadIcon />
  </IconButton>
}
