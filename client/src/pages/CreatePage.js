import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom"

export const CreactePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
            })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input id="link"
                           type="text"
                           placeholder="Введите ссылку"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ваша ссылка</label>
                </div>
            </div>
        </div>
    )
}
