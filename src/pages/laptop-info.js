import { useEffect, useState, useContext } from "react"
import { mobileDevice } from "../contexts/mobile-device"
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
    })
    const {isMobile} = useContext(mobileDevice);

    useEffect(()=> {
        const url = apiUrl + 'laptop/';
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
            
            if(positions && teams && brands) {
                setDataSet({
                    positions: positions.data || positions, 
                    teams: teams.data || teams,
                    brands: brands.data || brands,
                })
            }
       })()
    },[])

    return(
        <>
            <Header link = '/' renderStyle={isMobile ? {} : {'paddingBottom':5}} render = {
                <Txt h='2' bold='700' size={isMobile ? '16px' : '34px'} lineHeight='21px' color='#000' text={'ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ'}/>
            }/>
            <Divider height={!isMobile && '84px'}/>
            <div className="laptop-info-wrapper">
                {
                    <div className="laptop-info" >
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
                            {isMobile && <Divider height='29px'/>}
                            <div className="user-info flx flx-vc">
                                <div className="flx-r info-group">
                                    <div className={`label-group flx-c ${!isMobile && 'flx-hr'}`}>
                                        <span>სახელი:</span>
                                        <span>თიმი:</span>
                                        <span>პოზიცია:</span>
                                        <span>მეილი:</span>
                                        <span>ტელ. ნომერი:</span>
                                    </div>
                                    <div className={`value-group flx-c ${!isMobile && 'flx-hr'}`}>
                                        {   
                                            data.user ?
                                            <>
                                                <span>{data.user.name} {data?.user?.surname}</span>
                                                <span>{dataSet?.teams?.filter(e => data.user.team_id === e.id)?.[0]?.name}</span>
                                                <span>{dataSet?.positions?.filter(e => data.user.position_id === e.id)[0].name}</span>
                                                <span>{data.user.email}</span>
                                                <span>{data.user.phone_number.replace(/(?<=^.{4}|^.{7}|^.{9}|^.{11})/g,' ')}</span>
                                            </> :
                                            <Spinner/> 
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider height={isMobile ? '20px' : '84px'} width='100%' border='1px solid #a5a5a5'/>
                        <Divider height={isMobile ? '23px' : '54px'}/>
                        <div className="general-info grid laptop-info-grid">
                            <div className="flx flx-vc">
                                <div className="flx-r info-group">
                                    <div className="label-group flx-c flx-hr">
                                        <span>ლეპტოპის სახელი:</span>
                                        <span>ლეპტოპის ბრენდი:</span>
                                        <span>RAM:</span>
                                        <span>მეხსიერების ტიპი:</span>
                                    </div>
                                    <div className="value-group flx-c flx-hr">
                                        {   
                                            data.laptop ?
                                            <>
                                                <span>{data.laptop.name}</span>
                                                <span>{dataSet?.brands?.filter(e => data.laptop.brand_id === e.id)[0].name}</span>
                                                <span>{data.laptop.ram}</span>
                                                <span>{data.laptop.hard_drive_type}</span>
                                            </> :
                                            <Spinner/> 
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flx flx-vt">
                                <div className="flx-r info-group">
                                    <div className="label-group flx-c flx-hr">
                                        <span>CPU:</span>
                                        <span>CPU-ს ბირთვი:</span>
                                        <span>CPU-ს ნაკადი:</span>
                                    </div>
                                    <div className="value-group flx-c flx-hr">
                                        {   
                                            data.laptop ?
                                            <>
                                                <span>{data.laptop.cpu.name}</span>
                                                <span>{data.laptop.cpu.cores}</span>
                                                <span>{data.laptop.cpu.threads}</span>
                                            </> :
                                            <Spinner/> 
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider height={isMobile ? '20px' : '84px'} width='100%' border='1px solid #a5a5a5'/>
                        <Divider height={isMobile ? '23px' : '54px'}/>
                        <div className="general-info grid laptop-info-grid">
                            <div className="flx flx-vc">
                                <div className="flx-r info-group">
                                    <div className="label-group flx-c flx-hr">
                                        <span>ლეპტოპის მდგომარეობა:</span>
                                        <span>ლეპტოპის ფასი:</span>
                                    </div>
                                    <div className="value-group flx-c flx-hr">
                                        {   
                                            data.laptop ?
                                            <>
                                                <span>{data.laptop.state === 'new' ? 'ახალი' : 'მეორადი'}</span>
                                                <span>{data.laptop.price}</span>
                                            </> :
                                            <Spinner/> 
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flx flx-vt">
                                <div className="flx-r info-group">
                                    <div className="label-group flx-c flx-hr">
                                        <span>შეძენის რიცხვი:</span>
                                    </div>
                                    <div className="value-group flx-c flx-hr">
                                        {   
                                            data.laptop ?
                                            <>
                                                <span>{data.laptop.purchase_date ? data.laptop.purchase_date.replaceAll('-',' / ') : '-'}</span>
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
            <Divider height={isMobile ? '30px' : '90px'}/>
        </>
    )
}