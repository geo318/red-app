export const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        //   mode: 'cors',
        //   cache: 'no-cache',
        //   credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
        console.log(data)
        const res = await response.json();
        console.log(res)
        return res
    } catch(e) {
        console.log(e)
    }
}