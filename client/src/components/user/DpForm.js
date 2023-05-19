import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPost, updateUserDp } from "../../utlis/api-utils";
import ImagePreview from "../post/ImagePreview";
import { getToken } from "../../utlis/storage-utils";
import { UserList } from "../../contexts/PostViewContext";

export default function DpForm({ setFalse }) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getToken()) navigate("/login");
    }, []);

    const [boo, setBoo] = useState(true);
    const { user, addUser, addPreview, preview } = useContext(UserList);
    const [formData, setFormData] = useState({ image: "" });

    function base64(file) {
        return new Promise((res, rej) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                res(fileReader.result)
            };
        })
    }

    async function formValidation(e) {
        e.preventDefault();
        setBoo(false);
        // const dp = new FormData(e.target);
        const dp = await base64(formData.image);

        updateUserDp(dp, user._id)
            .then(res => {
                console.log(res);
                if (res.status === "Success") {
                    addUser(res.user);
                    addPreview("");
                    setBoo(true);
                    setFalse();
                } else {
                    setBoo(true)
                    alert(res.message)
                }

            })
    }

    return <>
        <div className="new-dp-form">
            <button id="cancel" onClick={() => {
                addPreview("")
                setFalse();
            }}>X</button>
            <form onSubmit={formValidation} >
                <div className="input-field">
                    <input type={"file"} id="file" class="custom-file-input" name="profile_picture" accept="image/*" required onChange={(e) => {
                        addPreview(URL.createObjectURL(e.target.files[0]));
                        setFormData(ex => ({...ex, image : e.target.files[0]}));
                    }} />
                </div>
                <div className="preview-container">
                    {preview ? <ImagePreview /> : null}
                </div>
                <div className="btn-container" >
                    <button type="submit">{boo ? "change" : <span className="loader"></span>}</button>
                </div>
            </form>
        </div>
    </>
}