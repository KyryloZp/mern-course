import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect( ()=> {
        window.M.updateTextFields()
    }, [] )

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }



    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input id="email"
                                       type="text"
                                       name="email"
                                       placeholder="Введите почту"
                                       className="yellow-input"
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Ваша почта</label>
                            </div>
                            <div className="input-field">
                                <input id="password"
                                       type="password"
                                       name="password"
                                       placeholder="Введите пароль"
                                       className="yellow-input"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Ваш пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 auth_button"  disabled={loading} onClick={loginHandler}> Войти</button>
                        <button className="btn grey lighten-1 black-text auth_button" onClick={registerHandler} disabled={loading}> Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
