export const fetchApiData = async (url) => {
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json()
        if(response.ok) return jsonResponse
        throw new Error('Something went wrong');
    } 
    catch(e) {
        console.log(e)
    }
}