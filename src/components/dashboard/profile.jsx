
import React, { useRef, useState } from 'react'
import "./prof-main.css"
const ProfileDash = () => {
    const [selectedimg, setSelectedImage] = useState(null)

    const fileInputRef = useRef(null);

    const img=JSON.parse(localStorage.getItem("user"))["image"]
    const handleImageChange = (event) => {
       
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
          } else {
            alert('Please select a valid image file.');
          }
      };
  return (
    <div className="container__prof">
        <h2>Profile</h2>
        <div className="img-edit-btns">
            <div className="img-edit">

            <div className="outer-cir">
                <div className="inner-cir">

                <img src={selectedimg?selectedimg:img} alt="" />
                </div>

            </div>
            <div className="nea">
                <h3>{JSON.parse(localStorage.getItem("user"))["name"]}</h3>
                <h4>{JSON.parse(localStorage.getItem("user"))["email"]}</h4>
                <p>{JSON.parse(localStorage.getItem("user"))["address"]} IIT DELHI</p>
            </div>
            </div>
            <div className="prof-btns">
                <label htmlFor="up">

                <div className="edit-btn">{selectedimg?"Upload image":"Choose new Photo"}</div>
                </label>
                <input type="file"  id='up' accept="image/*" onChange={handleImageChange} style={{display:"none"}}  ref={fileInputRef}/>
                <div className="del-btn" onClick={()=>{
                    fileInputRef.current.value = null;
                    setSelectedImage(null)}}>Delete</div>
            </div>

        </div>
    </div>
  )
}

export default ProfileDash