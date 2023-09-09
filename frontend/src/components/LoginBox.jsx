import { loginUser } from '../utils/auth'
import './LoginBox.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginBox() {
  const navigate = useNavigate();

  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(dni, password)
      .then(() => {
        navigate(0)
      })
      .catch((error) => {
        if (error.response.status === 403) {
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
              onclick=""
              onkeyup="limpiarMensajeError('errorRut');pintarCasillaRut();"
              onblur="formatearRut(this.value);"
              autofocus="true"
              delete-zero-left=""
              style={{ borderColor: "rgb(210, 210, 212)" }}
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <small
              className="invalid"
              id="errorRut"
              hidden=""
              style={{ display: "none" }}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="ion-ios-locked" />
            <small className="invalid" id="errorPassword" hidden="" />
            <small
              className="invalid"
              id="capsLock"
              hidden=""
              style={{ display: "none" }}
            >
              Tecla mayúsculas activada
            </small>
          </div>
          <div>
            <div className="row">
              <input name="request_id" type="hidden" defaultValue="" />
              <input name="ctx" type="hidden" defaultValue="persona" />
              <div
                className="captcha-container form-group"
                style={{ display: "none" }}
              />
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
          <input type="hidden" name="username" id="iduserName1" />
        </form>
      </article>
    </div>
  )
}

export default LoginBox