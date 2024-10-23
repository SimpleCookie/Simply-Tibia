interface HouseDto {
  name: string
  house_id: number
  size: number
  rent: number
  rented: boolean,
  auctioned: boolean,
  auction: {
    current_bid: number
    time_left: string
    finished: boolean
  }
}
export interface HouseApiResponse {
  houses: {
    house_list: HouseDto[]
  }
}
