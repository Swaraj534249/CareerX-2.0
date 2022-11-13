import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from './components/Navbar';
import { Routes ,Route } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';
import Customer from './components/Customer';
import EditCustomer from './components/EditCustomer';
import CustomerDetails from './components/CustomerDetails';
import Orders from './components/Order';
import RegisterOrder from './components/RegisterOrder';
import EditOrder from './components/EditOrder';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      
      <Route exact path='/' element={<Customer/>} />
      <Route exact path='/orders' element={<Orders/>} />
      
      <Route exact path='/registerCustomer' element={<RegisterCustomer/>}/>
      <Route exact path='/registerOrder' element={<RegisterOrder/>}/>
      
      <Route exact path='/editCustomer/:id' element={<EditCustomer/>}/>
      <Route exact path='/orders/editOrder/:id' element={<EditOrder/>}/>
      
      <Route exact path='/viewCustomer/:id' element={<CustomerDetails />}/>
      <Route exact path='/orders/viewOrder/:id' element={<OrderDetails />}/>
      
    </Routes>
    </>
  );
}

export default App;
