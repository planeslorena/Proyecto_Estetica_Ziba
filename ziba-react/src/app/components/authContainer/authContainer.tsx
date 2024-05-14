import { useState } from "react";
import { LoginForm } from "../loginForm/loginForm";
import { RegisterForm } from "../registerForm/registerForm";

export const AuthContainer: React.FC = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    return (
        <>
            <div className="auth-container">
                <div className={`form-container ${isLoginForm ? 'login' : 'signup'}`}>
                    {isLoginForm ? (
                        <LoginForm onSwitchToRegister={() => { setIsLoginForm(false) }} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => { setIsLoginForm(true) }} />
                    )}
                </div>
            </div>
        </>
    )
}