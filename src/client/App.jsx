import { Routes, Route } from 'react-router-dom';
//import Header from './componenter as Routts/Header';
//import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
//import PostItemForm from './components/PostItemForm';
//import Login from './components/Login';
//import Register from './components/Register';

function App() {
    return (
       // <Router>
       <>            
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />

            </Routes>
          </>
      //</Router>
      
      );
    }
    
    //<Header />
    //<Footer />
//<Route path="/post-item" element={<PostItemForm />} />
//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} /> 

export default App;
