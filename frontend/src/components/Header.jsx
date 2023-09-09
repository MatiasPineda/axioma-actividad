import BancoDeChileLogo from '../assets/banco-de-chile-vector-logo.jpg';
import BancoEdwardsLogo from '../assets/logo-bec.png';

function Header() {
  return (
    <header style={{backgroundColor: 'white'}}>
      <div style={{ display: 'flex', justifyContent: 'space-around', height: '10vh' }}>

        <div style={{ height: '10vh', display: 'flex', alignItems: 'center' }} >
          <img
            src={BancoDeChileLogo}
            alt=""
            style={{ height: '40%', margin: 'auto' }}
          />
        </div>
        <div style={{ height: '10vh', display: 'flex', alignItems: 'center' }}>
          <img
            src={BancoEdwardsLogo}
            alt=""
            style={{ height: '40%' }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header