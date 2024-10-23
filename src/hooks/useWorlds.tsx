import { useEffect, useState } from "react"
import { endpoint } from "../Constants"

interface WorldDto {
  name: string
  players_online: number
  location: string
  status: string
  pvp_type: string
}
interface ApiResponse {
  worlds: {
    players_online: number
    regular_worlds: WorldDto[]
  }
}

export const useWorlds = () => {
  const [worlds, setWorlds] = useState<string[]>([])

  useEffect(() => {
    const fetchWorlds = async () => {
      const res = await fetch(endpoint.worlds())
      const data = await res.json() as ApiResponse
      setWorlds(data.worlds.regular_worlds.map(world => world.name))
    }
    fetchWorlds()
  }, [])

  return worlds
}
