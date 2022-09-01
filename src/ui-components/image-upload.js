import { useState, useContext, useEffect } from "react"
import { byteConverter } from "../helpers/byte-converter"
import Icon from "./icon"
import success from "../assets/images/success.svg"
import error from "../assets/images/error.svg"
import { inputValues } from "../contexts/input-values"

export default function ImageUpload({name, text, buttonText, handleChange, value}) {
    const [dragging, setDragging] = useState(false)
    const [image, setImage] = useState(value || '')
    const [imageData,setImageData] = useState({})
    const [imageError, setImageError] = useState(false)
    const { setErrors, bulkValidation } = useContext(inputValues);
    
    useEffect(()=> {
        setImage(value)
    },[])

    const handleDrag = () => {
        setDragging(e=>!e)
    }

    useEffect(() => {
        if(image)
        handleChange({target : {name : 'laptop_image', value : image}})
    },[image])

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        setImageData(file)
        readFile(file)
    }
    
    const readFile = async (file) => {
        const imageTypes = ['image/bmp','image/webp','image/png','image/jpeg']

        if(!imageTypes.includes(file.type) || file.size === 0) {
            setImageError(true)
            setImage('')
            setImageData({})
            return
        }

        setImageError(false)

        const readImage = new FileReader();

        readImage.readAsDataURL(file)
        readImage.onload = async () => {
            let data = readImage.result
            setImage(data)
        }
    }


    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(e=>!e);
        const file = e.dataTransfer.files[0]       
        readFile(file)
    }

    const dragOver = (event) => {
        event.preventDefault();
    }

    const uploadButton = 
        <button type="button" className="upload-button">
            <label>
                <input name={name} type='file' onChange={handleUpload}/>
                {buttonText}
            </label>
        </button>;

    return (
        <div className="upload-wrapper">
            <div className={`drag-area flx flx-vc flx-hc${dragging ? ' drag-active' : ''}${imageError || (bulkValidation && !image) ? ' border-error background-error' : image ? ' border-none' : ''}`} 
                onDragOver={dragOver} 
                onDragEnter={handleDrag} 
                onDragLeave={handleDrag}  
                onDrop={handleDrop}
            >
                {
                    image ?
                    <img src={`${image}`} alt=''/> : 
                    <div>
                        {((bulkValidation && !image) || imageError) && <Icon render={error}/>}
                        <span className={`${imageError || (bulkValidation && !image) ? 'error-text' : ''}`}>{text}</span>
                        {uploadButton}
                    </div>
                }
            </div>
            {
                image && 
                <div>
                    <div><span>{image && <Icon render={success}/>}</span>{imageData?.name}, {byteConverter(imageData?.size)}</div>
                    {uploadButton}
                </div>
            }
        </div>
    )
}