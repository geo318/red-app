export const fetchApiData = async (url) => {
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json()
        return jsonResponse

    } catch(e) {
        console.log(e)
    }
}