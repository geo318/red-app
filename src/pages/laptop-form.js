import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useMemo, useState, useContext } from "react"
import ImageUpload from "../ui-components/image-upload/image-upload"
import Header from "../ui-components/header"
import Tab from "../ui-components/tab/tab"
import Divider from "../ui-components/divider"
import Icon from "../ui-components/icon"
import rocket from "../assets/images/rocket.png"
import { validator } from "../helpers/validator"
import { laptopInputs } from "./dataSet/input-data"
import { mobileDevice } from "../contexts/mobile-device"
import Txt from "../ui-components/text"

export default function LaptopForm({values, setValues, handleChange, handleRoute, formData, fallback}) {
  const [bulkValidation, setBulkValidation] = useState(false)
  const {isMobile} = useContext(mobileDevice)
  const imageUploaderDetails = {name: 'laptop_image',text:'ჩააგდე ან ატვირთე ლეპტოპის ფოტო', buttonText: 'ატვირთე'}
  const isError = useMemo(()=>validator(laptopInputs, values),[values])
  
  return(
    <div className="form-wrapper">
      <Header link = '/form/coworkers' renderStyle={!isMobile ? {'paddingTop':36} : {}} render = {
        <>
          {
            isMobile &&
            <div className="flx flx-c flx-vc form-header">
              <Txt h='2' bold='700' size='16px' lineHeight='21px' color='#232323' text={'ლეპტოპის მახასიათებლები'}/>
              <Divider height='5px'/>
              <div className="mobile-form-page">2/2</div>
            </div>
          }
          {!isMobile && <Tab/>}
        </>
      }/>
      <Divider height='27px'/>
      <inputValues.Provider value = {{fallback, setBulkValidation, bulkValidation, formData}}>
        <Form className = 'laptop-form' values = {values} setValues={setValues} text='დამახსოვრება' backLink='/form/coworkers' handleRoute={handleRoute} submit isError = {isError} render = 
          { 
            <>
              <ImageUpload formData = {formData} handleChange = {handleChange} value = {values.laptop_image} {...imageUploaderDetails}/>
              <Divider height={isMobile ? '2px' : '89px'} width='100%'/>
                {    
                  laptopInputs.map((e,i) =>
                    e.div ? isMobile ? <div key={'div'+ i} className="divider-mobile"/> : e.div :
                    <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                  )
                }
            </>
          }
        />
      </inputValues.Provider>
      {
        !isMobile &&
        <>
          <Divider height='67px'/>
          <div className="flx flx-hc">
          <Icon render={rocket} />
          </div>
          <Divider height='45px'/>
        </>
      }
    </div>
  )
}