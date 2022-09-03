import { useEffect, useState } from "react"
import { token, apiUrl } from "../api/url-params"
import { getData } from "../api/formdata"
import { localStore } from "../helpers/local-storage"
import Header from "../ui-components/header"
import Txt from "../ui-components/text"
import Divider from "../ui-components/divider"
import loadingImage from "../assets/images/loading.jpg"
import Spinner from "../ui-components/spinner/spinner"
import "../assets/css/laptop-info.css"

export default function LaptopInfo({link}) {
    const [data, setData] = useState([])
    const [dataSet, setDataSet] = useState({
        positions : [],
        teams : [],
        brands : [],
        cpus : [],
    })

    const url = apiUrl + 'laptop/';
    console.log(apiUrl)

    useEffect(()=> {
        const pathname = window?.location.pathname;
        const param = pathname?.split('/').pop();
        const urlToFetch = `${url}${param}${token}`;

        (async function() {
            const dataToFetch = await getData(urlToFetch);
            setData(dataToFetch?.data)
            const positions = localStore('positions') || await getData(apiUrl + 'positions')
            localStore('positions', positions.data || positions)
            const teams = localStore('teams') || await getData(apiUrl + 'teams')
            localStore('teams', teams.data || teams)
            const brands = localStore('brands') || await getData(apiUrl + 'brands')
            localStore('brands', brands.data || brands)
            const cpus = localStore('cpus') || await getData(apiUrl + 'cpus')
            localStore('cpus', cpus.data || cpus)
            
            if(positions && teams && brands && cpus) {
                setDataSet({
                    positions: positions.data || positions, 
                    teams: teams.data || teams,
                    brands: brands.data || brands,
                    cpus: cpus.data ||cpus
                })
            }
       })()
    },[])

    console.log(data)
    console.log(dataSet)
    if(data)
    
    return(
        <>
            <Header link = '/laptop-list' renderStyle={{'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size='34px' lineHeight='21px' color='#000' text={'ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ'}/>
            }/>
            <Divider height='84px'/>
            <div className="laptop-info-wrapper wrapper grid">
                {
                    <div className="laptop-info flx-r" >
                        <div className="general-info grid laptop-info-grid">
                            <div className="image-wrapper">
                                {
                                    data?.laptop?.image ?
                                    <img alt='' src={`https://pcfy.redberryinternship.ge/${data.laptop.image}`}/> :
                                    <>
                                        <img alt='' src={loadingImage}/>
                                        <Spinner color = "#62a1eb" size = '70px'/>
                                    </>
                                }
                            </div>
                            <div className="user-info flx flx-vc">
                                <div className="flx-r info-group">
                                    <div className="label-group flx-c flx-hr">
                                        <span>სახელი:</span>
                                        <span>თიმი:</span>
                                        <span>პოზიცია:</span>
                                        <span>მეილი:</span>
                                        <span>ტელ. ნომერი:</span>
                                    </div>
                                    <div className="value-group flx-c flx-hr">
                                        {   
                                            data.user ?
                                            <>
                                                <span>{data?.user?.name} {data?.user?.surname}</span>
                                                <span>{dataSet?.teams?.filter(e => data.user.team_id === e.id)[0].name}</span>
                                                <span>{dataSet?.positions?.filter(e => data.user.position_id === e.id)[0].name}</span>
                                                <span>{data?.user?.email}</span>
                                                <span>{data?.user?.phone_number}</span>
                                            </> :
                                            <Spinner/> 
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Divider height='90px'/>
        </>
    )
}