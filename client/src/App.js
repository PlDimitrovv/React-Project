import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog'
import { Home } from './components/Home/Home';
import { AddRecipe } from './components/AddRecipe/AddRecipe'
import { Register } from './components/Register/Register'
import { Login } from './components/Login/Login'
import { AuthContext } from './context/AuthContext';
import { useLocalStorage } from './hooks/authLocalStorage';
import { authLogout } from './services/authService';
import { RecipeDetails } from './components/RecipeDetails/RecipeDetails';


function App() {

  const [user, setUser] = useLocalStorage('auth', {})

  const setUserSession = (data) => {
    setUser({ ...data })
  }

  const navigate = useNavigate()

  const userLogout = async () => {
    await authLogout()
    setUser({})
    navigate('/')
  }


  return (
    <div>
      <AuthContext.Provider value={{ setUserSession, user, userLogout }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/create' element={<AddRecipe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/catalog/details/:recipeId' element={<RecipeDetails />} />
        </Routes>
      </AuthContext.Provider>
      <Footer />

    </div>
  );
}

export default App;
