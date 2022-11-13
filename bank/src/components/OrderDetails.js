import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {

  const history = useNavigate("");

  const { id } = useParams("");
  console.log(id);

  const [getuserData, setuserData] = useState([]);
  console.log(getuserData);

  const getdata = async () => {

    const res = await fetch(`http://localhost:8003/getOrder/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    }
    else {
      setuserData(data);
      console.log("Get Data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const deleteOrder = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteOrder/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deletedata = await res2.json();

    console.log(deletedata);
    
    if (res2.status === 422 || !deletedata) {
        console.log("error");
    }
    else {
        console.log("Data deleted");
        // getdata();
        history("/orders");
    }
}


  return (
    <div className='container mt-3'>
      <h1>Welcome </h1>

      <Card sx={{ maxWidth: 900 }}>
        <CardContent>
          <div className='add_btn mt-3'>
          <NavLink to={`/orders/editOrder/${getuserData._id}`}><button className='btn btn-primary me-2'><CreateIcon /></button></NavLink>
           
            <button className='btn btn-danger' onClick={()=>deleteOrder(getuserData._id)}><DeleteIcon /></button>
            
          </div>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src='/profile.png' style={{ width: 50 }} alt="profile" />
              <h4 className='mt-3'>Order No.: <span style={{ fontWeight: 400 }}>{getuserData.orderNo}</span></h4>
              <h4 className='mt-3'>Brand: <span style={{ fontWeight: 400 }}>{getuserData.brand}</span></h4>
              <p className='mt-3'>Order Date: <span style={{ fontWeight: 400 }}>{(new Date(getuserData.orderDate)).toLocaleDateString()}</span></p>
              <p className='mt-3'>Expected Date: <span style={{ fontWeight: 400 }}>{(new Date(getuserData.expectedDate)).toLocaleDateString()}</span></p>
              <p className='mt-3'>Customer Name: <span style={{ fontWeight: 400 }}>{getuserData.customerName}</span></p>
              <p className='mt-3'>Product Count: <span style={{ fontWeight: 400 }}>{getuserData.productCount}</span></p>
            </div>
            <div className='right_view col-lg-6 col-md-6 col-12'>

              <h4 className='mt-3'>Order Status: <span style={{ fontWeight: 400 }}>{getuserData.orderStatus}</span></h4>
              <p className='mt-3'>Billing Address: <span style={{ fontWeight: 400 }}>{getuserData.bill}</span></p>
              <p className='mt-3'>Shipping Address: <span style={{ fontWeight: 400 }}>{getuserData.ship}</span></p>
              <p className='mt-3'>Country: <span style={{ fontWeight: 400 }}>{getuserData.country}</span></p>

            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default OrderDetails