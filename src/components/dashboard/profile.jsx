
import React, { useRef, useState } from 'react'
import "./prof-main.css"
import {storage} from "../../firebase"
import {  getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import userEvent from '@testing-library/user-event';
import { decryptData, encryptData } from '../encryption';
const ProfileDash = () => {
    const [selectedimgURL, setSelectedImageURL] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0);
    const jdata=decryptData(localStorage.getItem("user"))
    const [img,setimg]=useState(jdata["image"])
    const fileInputRef = useRef(null);

    
    const handleImageChange = (event) => {
       
        const file = event.target.files[0];
        setSelectedImage(file)
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageURL(imageUrl);
          } else {
            alert('Please select a valid image file.');
          }
      };

      const resetData=(imgUrl)=>{
        let json=JSON.parse(localStorage.getItem('user'))
        json.image=imgUrl
        localStorage.removeItem("user")
        const data=encryptData(json)
        localStorage.setItem("user",data)
        setimg(imgUrl)
      }
      const handleUpload = () => {
        if (selectedImage) {
           
          const imageRef = ref(storage,`p-images/${jdata["_id"]}${selectedImage.name}`)
    
          const uploadTask = uploadBytesResumable(imageRef,selectedImage)
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Update progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              // Handle upload error
              console.error('Upload error:', error);
            },
            () => {
              // Upload completed, get the download URL
              
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resetData(downloadURL)
              });
            }
          );
        }
    }
  return (
    <div className="container__prof">
        <h2>Profile</h2>
        <div className="img-edit-btns">
            <div className="img-edit">

            <div className="outer-cir">
                <div className="inner-cir">

                <img src={selectedimgURL?selectedimgURL:img} alt="" />
                </div>

            </div>
            <div className="nea">
                <h3>{jdata["name"]}</h3>
                <h4>{jdata["email"]}</h4>
                <p>{jdata["address"]} IIT DELHI</p>
            </div>
            </div>
            <div className="prof-btns">
                <label htmlFor="up" style={{display:selectedimgURL?"none":"block"}}>

                <div className="edit-btn">Choose new Photo</div>
                </label>
                {
                    selectedimgURL && <div className="edit-btn" onClick={handleUpload}>{uploadProgress===0?"Upload Photo":`Uploaded ${uploadProgress}%`}</div>
                }
                <input type="file"  id='up' accept="image/*" onChange={handleImageChange} style={{display:"none"}}  ref={fileInputRef}/>
                <div className="del-btn" onClick={()=>{
                    fileInputRef.current.value = null;
                    setUploadProgress(0)
                    setSelectedImageURL(null)}}>Delete</div>
            </div>

        </div>
    </div>
  )
}

export default ProfileDash