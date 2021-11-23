import { types } from "../../types/types";

export const chatReducer = ( state  , action ) =>{

    // const initialState = {
    //     uid:'',
    //     chatActivo:null, // UID del usuario ql que yo quiero enviar mensajes
    //     usuarios: [],   // s Todos los usuarios de la base de datos
    //     mensajes : [], // El chat selecionado
    // }


    switch (action.type) {
        case types.usuariosCargados:
            
            return {
                ...state,
                usuarios: [...action.payload]
            }
        case types.activarChat:
            
            if( state.chatActivo === action.payload ) return state;

            return {
                ...state,
                chatActivo : action.payload,
                mensajes : []
            }

        case types.nuevoMensaje:
            if( state.chatActivo  === action.payload.de || state.chatActivo  === action.payload.para ){

                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            }else{
                
                return state

            }
        case types.cargarMnesaje:
        
            return {
                ...state,
                mensajes: [...action.payload]
            }
        case types.cerrarSession:
    
            return {
                uid:'',
                chatActivo:null, 
                usuarios: [],   
                mensajes : [], 
            }
        default:
            return state;
    }


}

