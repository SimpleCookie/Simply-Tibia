export enum Pages {
  Houses = 0,
  Guilds = 1,
}

const baseUrl = "https://api.tibiadata.com"
export const endpoint = {
  houses: (world: string, town: string) => `${baseUrl}/v4/houses/${world}/${town}`,
  worlds: () => `${baseUrl}/v4/worlds`,
}

export const towns = [
  "Ab'Dendriel",
  "Carlin",
  "Kazordoon",
  "Thais",
  "Venore",
  "Ankrahmun",
  "Darashia",
  "Edron",
  "Farmine",
  "Gray Beach",
  "Issavi",
  "Liberty Bay",
  "Port Hope",
  "Rathleton",
  "Svargrond",
  "Yalahar",
]
