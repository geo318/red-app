import { fetchApiData } from "./fetchdata";

export const getData = async (url,token) => {

    const data = await fetchApiData(url)
    return data
}