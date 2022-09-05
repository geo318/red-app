import { pureToken } from "../../api/url-params";
import Divider from "../../ui-components/divider";

export const initialValues = {
    name : '',
    surname: '',
    team_id : '',
    position_id: '',
    email : '',
    phone_number : '',
    laptop_image : '',
    laptop_name: '',
    laptop_brand_id : '',
    laptop_cpu: '',
    laptop_cpu_cores : '',
    laptop_cpu_threads : '',
    laptop_ram: '',
    laptop_hard_drive_type : '',
    laptop_purchase_date : '',
    laptop_price : '',
    laptop_state : '',
    token : pureToken,
}

export const coworkersInputs = [
    {
      id : 1,
      type : 'text',
      name : 'name',
      placeholder : 'გრიშა',
      label : 'სახელი',
      required : true,
      error : {
        pattern : /.{2,}$/,
        message : 'მინიმუმ 2 სიმბოლო',
        pattern_1: /^[\u10A0-\u10FF]+$/,
        message_1 : 'გამოიყენე ქართული ასოები',
      },
      message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები',
      style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1}
    },
    {
      id : 2,
      type : 'text',
      name : 'surname',
      placeholder : 'ბაგრატიონი',
      label : 'გვარი',
      required : true,
      error : {
        pattern : /.{2,}$/,
        message : 'მინიმუმ 2 სიმბოლო',
        pattern_1: /^[\u10A0-\u10FF]+$/,
        message_1 : 'გამოიყენე ქართული ასოები',
      },
      message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები',
      style : {'maxWidth':'50%','marginLeft':'22px','flexGrow':1}
    },
    {
      div: <Divider key='div-1' width='100%' height='50px' />
    },
    {
      id : 3,
      type : 'text',
      sub_type : 'select',
      name : 'team_id',
      placeholder : 'თიმი',
      required : true,
      data_url: 'teams'
    },
    {
      div: <Divider key='div-2' width='100%' height='50px' />
    },
    {
      id : 4,
      type : 'text',
      sub_type : 'select',
      filter : 'team_id',
      name : 'position_id',
      placeholder : 'პოზიცია',
      required : true,
      data_url: 'positions'
    },
    {
      div: <Divider key='div-3' width='100%' height='50px' />
    },
    {
      id : 5,
      type : 'email',
      name : 'email',
      placeholder : 'grish666@redberry.ge',
      label : 'მეილი',
      required : true,
      error : {
        pattern : /^.+@redberry.ge$/,
        message : 'მეილი არასწორია',
      },
      message : 'უნდა მთავრდებოდეს @redberry.ge-ით',
    },
    {
      div: <Divider key='div-4' width='100%' height='50px' />
    },
    {
      id : 6,
      type : 'phone',
      name : 'phone_number',
      placeholder : '+995 598 00 07 01',
      label : 'ტელეფონის ნომერი',
      required : true,
      error : {
        pattern : /^(\+995)(5\d{8})$/,
        message : 'ნომრის ფორმატი არასწორია',
      },
      message : 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს',
      message_phone : 'ქართული მობ-ნომრის ფორმატი',
    },
]

export const laptopInputs = [
    {
      id : 1,
      type : 'text',
      name : 'laptop_name',
      placeholder : 'HP',
      label : 'ლეპტოპის სახელი',
      required : true,
      error : {
        pattern : /^[A-Za-z0-9!@#$%^&*()_+=" "]{2,50}$/,
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