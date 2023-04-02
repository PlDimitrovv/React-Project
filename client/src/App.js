import { Route, Routes } from 'react-router-dom';
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
import { RecipeDetails } from './components/RecipeDetails/RecipeDetails';
import { EditRecipe } from './components/EditRecipe/EditRecipe';
import { UserProfile } from './components/UserProfile/UserProfile';
import { NotFound404 } from './components/404/NotFound404';
import { Guest } from './Guards/Guest';


function App() {

  const [user, setUser] = useLocalStorage('auth', {})

  const setUserSession = (data) => {
    setUser({ ...data })
  }


  return (
    <div>
      <AuthContext.Provider value={{ setUserSession, user }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/catalog/details/:recipeId' element={<RecipeDetails />} />

          <Route element={<Guest />}>
            <Route path='/create' element={<AddRecipe />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/catalog/:recipeId/edit' element={<EditRecipe />} />
          </Route>

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </AuthContext.Provider>
      <Footer />

    </div>
  );
}

export default App;
