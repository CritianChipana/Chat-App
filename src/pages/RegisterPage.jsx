import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext'

export const RegisterPage = () => {

    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        email:"",
        password:"",
        nombre:"",
    })

    const handleOnChange =({target})=>{

        const { name, value } = target;

        setForm({
            ...form,
            [name]:value
        })

    }

    const handleOnSumbit = async ( e ) =>{

        e.preventDefault();
        const { nombre, email, password } = form;
        const  msg  =  await register( nombre, email, password)
        console.log(msg);
        if( msg !== true ){
            Swal.fire("Error", msg, "error");
        }
    }


    const handleTodoOk = () =>{

        return ( form.email.length > 0 && form.password.length >0  && form.nombre.length>0) ? true : false


    }

    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={handleOnSumbit}
            >
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre" 
                    value={ form.nombre }
                    onChange={ handleOnChange }
                    />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={ form.email }
                    onChange={ handleOnChange }
                    />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={ form.password }
                    onChange={ handleOnChange } 
                    />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    className="login100-form-btn"
                    type="submit"
                    disabled={!handleTodoOk()}
                    >
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}
