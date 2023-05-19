import React, { useContext } from "react";
import { UserList } from "../../contexts/PostViewContext";


export default function ImagePreview() {

    const {preview} = useContext(UserList);

    return <>
        <div id="preview-img-container">
            <img src={preview} alt="preview" />
        </div>
    </>
    
}