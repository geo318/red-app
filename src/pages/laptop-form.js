import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useMemo, useState } from "react"
import ImageUpload from "../ui-components/image-upload/image-upload"
import gel from "../assets/images/gel.svg"
import Header from "../ui-components/header"
import Tab from "../ui-components/tab/tab"
import Divider from "../ui-components/divider"
import Icon from "../ui-components/icon"
import rocket from "../assets/images/rocket.png"
import { validator } from "../helpers/validator"


const laptopInputs = [
  {
    id : 1,
    type : 'text',
    name : 'laptop_name',
    placeholder : 'HP',
    label : 'ლეპტოპის სახელი',
    required : true,
    error : {
      pattern : /.{2,}$/,
      message : 'მინიმუმ 2 სიმბოლო',
    },
    message : 'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ',
    style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1}
  },
  {
    id : 2,
    type : 'text',
    sub_type : 'select',
    prop : 'id',
    name : 'laptop_brand_id',
    placeholder : 'ლეპტოპის ბრენდი',
    required : true,
    data_url: 'brands',
    style : {'maxWidth':'50%','marginLeft':'22px','flexGrow':1, 'marginTop':28}
  },
  {
    div: <Divider key='div-1' width='100%' height='50px' />
  },
  {
    id : 3,
    type : 'text',
    sub_type : 'select',
    name : 'laptop_cpu',
    prop : 'name',
    placeholder : 'CPU',
    required : true,
    data_url: 'cpus',
    style : {'maxWidth':'33.3%','marginRight':'16px','flexGrow':1, 'marginTop':28}
  },
  {
    id : 4,
    type : 'number',
    name : 'laptop_cpu_cores',
    min: 1,
    max: 100,
    placeholder : '14',
    label : 'CPU-ს ბირთვი',
    required : true,
    message : 'მხოლოდ ციფრები',
    style : {'maxWidth':'33.3%','margin':'0 8px','flexGrow':1,}
  },
  {
    id : 5,
    type : 'number',
    name : 'laptop_cpu_threads',
    min: 1,
    max: 100,
    placeholder : '365',
    label : 'CPU-ს ნაკადი',
    required : true,
    message : 'მხოლოდ ციფრები',
    style : {'maxWidth':'33.3%','marginLeft':'16px','flexGrow':1,}
  },
  {
    div: <Divider key='div-2' width='100%' height='50px' />
  },
  {
    id : 6,
    type : 'number',
    name : 'laptop_ram',
    placeholder : '16',
    min: 1,
    max: 100,
    label : 'ლეპტოპის RAM (GB)',
    required : true,
    message : 'მხოლოდ ციფრები',
    style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1}
  },
  {
    id : 7,
    type : 'radio',
    name : 'laptop_hard_drive_type',
    radio_values : [{name: 'SSD', value: 'SSD'},{name: 'HDD', value: 'HDD'}],
    label : 'მეხსიერების ტიპი',
    required : true,
    style : {'maxWidth':'50%','marginLeft':'22px','flexGrow':1}
  },
  {
    div: <Divider key='div-3' width='100%' height='50px' />
  },
  {
    id : 8,
    type : 'text',
    sub_type : 'date',
    name : 'laptop_purchase_date',
    placeholder : 'დდ / თთ / წწწწ',
    label : 'შეძენის რიცხვი (არჩევითი)',
    required : false,
    style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1}
  },
  {
    id : 9,
    type : 'number',
    name : 'laptop_price',
    min: 1,
    placeholder : '0000',
    symbol : gel,
    label : 'ლეპტოპის ფასი',
    required : true,
    message : 'მხოლოდ ციფრები',
    style : {'maxWidth':'50%','marginLeft':'22px','flexGrow':1,}
  },
  {
    div: <Divider key='div-4' width='100%' height='50px' />
  },
  {
    id : 10,
    type : 'radio',
    name : 'laptop_state',
    radio_values : [{name: 'ახალი', value: 'new'},{name: 'მეორადი', value: 'used'}],
    label : 'ლეპტოპის მდგომარეობა',
    required : true,
    style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1,}
  },
]

export default function LaptopForm({values, handleChange, handleRoute, formData, fallback}) {
    const [bulkValidation, setBulkValidation] = useState(false)
    const [errors, setErrors] = useState(false)
    const imageUploaderDetails = {name: 'laptop_image',text:'ჩააგდე ან ატვირთე ლეპტოპის ფოტო', buttonText: 'ატვირთე'}
    const isError = useMemo(()=>validator(laptopInputs, values),[values])

    return(
      <div className="form-wrapper">
          <Header link = '/form/coworkers' renderStyle={{'paddingTop':36}} render = {<Tab/>}/>
          <Divider height='27px'/>
          <inputValues.Provider value = {{errors, fallback, setErrors, setBulkValidation, bulkValidation, formData}}>
              <Form values = {values} text='დამახსოვრება' handleRoute={handleRoute} submit isError = {isError} render = 
                  { 
                    <>
                      <ImageUpload formData = {formData} handleChange = {handleChange} value = {values.laptop_image} {...imageUploaderDetails}/>
                      <Divider height='89px' width='100%'/>
                        {    
                          laptopInputs.map(e =>
                            e.div ? e.div : <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                          )
                        }
                    </>
                  }
              />
          </inputValues.Provider>
          <Divider height='67px'/>
          <div className="flx flx-hc">
            <Icon render={rocket} />
          </div>
          <Divider height='45px'/>
        </div>
    )
}