import { fetchApiData } from "./fetchdata";

export const getData = async () => {
    const url = "";
    const apiKey = ""
    const urlToFetch = `${url}${apiKey}`

    const data = await fetchApiData(urlToFetch)
    return data
}