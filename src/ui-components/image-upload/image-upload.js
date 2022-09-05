import { useState, useContext, useEffect, useMemo } from "react"
import { byteConverter } from "../../helpers/byte-converter"
import Icon from "../icon"
import success from "../../assets/images/success.svg"
import error from "../../assets/images/error.svg"
import { inputValues } from "../../contexts/input-values"
import { localStore } from "../../helpers/local-storage"
import Txt from "../text"
import Button from "../button"
import './image-upload.css'
import Divider from "../divider"
import uploadImage from "../../assets/images/mobile-upload-image.svg"
import { mobileDevice } from "../../contexts/mobile-device"

export default function ImageUpload({name, text, buttonText, handleChange, value, formData}) {
    const localImage = useMemo(()=> localStore('rdb-laptop-image'),[])
    const localImageData = useMemo(()=> localStore('rdb-laptop-image-data'),[])
    const [imageDetails, setImageDetails] = useState( (localImage != null && localImage !== 'nullify') ? localImageData : null)
    const [image, setImage] = useState((localImage != null && localImage !== 'nullify') ? localImage : null)
    const imageName = useMemo(()=> imageDetails?.name.split('.'),[image])
    const [dragging, setDragging] = useState(false)
    const [imageError, setImageError] = useState(false)
    const { bulkValidation } = useContext(inputValues)
    const { isMobile } = useContext(mobileDevice)
    
    useEffect(() => {
        localStore('rdb-laptop-image', image)
      },[image])

    useEffect(()=> {
        console.log(image,localImage)
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
        setImageDetails({name : file.name, size : file.size})
        readFile(file)
    }
    
    const readFile = async (file) => {
        const imageTypes = ['image/bmp','image/webp','image/png','image/jpeg']
        if(!imageTypes.includes(file.type) || file.size === 0) {
            setImageError(true)
            setImage('')
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

    const uploadButton = (text) => {
        return (
            <Button padding={isMobile ? '12px 11px' : '18px 72px'} lineHeight={isMobile ? '22px' : '24px' }text='ატვირთე' size={isMobile ? '18px': '20px'} type="button" className="upload-button">
                <label className="flx flx-vc flx-hc pointer">
                    <input name={name} type='file' onChange={handleUpload}/>
                    {text || buttonText}
                </label>
            </Button>
        )
    }
    return (
        <div className="upload-wrapper">
            <div className={`drag-area flx flx-vc flx-hc${dragging ? ' drag-active' : ''}${imageError || (bulkValidation && !image) ? ' border-image-error background-error' : image ? ' border-none' : ''}`} 
                onDragOver={dragOver} 
                onDragEnter={handleDrag} 
                onDragLeave={handleDrag}  
                onDrop={handleDrop}
            >
                {isMobile &&  <label className="flx flx-vc flx-hc pointer"><input name={name} type='file' onChange={handleUpload}/></label>}
                {
                    ((bulkValidation && !image) || imageError) && 
                    <div style={{'position':'absolute', 'top': isMobile ? 'unset' : 54, 'bottom' : isMobile ? 0 : 'unset' }}>
                        <Icon render={error}/>
                        <Divider height='19px'/>
                    </div>
                }
                {
                    image ?
                    <img src={`${image}`} alt=''/> : 
                    <div className="flx-c flx-vc flx-hc">
                        {   
                            isMobile && 
                            <>
                                <Divider height='60px' width='100%'/>
                                <Icon render={uploadImage}/>
                                <Divider height='30px' width='100%'/>
                            </>
                        }
                        <Txt className={`${imageError || (bulkValidation && !image) ? 'error-text' : ''}`} 
                            text = {text} size={isMobile ? '16px' : '20px'} lineHeight={isMobile ? '26px' : '38px'} bold={isMobile ? '400' : '600'}
                            style = {{'display': 'block','width':195,'margin':'0 auto', 'textAlign':'center'}}
                        />
                        <Divider height='65px'/>
                        { !isMobile && uploadButton() }
                    </div>
                }
            </div>
            <Divider height='25px'/>
            {
                image && 
                <div className="flx flx-mid">
                    <div className="flx flx-vc img-info">
                        <span>
                            {image && <Icon render={success}/>}
                        </span>
                        {isMobile && <Divider width='15px'/>}
                        <div className={`image-det-footer${isMobile ? ' flx-c': ''}`}>
                            <Divider width='25px'/>
                            <div className="info-file-name">{imageDetails?.name.length > 10 ? imageName?.[0].slice(0,8).concat('...',imageName?.[imageName.length-1]) : imageDetails?.name}</div>
                            <Divider width='18px'/>
                            <div className="info-file-size">{byteConverter(imageDetails?.size)}</div>
                        </div>
                    </div>
                    <div className="flx flx-hr flx-vt">
                        {uploadButton('თავიდან ატვირთე')}
                    </div>
                </div>
            }
            {isMobile && <Divider height='40px'/>}
        </div>
    )
}