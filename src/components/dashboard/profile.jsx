
import React, { useRef, useState } from 'react'
import "./prof-main.css"
import {storage} from "../../firebase"
import {  getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import userEvent from '@testing-library/user-event';
import { decryptData, decryptString, encryptData } from '../encryption';
import {IoMdAddCircle} from "react-icons/io"
import { useNavigate } from 'react-router-dom';


const ProfileDash = () => {
  const [otpsending, setotpsending] = useState(false)
    const [selectedimgURL, setSelectedImageURL] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate=useNavigate()
    let jdata=decryptData(localStorage.getItem("user"))
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

     
      const addImageToDatabse=(imageurl)=>{
        const token=decryptString(localStorage.getItem("jwtToken"))
        const data = {
          id: jdata["_id"],
         img:imageurl
        };
    
        fetch('https://achieve-jee-server.onrender.com/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'AuthGuardPass' :process.env.REACT_APP_AUTHGUARD_PASS,
            'x-auth-token':token
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
           return response.json()
          })
          .then((responseData) => {
           
          })
          .catch((error) => {
           
          });
      }

      const handleVerifyOTP = () => {
        setotpsending(true)
        let token=decryptString(localStorage.getItem("jwtToken"))
       let jdata=decryptData(localStorage.getItem("user"))
        const data = {
       
         email:jdata["email"]
        };
    
        fetch('http://achieve-jee-server.onrender.com/api/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS,
            'x-auth-token': token,
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            setotpsending(false)
            if (response.ok) {
             
              return response.json(); 
            } else {
              // Handle error response
              return response.json().then(errorData => {
                throw new Error(`${errorData.msg}`);
              });
            }
          })
          .then((responseData) => {
            navigate("/verify-otp")
          })
          .catch((error) => {
           console.log(error)
          });
      };
    
      const resetData=(imgUrl)=>{
        addImageToDatabse(imgUrl) 
        let json=decryptData(localStorage.getItem('user'))
        json.image=imgUrl
        localStorage.removeItem("user")
        const data=encryptData(json)
        localStorage.setItem("user",data)
        setimg(imgUrl)
        
        
      }
      const handleUpload = () => {
        if (selectedImage) {
           
          const imageRef = ref(storage,`p-images/${jdata["_id"]}`)
    
          const uploadTask = uploadBytesResumable(imageRef,selectedImage)
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
             
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
             
              console.error('Upload error:', error);
            },
            () => {
             
              
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

                <img src={selectedimgURL?selectedimgURL:(img?img:"https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg")} alt="" />
                </div>
                <label htmlFor="up" style={{display:selectedimgURL?"none":"block"}} id="label-img">

                
                <IoMdAddCircle/>
                </label>
            </div>
            
            <div className="nea">
                <h3>{jdata["name"]}</h3>
                <h4>{jdata["email"]}</h4>
                <p>{jdata["address"]} IIT DELHI</p>
            </div>
            </div>
            <div className="prof-btns">
                
                {
                    selectedimgURL && <div className="edit-btn" onClick={handleUpload}>{uploadProgress===0?"Upload Photo":`Uploaded ${uploadProgress}%`}</div>
                }
                <input type="file"  id='up' accept="image/*" onChange={handleImageChange} style={{display:"none"}}  ref={fileInputRef}/>
                {
                  selectedimgURL && <div className="del-btn" onClick={()=>{
                    fileInputRef.current.value = null;
                    setUploadProgress(0)
                    setSelectedImageURL(null)}}>Delete</div>
                }
                
            </div>

        </div>
        {!jdata["verified"] && <h4>Please verify your email <a  style={{color:"blue",cursor:"pointer"}} onClick={handleVerifyOTP}>{otpsending?<div className="spinner-cir"></div>:"here"}</a></h4>}
    </div>
  )
}

export default ProfileDash