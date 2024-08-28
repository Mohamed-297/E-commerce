
import { useContext, useState } from "react"
import { MyContext } from "../../App"
export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [username, setUsername] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passError, setPassError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [succReg, setSuccReg] = useState("")
    const { setItemsInCart } = useContext(MyContext)
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    function signUp(event) {
        event.preventDefault()
        if (regex.test(email) && password === rePassword && password.length > 6 && username.length > 4) {

            localStorage.setItem("email", email)
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
            localStorage.setItem("rePassword", rePassword)
            setItemsInCart([])
            setSuccReg("Successfully registered")
            setEmail("")
            setPassword("")
            setRePassword("")
            setUsername("")
            setEmailError("")
            setPassError("")
            setUsernameError("")
        }
        if (!regex.test(email)) {
            setEmailError("Enter valid email")
            setSuccReg("")
        }
        if (password.length < 6) {
            setPassError("Password should be more than 6 characters")
            setSuccReg("")
        }
        if (password !== rePassword) {
            setPassError("Passwords don't match")
            setSuccReg("")
        }
        if (username.length < 4) {
            setUsernameError("Username should be more than 4 characters")
            setSuccReg("")
        }

    }
    return (
        <div className="sign-Up">
            <div className="signUp-container">
                <h1>Sign up</h1>
                <form className="signUp-form" onSubmit={signUp}>
                    <div>
                        <label htmlFor="signUpEmail">Email</label>
                        <input type="text" id="signUpEmail" required placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: "red", padding: 0, margin: 0 }} className="errRegister">{emailError}</p>
                    </div>
                    <div>
                        <label htmlFor="signUpPass">Password</label>
                        <input type="password" id="signUpPass" required placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ color: "red", padding: 0, margin: 0 }} className="errRegister">{passError}</p>
                    </div>
                    <div>
                        <label htmlFor="signUpRePass">Re-password</label>
                        <input type="password" id="signUpRePass" required placeholder="Re-enter password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                        <p style={{ color: "red", padding: 0, margin: 0 }} className="errRegister"></p>
                    </div>
                    <div>
                        <label htmlFor="signUpReUsername">Username</label>
                        <input type="text" id="signUpReUsername" required placeholder="enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p style={{ color: "red", padding: 0, margin: 0 }} className="errRegister">{usernameError}</p>
                    </div>

                    <p style={{ color: "green", padding: 0, margin: 0 }} className="errRegister">{succReg}</p>
                    <button className="signUpBtn btn btn-primary" >SignUp</button>
                </form>
            </div>
        </div>
    )
}