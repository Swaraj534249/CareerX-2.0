import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const CustomerDetails = () => {

  const history = useNavigate("");

  const { id } = useParams("");
  console.log(id);

  const [getuserData, setuserData] = useState([]);
  console.log(getuserData);

  const getdata = async () => {

    const res = await fetch(`http://localhost:8003/getCustomer/${id}`, {
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

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteCustomer/${id}`, {
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
        history("/");
    }
}


  return (
    <div className='container mt-3'>
      <h1>Welcome </h1>

      <Card sx={{ maxWidth: 900 }}>
        <CardContent>
          <div className='add_btn mt-3'>
          <NavLink to={`/editCustomer/${getuserData._id}`}><button className='btn btn-primary me-2'><CreateIcon /></button></NavLink>
           
            <button className='btn btn-danger' onClick={()=>deleteuser(getuserData._id)}><DeleteIcon /></button>
            
          </div>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src='/profile.png' style={{ width: 50 }} alt="profile" />
              <h4 className='mt-3'>Name: <span style={{ fontWeight: 400 }}>{getuserData.name}</span></h4>
              <p className='mt-3'>Country: <span style={{ fontWeight: 400 }}>{getuserData.country}</span></p>
              <p className='mt-3'>State: <span style={{ fontWeight: 400 }}>{getuserData.state}</span></p>
              <p className='mt-3'>City: <span style={{ fontWeight: 400 }}>{getuserData.city}</span></p>
              <p className='mt-3'>Zip: <span style={{ fontWeight: 400 }}>{getuserData.zip}</span></p>
            </div>
            <div className='right_view col-lg-6 col-md-6 col-12'>
            <h4 className='mt-3'>Email: <span style={{ fontWeight: 400 }}>{getuserData.email}</span></h4>
            <p className='mt-3'>Contact: <span style={{ fontWeight: 400 }}>{getuserData.contact}</span></p>
              <h4 className='mt-3'>Added Date: <span style={{ fontWeight: 400 }}>{(new Date(getuserData.addDate)).toLocaleDateString()}</span></h4>
              

            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default CustomerDetails