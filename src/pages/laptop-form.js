import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useEffect, useState } from "react"
import ImageUpload from "../ui-components/image-upload"
import gel from "../assets/images/gel.svg"
import Header from "../ui-components/header"
import Tab from "../ui-components/tab/tab"
import Divider from "../ui-components/divider"

export default function LaptopForm({values, handleChange, handleRoute, formData, fallback}) {
    const [bulkValidation, setBulkValidation] = useState(false)
    const [errors, setErrors] = useState(false)
    const imageUploaderDetails = {name: 'laptop_image',text:'ჩააგდე ან ატვირთე ლეპტოპის ფოტო', buttonText: 'ატვირთე'}
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
        message : 'შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, რიცხვებსა და !@#$%^&*()_+=',
        message_phone: 'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ',
      },
      {
        id : 2,
        type : 'text',
        sub_type : 'select',
        prop : 'id',
        name : 'laptop_brand_id',
        placeholder : 'ლეპტოპის ბრენდი',
        required : true,
        data_url: 'brands'
      },
      {
        div: <Divider />
      },
      {
        id : 3,
        type : 'text',
        sub_type : 'select',
        name : 'laptop_cpu',
        prop : 'name',
        placeholder : 'CPU',
        required : true,
        data_url: 'cpus'
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
        message : 'მხოლოდ ციფრები'
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
        message : 'მხოლოდ ციფრები'
      },
      {
        id : 7,
        type : 'radio',
        name : 'laptop_hard_drive_type',
        radio_values : [{name: 'SSD', value: 'SSD'},{name: 'HDD', value: 'HDD'}],
        label : 'მეხსიერების ტიპი',
        required : true,
      },      {
        id : 8,
        type : 'text',
        sub_type : 'date',
        name : 'laptop_purchase_date',
        placeholder : 'დდ / თთ / წწწწ',
        label : 'შეძენის რიცხვი (არჩევითი)',
        required : false,
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
        message : 'მხოლოდ ციფრები'
      },
      {
        id : 10,
        type : 'radio',
        name : 'laptop_state',
        radio_values : [{name: 'ახალი', value: 'new'},{name: 'მეორადი', value: 'used'}],
        label : 'ლეპტოპის მდგომარეობა',
        required : true,
      },
    ]
    // const validateInputs = (val) => {
    //   let errorsArray = []
    //   laptopInputs.forEach(e => {
    //     if(e.required && val[e.name] === '') {
    //       errorsArray.push(e.name)
    //     }
    //   })
    //   if(errorsArray.length === 0) setErrors(false)
    //   setErrors(true)
    // }
    
    const isError = () => {
      let namesArray = laptopInputs.map(e => e.name)
      let patternsArray = laptopInputs.map(e => e?.error?.pattern || /./)
      let pattern_1Array = laptopInputs.map(e => e?.error?.pattern_1 || /./)
      const valuesArray = Object.entries(values)
      const filtered = valuesArray?.filter(e => namesArray.includes(e[0]))
      const test_1 = filtered?.every((e,i) => patternsArray[i]?.test(e[1]))
      const test_2 = filtered?.every((e,i) => pattern_1Array[i]?.test(e[1]))

      if(!test_1 || !test_2) return true

      return false
    }

    return(
        <>
          <Header link = '/form/coworkers' renderStyle={{'paddingTop':36}} render = {<Tab/>}/>
          <Divider height='27px'/>
          <inputValues.Provider value = {{errors, fallback, setErrors, setBulkValidation, bulkValidation, formData}}>
              <Form values = {values} handleRoute={handleRoute} submit isError = {isError} render = 
                  { 
                    <>
                      <ImageUpload formData = {formData} handleChange = {handleChange} value = {values.laptop_image} {...imageUploaderDetails}/>
                        {    
                          laptopInputs.map(e =>
                            e.div ? e.div : <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                          )
                        }
                    </>
                  }
              />
          </inputValues.Provider>
        </>
    )
}