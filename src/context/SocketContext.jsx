import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { useSocket } from '../hooks/useSocket'

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    // desarrollo
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    //Produccion
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://chat-react-socket-tipowhatsapa.herokuapp.com');
    const {auth} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)


    useEffect(() => {
        if( auth.logged ){
            conectarSocket();
        }
    }, [auth,conectarSocket]);
   
    useEffect(() => {
        if( !auth.logged ){
            desconectarSocket();
        }
    }, [auth,desconectarSocket])

    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {

        socket?.on("lista-usuarios", ( usuarios )=>{
            dispatch({
                type:types.usuariosCargados,
                payload:usuarios
            })
        })


    }, [socket,dispatch])

    useEffect(() => {
        
        socket?.on('mensaje-personal', (mensaje) => {
            //todo: Dispatch de una accion

            dispatch({
                type:types.nuevoMensaje,
                payload: mensaje
            })

            //Todo: Moveer el scroll al final

            scrollToBottomAnimated('mensajes')

        })
        
    }, [socket, dispatch])



    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}