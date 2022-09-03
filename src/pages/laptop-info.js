import { useEffect, useState } from "react"
import { token } from "../api/token"
import { getData } from "../api/formdata"
import Header from "../ui-components/header"
import Txt from "../ui-components/text"
import Divider from "../ui-components/divider"

export default function LaptopInfo({link}) {
    const [data, setData] = useState([])

    const url = 'https://pcfy.redberryinternship.ge/api/laptop/';

    useEffect(()=> {
        const pathname = window?.location.pathname;
        const param = pathname?.split('/').pop();
        const urlToFetch = `${url}${param}${token}`;

        (async function() {
            const dataToFetch = await getData(urlToFetch);
            setData(dataToFetch?.data)
       })()
    },[])

    console.log(data)
    return(
        <>
            <Header link = '/laptop-list' renderStyle={{'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size='34px' lineHeight='21px' color='#000' text={'ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ'}/>
            }/>
            <Divider height='90px'/>
            <div className="list-wrapper wrapper">
                <div className="laptop-list grid">
                        {
                            data ?
                            <div className="laptop-list-item flx-r" >
                                {/* <div className="image-wrapper">
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
                                </div> */}
                            </div>
                         : <>...loading</>
                    }
                </div>
            </div>
            <Divider height='90px'/>
        </>
    )
}