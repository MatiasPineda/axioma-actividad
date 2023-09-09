import Header from "../components/Header";
import BackGroundImage from "../assets/bg-login.jpg";
import Footer from "../components/Footer";
import LoginBox from "../components/LoginBox";

function HomePage() {

  return (
    <>
      <Header />
      <div style={{
        height: '90vh',
        backgroundColor: '#fff',
        backgroundImage: `url(${BackGroundImage})`,
      }}>
        <LoginBox />
        <Footer />
      </div>
    </>
  )
}

export default HomePage;
