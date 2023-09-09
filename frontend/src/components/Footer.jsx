import BancoDeChileLogo from '../assets/banco-de-chile-vector-logo.jpg';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'white',
      position: 'absolute',
      bottom: '0',
      width: '100%',
      color: '#666668',
      fontSize: '12px',
    }}>
      <div style={{ height: '8vh', display: 'flex', justifyContent: 'center' }}>
        <div className="separator" style={{ height: '8vh', display: 'flex', alignItems: 'center' }} >
          <img
            src={BancoDeChileLogo}
            alt=""
            style={{ height: '40%', margin: 'auto', filter: 'grayscale(100%)' }}
          />
        </div>
        <div className="separator" >
          <ul style={{ listStyleType: 'none' }}>
            <li>Casa Matriz: Ahumada 251, Santiago de Chile</li>
            <li>Mesa Central: [+56 2] 2653 1111</li>
            <li>Fonobank 600 637 3737</li>
          </ul>
        </div>
        <div>
          <ul style={{ listStyleType: 'none' }}>
            <li>Infórmese sobre la garantía estatal de los depósitos en su banco o en www.sbif.cl</li>
            <li>Citi y el diseño del arco es una marca de servicio registrada de Citigroup Inc. Uso bajo licencia</li>
            <li>
              <b>© 2023, Banco de Chile. Todos los Derechos Reservados</b>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer