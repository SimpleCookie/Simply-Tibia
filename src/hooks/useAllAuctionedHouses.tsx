import { useEffect, useState } from "react"
import { endpoint, towns } from "../Constants"
import { HouseApiResponse } from "../DtoTypes/HouseTypes"

interface Props {
  world: string
}
interface House {
  name: string
  rent: number
  town: string
  auctioned: boolean
  currentBid: number
  hoursLeft: number
}

const mapToHours = (time: string): number => {
  if (time.includes("day")) {
    return parseInt(time) * 24
  }
  return parseInt(time)
}

export const useAllAuctionedHouses = ({ world }: Props) => {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    const fetchTownHouses = async (town: string) => {
      const res = await fetch(endpoint.houses(world, town))
      const data = await res.json() as HouseApiResponse
      if (!data.houses) return []
      const auctionedHouses = data.houses.house_list.map(house => ({
        id: house.name,
        name: house.name,
        town: town,
        rent: house.rent,
        auctioned: house.auctioned,
        currentBid: house.auction.current_bid,
        hoursLeft: mapToHours(house.auction.time_left),
        finished: house.auction.finished,
      }))
        .filter(house => house.hoursLeft)
      return auctionedHouses
    }
    const fetchHouses = async () => {
      const houses = await Promise.all(towns.map(fetchTownHouses))
      const flatHouses = houses.flatMap(house => house.map(house => house))

      setHouses(flatHouses.sort((a, b) => a.hoursLeft - b.hoursLeft))
    }

    fetchHouses()
  }, [world])

  return houses
}
