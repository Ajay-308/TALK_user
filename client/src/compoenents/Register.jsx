import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../assets/interview-image-removebg-preview.png";

const Register = () => {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const PostData = async (e) => {
        e.preventDefault();



        if (password !== confirmPassword) {
            window.alert("Password and Confirm Password must match");
            return;
        }

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, username, password, cpassword: confirmPassword
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            localStorage.setItem('token', data.token);
            window.alert("Registration Successful");
            history.push('/');
            window.location.reload();
        } else {
            window.alert("Registration Failed");
        }
    }


    return (
        <div className="w-full min-h-screen bg-black flex items-start">
            <form method="POST">
                <div className="relative w-1/2 h-full flex flex-col">
                    <h1 className="font-bold text-white font-mono mt-24 ml-16 italic text-2xl cursive">Master the art of fluent English with ease,
                        Together, we will conquer interviews and share success keys.</h1>
                    <img src={Logo} alt="logo" className="w-96 h-96 mt-32 ml-32" />
                </div>

                <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
                    <div className="w-full flex flex-col max-w-[450px]">
                        <div className="w-full flex flex-col mb-10">
                            <h3 className="text-2xl font-semibold mb-4 mt-10 ml-12 italic">Register</h3>
                            <p className="text-xm mb-2 ml-12">Create a new account</p>
                        </div>
                        <div className="w-full flex flex-col">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full ml-12 text-black border-b bg-transparent border-black outline-none focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full ml-12 mt-8 text-black border-b bg-transparent border-black outline-none focus:outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full ml-12 mt-8 text-black border-b bg-transparent border-black outline-none focus:outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}

                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full ml-12 mt-8 text-black border-b bg-transparent border-black outline-none focus:outline-none"
                            />
                        </div>
                    </div>
                    <NavLink to='/login'>Already Registered, then Login here!</NavLink><br /><br />
                    <div className="w-full flex flex-col my-4 ml-12">
                        <button
                            onClick={PostData}
                            className="w-full bg-black text-white my-2 rounded-full p-4 text-center flex items-center justify-center"
                        >
                            Register
                        </button>
                        <button className="w-full bg-transparent text-black my-2 border-black border-2 rounded-full p-4 text-center flex items-center justify-center">Already have an account? Login</button>
                    </div>
                </div>

            </form>

        </div>
    );
};

export default Register;
