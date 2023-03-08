export const postData = async (url,data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        body: data
        });
        if(response.ok) {
            return await response.json();
        }
    } catch(e) {
        console.log(e)
    }
}