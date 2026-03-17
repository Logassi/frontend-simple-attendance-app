import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Router from './routes/router';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Router />
    </div>
  );
}

export default App;
