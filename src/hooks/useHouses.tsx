import { useEffect, useState } from "react"
import { endpoint } from "../Constants"
import { HouseApiResponse } from "../DtoTypes/HouseTypes"



interface Props {
  world: string
  town: string
}
interface House {
  name: string
  rent: number
  auctioned: boolean
  currentBid: number
  timeLeft: string
}

export const useHouses = ({ world, town }: Props) => {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    const fetchHouses = async () => {
      const res = await fetch(endpoint.houses(world, town))
      const data = await res.json() as HouseApiResponse
      const auctionedHouses = data.houses.house_list.map(house => ({
        name: house.name,
        rent: house.rent,
        auctioned: house.auctioned,
        currentBid: house.auction.current_bid,
        timeLeft: house.auction.time_left,
        finished: house.auction.finished,
      }))
        .filter(house => house.timeLeft)
        .sort((a, b) => a.timeLeft < b.timeLeft ? 1 : -1)
      setHouses(auctionedHouses)
    }
    fetchHouses()
  }, [town, world])

  return houses
}
