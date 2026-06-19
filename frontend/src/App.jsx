import Login from './pages/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Pantry from './pages/Pantry'
import Recipe from './pages/Recipe'
import Additems from './pages/Additems'
import Edititem from './pages/Edititem'
import Footer from './components/footer'
import Sidebar from './components/Sidebar'
import ProtectedRoutes from './components/ProtectedRoutes'
import RecipeDetail from './pages/RecipeDetail'
function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/> 
    <Routes>
      <Route path='/' element ={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>} />

      <Route path='/dashboard' element={
        <ProtectedRoutes> 
          <div className='flex'>
          <Sidebar/>
          <div className='flex-1 ml-64'> <Dashboard/> </div>
          </div>
           </ProtectedRoutes>
      }/>
      <Route path='/pantry' element={
        <ProtectedRoutes>
          <div className='flex'>
            <Sidebar/>
            <div className='flex-1 ml-64'> <Pantry/> </div>
          </div>
          </ProtectedRoutes>}/>
      <Route path='/additem' element={
        
        <ProtectedRoutes>
          <div className='flex'>
            <Sidebar/>
           <div className='flex-1 ml-64'> <Additems/> </div>
          </div>
          </ProtectedRoutes>}/>
      <Route path="/Edititem/:id" element={
        <ProtectedRoutes>
           <div className='flex'>
            <Sidebar/> 
            <div className='flex-1 ml-64'>  <Edititem/> </div>
            </div>
           </ProtectedRoutes>} />
      <Route path="/recipes" element={
        <ProtectedRoutes>
          <div className='flex'>
            <Sidebar/> 
            <div className='flex-1 ml-64'> <Recipe/> </div>
            </div>
          </ProtectedRoutes>} />
      <Route path='/recipes/:id' element={
        <ProtectedRoutes>
          <div className='flex'>
            <Sidebar/> 
            <div className='flex-1 ml-64'> <RecipeDetail/> </div>
            </div>
           </ProtectedRoutes>
      }/>  
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}
export default App