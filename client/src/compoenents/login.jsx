
import Logo from "../assets/interview-image-removebg-preview.png"
import { GoogleLogin } from "react-google-login"

const Login = () => {


    const handleGoogleLogin = async (response) => {
        try {
            const accessToken = response.accessToken;

            // Send the Google access token to your backend for validation and user authentication
            const responseFromBackend = await fetch('http://localhost:8080/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken }),
            });

            if (responseFromBackend.ok) {
                // Handle successful login on the frontend (e.g., set user state)
                console.log('Login successful');
            } else {
                // Handle login failure on the frontend
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };
    return (
        <div className="w-full min-h-screen bg-black flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <h1 className="font-bold text-white font-mono mt-24 ml-16 italic text-2xl cursive">Master the art of fluent English with ease,
                    Together, we will conquer interviews and share success keys.</h1>
                <img src={Logo} alt="logo" className="w-96 h-96 mt-32 ml-32" />
            </div>

            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
                <div className="w-full flex flex-col max-w-[450px]">
                    <div className="w-full flex flex-col mb-10">
                        <h3 className="text-2xl font-semibold mb-4 mt-10 ml-12 italic">Login</h3>
                        <p className=" text-xm mb-2 ml-12"> welcome user, please enter your details</p>
                    </div>
                    <div className="w-full flex flex-col">
                        <input type="email"
                            placeholder="Email"
                            className="w-full ml-12 text-black border-b bg-transparent border-black outline-none focus:outline-none"

                        />
                        <input type="password"
                            placeholder="Password"
                            className="w-full ml-12 mt-8 text-black border-b bg-transparent border-black outline-none focus:outline-none"

                        />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8">
                        <div className="w-full flex">
                            <input type="checkbox" className="w-4 h-4 mr-2 ml-12" />
                            <p className="text-sm">Remember me for 30 days</p>
                        </div>
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">forget password?</p>
                    </div>

                    <div className="w-full flex flex-col my-4 ml-12">
                        <button className="w-full bg-black text-white my-2 rounded-full p-4 text-center flex items-center justify-center">Login</button>
                        <button className="w-full bg-transparent text-black my-2 border-black border-2 rounded-full p-4 text-center flex items-center justify-center">Sign up</button>
                    </div>

                    <div className="w-full flex items-center ml-12 justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
                    </div>

                    <div className="w-full ml-12 bg-black text-white my-2 rounded-full p-4 mt-4 text-center flex items-center justify-center">
                        <GoogleLogin

                            clientId="1038763694046-q3vi47e21lb7lrq4cvh10epia1nfdds6.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={handleGoogleLogin}
                            onFailure={(error) => console.log('Google login failed:', error)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>

                </div>


            </div>

        </div >
    )
}

export default Login