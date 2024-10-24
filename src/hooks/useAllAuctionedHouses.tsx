import { useEffect, useState } from "react"
import { endpoint, towns } from "../Constants"
import { HouseApiResponse, HouseDto } from "../DtoTypes/HouseTypes"

interface Props {
  world: string
}
interface House {
  id: number
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

const mapHouse = (house: HouseDto, town: string): House => ({
  id: house.house_id,
  name: house.name,
  town,
  rent: house.rent,
  auctioned: house.auctioned,
  currentBid: house.auction.current_bid,
  hoursLeft: mapToHours(house.auction.time_left),
})

export const useAllAuctionedHouses = ({ world }: Props) => {
  const [houses, setHouses] = useState<House[]>([])
  const [guildHalls, setGuildHalls] = useState<House[]>([])

  useEffect(() => {
    const fetchTownHouses = async (town: string) => {
      const res = await fetch(endpoint.houses(world, town))
      const data = await res.json() as HouseApiResponse
      if (!data.houses) return Promise.resolve({ auctionedHouses: [], auctionedGuildHalls: [] })
      const auctionedHouses = data.houses.house_list.filter(h => h.auction.time_left !== "").map(h => mapHouse(h, town)) ?? []

      const auctionedGuildHalls = data.houses.guildhall_list?.filter(h => h.auction.time_left !== "").map(h => {
        return mapHouse(h, town)
      }) ?? []

      return { auctionedHouses, auctionedGuildHalls } as const
    }

    const fetchHouses = async () => {
      const houses = await Promise.all(towns.map(fetchTownHouses))

      const flatHouses = houses.flatMap(townHouse => townHouse.auctionedHouses.map(house => house))
      const flatGuildHalls = houses.flatMap(townHouse => townHouse.auctionedGuildHalls.map(house => house))

      setHouses(flatHouses.sort((a, b) => a.hoursLeft - b.hoursLeft))
      setGuildHalls(flatGuildHalls.sort((a, b) => a.hoursLeft - b.hoursLeft))
    }

    fetchHouses()
  }, [world])

  return [houses, guildHalls] as const
}
