import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../../App"
export default function SignIn() {
    const { username, setUsername, password, setPassword, setSign, setAuth } = useContext(MyContext)
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    function signIn(event) {
        localStorage.setItem("loginUsername", username)
        localStorage.setItem("loginPass", password)
        event.preventDefault();
        if (localStorage.getItem("loginUsername") === localStorage.getItem("username") &&
            localStorage.getItem("loginPass") === localStorage.getItem("password")) {
            console.log("they are the same")
            navigate("/")
            setSign("Sign-out")
            setAuth(true)
        } else {
            console.log("they are not the same")
            navigate("/sign-in")
            setError(true)
            localStorage.removeItem("loginUsername", username)
            localStorage.removeItem("loginPass", password)
        }
        setUsername("")
        setPassword("")
    }
    return (
        <div className="sign-In">
            <div className="signIn-Container">
                <h1>Login</h1>
                <form className="signIn-form" onSubmit={signIn}>
                    <div>
                        <label htmlFor="signInUser">Username</label>
                        <input type="text" id="signInUser" placeholder="Enter username" value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="signInPass">Password</label>
                        <input type="password" id="signInPass" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="errorLogin">Email or password not correct</p>}
                    <button className="signInBtn btn btn-primary">signIn</button>
                </form>
            </div>
        </div>
    )
}