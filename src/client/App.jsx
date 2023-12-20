import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import PostItemForm from './components/PostItemForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/post-item" element={<PostItemForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;
