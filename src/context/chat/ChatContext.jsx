import React, { createContext, useReducer } from 'react'
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
    uid:'',
    chatActivo:null, // UID del usuario ql que yo quiero enviar mensajes
    usuarios: [],   // s Todos los usuarios de la base de datos
    mensajes : [], // El chat selecionado
}


export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState)


    return (
        <ChatContext.Provider
            value = {{
               chatState,
               dispatch
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

