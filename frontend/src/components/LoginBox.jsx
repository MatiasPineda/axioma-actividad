import { loginUser } from '../utils/auth'
import './LoginBox.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginBox() {
  const navigate = useNavigate();

  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [wrongCredentials, setWrongCredentials] = useState(false)


  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(dni, password)
      .then(() => {
        navigate(0)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setWrongCredentials(true)
        }
        else if (error.response.status === 403) {
          alert("Su cuenta ha sido bloqueada por múltiples intentos fallidos, por favor comuníquese con soporte")
        }
        console.log(error.response.data);
      });
  }

  return (
    <div className="login-container container content-login ng-scope">
      <article className="login-box">
        <h1 className="text-primary text-center text-light">
          Bienvenido a nuestro Portal <br />
          Personas <span className="text-regular">Banco en Línea</span>
        </h1>
        <div id="error-message" />
        <form>
          <div className="form-group user">
            <input
              type="text"
              name="dni"
              id="iduserName"
              placeholder="Rut Usuario"
              maxLength={12}
              required="true"
              onclick={()=>setWrongCredentials(false)}
              autofocus="true"
              delete-zero-left=""
              style={{ borderColor: "rgb(210, 210, 212)" }}
              value={dni}
              onChange={(e) => {
                wrongCredentials && setWrongCredentials(false)
                setDni(e.target.value)
              }}
            />
          </div>
          <div className="form-group pass">
            <input
              name="userpassword"
              type="password"
              maxLength={8}
              id="password"
              placeholder="Clave"
              required="true"
              value={password}
              onChange={(e) => {
                wrongCredentials && setWrongCredentials(false)
                setPassword(e.target.value)
              }}
            />
          </div>
          <div>
            <div className="row">
              <button
                type="button"
                className="btn success btn-block"
                id="idIngresar"
                onClick={handleLogin}
              >
                Ingresar
              </button>
            </div>
          </div>
          {wrongCredentials && <div className="alert" role="alert" >Credenciales incorrectas</div>}
        </form>
      </article>
    </div>
  )
}

export default LoginBox