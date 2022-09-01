import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useEffect, useState } from "react"
import ImageUpload from "../ui-components/image-upload"
import gel from "../assets/images/gel.svg"

export default function LaptopForm({values, handleChange}) {
    const [errors, setErrors] = useState(true)
    const [bulkValidation, setBulkValidation] = useState(false)

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
        name : 'laptop_brand_id',
        placeholder : 'ლეპტოპის ბრენდი',
        required : true,
        data_url: 'https://pcfy.redberryinternship.ge/api/brands'
      },
      {
        id : 3,
        type : 'text',
        sub_type : 'select',
        name : 'laptop_cpu',
        placeholder : 'CPU',
        required : true,
        data_url: 'https://pcfy.redberryinternship.ge/api/cpus'
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
    const validateInputs = (val) => {
      let errorsArray = []
      laptopInputs.forEach(e => {
        if(e.required && val[e.name] === '') {
          errorsArray.push(e.name)
        }
      })
      if(errorsArray.length === 0) setErrors(false)
      console.log(errorsArray.length)
    }

    useEffect(() => {
      validateInputs(values)
    },[values])


    return(
        <>
            <inputValues.Provider value = {{errors, setErrors, setBulkValidation, bulkValidation}}>
                <Form values = {values} render = 
                    { 
                      <>
                        <ImageUpload handleChange = {handleChange} value = {values.laptop_image} {...imageUploaderDetails}/>
                          {    
                            laptopInputs.map((e,i) => 
                              <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                            )
                          }
                      </>
                    }
                />
            </inputValues.Provider>
        </>
    )
}