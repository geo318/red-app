import Header from "../ui-components/header";
import Txt from "../ui-components/text";
import { useEffect, useState } from "react";
import { getData } from "../api/formdata";



export default function List() {
    const [data, setData] = useState([])
    const url = 'https://pcfy.redberryinternship.ge/api/laptops';
    const token = '?token=7a56e20944c948f616f709a5a5734f42';
    const urlToFetch = `${url}${token}`

    useEffect(() => {
            (async function() {
                const dataToFetch = await getData(urlToFetch);
                setData(dataToFetch?.data)
           })()
    },[])
    
    return(
        <>  
            <Header renderStyle={{'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size='34px' lineHeight='21px' color='#000' text={'ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ'}/>
            }/>
            <div className="list-wrapper wrapper">
                <div className="list">
                    {
                        data.map(e =>
                            <div key = {e.laptop.id} className="list-item" data-id = {e.laptop.id}>
                                <div className="image-wrapper">
                                    {
                                        e.laptop?.image ? 
                                        <img alt='' src={`https://pcfy.redberryinternship.ge/${e.laptop?.image}`}/> :
                                        '...loading'
                                    }
                                </div>
                                <div className="list-item-desc">
                                    <div>{e.laptop?.name}</div>
                                    <div>{`${e.user?.name} ${e.user?.surname}`}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}