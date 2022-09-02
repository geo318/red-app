import { useState, useContext, useEffect, useMemo } from "react"
import { byteConverter } from "../helpers/byte-converter"
import Icon from "./icon"
import success from "../assets/images/success.svg"
import error from "../assets/images/error.svg"
import { inputValues } from "../contexts/input-values"
import { localStore } from "../helpers/local-storage"

export default function ImageUpload({name, text, buttonText, handleChange, value, formData}) {
    const localImage = useMemo(()=> localStore('rdb-laptop-image'),[])
    const localImageData = useMemo(()=> localStore('rdb-laptop-image-data'),[])
    const [imageDetails, setImageDetails] = useState(localImageData)
    const [image, setImage] = useState(localImage)
    const [dragging, setDragging] = useState(false)
    const [imageData,setImageData] = useState(value || {})
    const [imageError, setImageError] = useState(false)
    const { setErrors, bulkValidation } = useContext(inputValues)
    
    useEffect(() => {
        localStore('rdb-laptop-image', image)
      },[image])

    useEffect(()=> {
        if(image)
        imageToBlob(image)
    },[image])

    useEffect(() => {
        localStore('rdb-laptop-image-data', imageDetails)
    },[imageDetails])
    
    const handleDrag = () => {
        setDragging(e=>!e)
    }

    const imageToBlob = async (base64) => {
        const base64Response = await fetch(base64)
        const blob = await base64Response.blob();
        handleChange({target : {name : 'laptop_image', value : blob}})
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        handleChange({target : {name : 'laptop_image', value : file}})
        formData.append('laptop_image', file)
        setImageData(file)
        setImageDetails({name : file.name, size : file.size})
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
        imageReader(file)
    }

    const imageReader = (file) => {
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
                    <div><span>{image && <Icon render={success}/>}</span>{imageDetails?.name}, {byteConverter(imageDetails?.size)}</div>
                    {uploadButton}
                </div>
            }
        </div>
    )
}