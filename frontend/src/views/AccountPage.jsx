import './AccountPage.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/userContext';
import { logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(AuthContext);
  const [accountData, setAccountData] = useState(null);

  const handleLogout = () => {
    logoutUser()
    setUserData(null)
    navigate("/");
  }

  useEffect(() => {
    setAccountData(userData?.account?.[0])
  }, []);

  return !accountData ? <> No hay información de esta cuenta</> : (
    <div style={{ padding: '3em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Consultar Cuentas</h1>
        </div>
        <div>
          <h2>
            user
          </h2>
        </div>
        <div className="logoutButton" onClick={handleLogout}>
          <h2>
            Salir
          </h2>
        </div>
      </div>
      <h2>Cuenta N° {accountData.number} (CLP)</h2>

      <span>Saldos y Movimientos</span>

      <div className="infowrapper">
        <div>
          Saldo al {new Date().toLocaleString()} Hrs.
        </div>
        <div style={{ height: '2rem' }} />
        <div className='class1' style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <div>
              Saldo disponible Cuenta Corriente
            </div>
            <div>
              <span className="moneySign">$</span> {accountData.current_balance}
            </div>
            <div style={{ height: '1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Saldo Contable</div>
              <div>$ {accountData.accounting_balance}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Retenciones 24H</div>
              <div>$ 0</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Retenciones 48H</div>
              <div>$ 0</div>
            </div>
          </div>
          <div style={{ width: '2rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <div>
              Saldo disponible Línea de Crédito
            </div>
            <div>
              <span className="moneySign">$</span>
              <span className="moneyText">
                {accountData.line_of_credit_balance}
              </span>
            </div>
            <div style={{ height: '1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Total Cargos</div>
              <div>$ {accountData.total_charges}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Total Abonos</div>
              <div>$ {accountData.total_credits}</div>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default AccountPage;
