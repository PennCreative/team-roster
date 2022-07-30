import { useAuth } from '../utils/context/authContext';
// import logo from '../public/doge2.png';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome, {user.displayName}! </h1>
      <img src="/images/doge.png" alt="DOGEBALL" />
      <p>Create your own team today!</p>
    </div>
  );
}

export default Home;
