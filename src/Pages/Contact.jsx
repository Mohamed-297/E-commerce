import { useState } from "react"

export default function Contact() {
    const [formData,setFormData]=useState({
        email:"",
        username:"",
        password:"",
        message:"",

    })
    function handleChange(event){
        const{name,value,checked,type}=event.target
        setFormData(prevForm=>{
            return{...prevForm,
            [name]:type==="checkbox"?checked:value
        }})
    }
    function handleReset(event){
        event.preventDefault()
    setFormData({
        email:"",
        username:"",
        password:"",
        message:"",
    })
    }
    function handleSubmit(event){
        event.preventDefault()
        
        setFormData({
            email:"",
            username:"",
            password:"",
            message:"",
        })
    }
    console.log(formData)
    return (
        <div className="contact">
            <div className="form-container">
                <h1>Contact-Us</h1>
                <form onSubmit={handleSubmit} className="contact-form">
                    
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={handleChange} placeholder="Enter email" value={formData.email}/>
                    </div>
                    
                    <div>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" id="username" onChange={handleChange} placeholder="Enter username" value={formData.username}/> 
                    </div>

                    <div>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" id="password" onChange={handleChange} placeholder="Enter password" value={formData.password}/>
                    </div>
                    
                    <div>

                        <label htmlFor="comment">Your comment here</label>
                        <textarea type="text" name="message" id="comment" onChange={handleChange} placeholder="Enter comment " value={formData.message}/>
                    </div>
                    
                    <div className="contact-buttons">
                        <button onClick={handleReset} className="reset btn btn-danger">Reset</button>
                        <button className="submit btn btn-primary">Send</button>
                    </div>

                </form>
            </div>
        </div>
    )
}