import React,{useState, useEffect} from 'react'
import { storage, db } from "../firebase";
import firebase from "firebase";
import "../styles/ImageUpload.css";

export default function ImageUpload(props) {

    console.log(props)
    const [caption , setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");



     /*    useEffect(()=>{
            console.log(username)
        },[username]) */

    const handleChange =(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
        console.log(image)
    }

    const handleUpload =()=>{
        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on(
            "state_changed",
            (snapshot)=>{
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error)=> {
                alert(error.message);
            },
            ()=>{
                // upload completed
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    // post image into db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        image: url,
                        /* username: username  */
                    })
                    
                    // reset upload fields
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
    
    return (
        <div className="upload-container">
            <input type="file" onChange={handleChange}/>
            <input className="caption" type="text" placeholder="Caption..." onChange={event=> setCaption(event.target.value)} value={caption} />
            <progress value={progress} max="100" />
            <button className="modalButton" onClick={handleUpload}>Upload</button>
        </div>

    )
}
