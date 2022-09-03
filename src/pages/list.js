import Header from "../ui-components/header";
import Txt from "../ui-components/text";
import { useEffect, useState } from "react";
import { getData } from "../api/formdata";
import Divider from "../ui-components/divider";
import { token } from "../api/token";



export default function List() {
    const [data, setData] = useState([])
    const url = 'https://pcfy.redberryinternship.ge/api/laptops';
    const urlToFetch = `${url}${token}`

    useEffect(() => {
            (async function() {
                const dataToFetch = await getData(urlToFetch);
                setData(dataToFetch?.data)
           })()
    },[])

    return(
        <>  
            <Header link = '/' renderStyle={{'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size='34px' lineHeight='21px' color='#000' text={'ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ'}/>
            }/>
            <Divider height='90px'/>
            <div className="list-wrapper wrapper">
                <div className="laptop-list grid">
                    {
                        data.map(e =>
                            <div key = {e.laptop.id} className="laptop-list-item flx-r" data-id = {e.laptop.id}>
                                <div className="image-wrapper">
                                    {
                                        e.laptop?.image ? 
                                        <img alt='' src={`https://pcfy.redberryinternship.ge/${e.laptop?.image}`}/> :
                                        '...loading'
                                    }
                                </div>
                                <Divider width='28px'/>
                                <div className="list-item-desc flx flx-vc">
                                    <div className="flx-c">
                                        <Txt bold='600' size='18px' lineHeight='21px' color='#2e2e2e' text={`${e.user?.name} ${e.user?.surname}`}/>
                                        <Divider height='18px'/>
                                        <Txt bold='400' size='18px' lineHeight='21px' color='#2e2e2e' text={e.laptop?.name}/>
                                        <Divider height='40px'/>
                                        <Txt text='მეტის ნახვა' link={`${e.laptop?.id}`} size='16px' lineHeight='21px' className='pointer' color='#4386a9' style={{'textDecoration':'underline',}}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Divider height='90px'/>
        </>
    )
}