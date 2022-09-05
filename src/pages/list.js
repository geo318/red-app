import Header from "../ui-components/header";
import Txt from "../ui-components/text";
import { useEffect, useState, useContext } from "react";
import { getData } from "../api/formdata";
import Divider from "../ui-components/divider";
import { token, apiUrl } from "../api/url-params";
import { mobileDevice } from "../contexts/mobile-device";
import "../assets/css/list.css"
import Spinner from "../ui-components/spinner/spinner";

export default function List() {
    const [data, setData] = useState([])
    const {isMobile} = useContext(mobileDevice);

    const url = apiUrl + 'laptops';
    const urlToFetch = `${url}${token}`

    useEffect(() => {
            (async function() {
                const dataToFetch = await getData(urlToFetch);
                setData(dataToFetch?.data)
           })()
    },[])

    return(
        <>  
            <Header link = '/' renderStyle={isMobile ? {} : {'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size={isMobile ? '16px' : '34px'} lineHeight='21px' color='#000' text={'ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ'}/>
            }/>
            {!isMobile && <Divider height='90px'/>}
            <div className="list-wrapper">
                <div className="laptop-list grid">
                    {
                        data.slice(0,).reverse().map(e =>
                            <div key = {e.laptop.id} className="laptop-list-item flx-r" data-id = {e.laptop.id}>
                                <div className="image-wrapper">
                                    {
                                        e.laptop.image === 0 ?
                                        <img alt='' src={`https://pcfy.redberryinternship.ge/${e.laptop?.image}`}/>:
                                        <Spinner/>
                                    }
                                </div>
                                <Divider width={isMobile ? '16px' : '28px'}/>
                                <div className="list-item-desc flx flx-vc">
                                    <div className="flx-c">
                                        <Txt bold='500' size={isMobile ? '14px' : '18px'} lineHeight='21px' color='#2e2e2e' text={`${e.user?.name} ${e.user?.surname}`}/>
                                        <Divider height={isMobile ? '8px' : '18px'}/>
                                        <Txt bold='400' size='18px' lineHeight='21px' color='#2e2e2e' text={e.laptop?.name}/>
                                        <Divider height={isMobile ? '11px' : '40px'}/>
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