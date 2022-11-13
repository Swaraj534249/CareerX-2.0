import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate  } from "react-router-dom";

const EditOrder = () => {

    const history = useNavigate("");

    const [inpVal, setInp] = useState({
        orderNo: "",
        brand: "",
        orderDate: "",
        customerName: "",
        productCount: "",
        orderStatus: "",
        country:"",
        state:"",
        city:"",
        zip:"",
        bill:"",
        ship:""
    })
    const setData = (e) =>{
        console.log(e.target.value);
        const {name,value} = e.target;
        setInp((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const { id } = useParams("");
    console.log(id);

    // const [getuserData, setuserData] = useState([]);
    // console.log(getuserData);
  
    const getOrder = async () => {
  
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
        setInp(data);
        console.log("Get Data");
      }
    }
  
    useEffect(() => {
        getOrder();
    }, [])

    const [getuserData, setuserData] = useState([]);
    console.log(getuserData);

    const getdata = async (e) => {

        const res = await fetch("http://localhost:8003/getCustomer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

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


    const updateOrder = async(e)=>{
e.preventDefault();

const {orderNo, brand, orderDate, customerName, productCount, orderStatus,bill,ship} = inpVal;

const res2 = await fetch(`http://localhost:8003/updateOrder/${id}`, {
    method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
            orderNo, brand, orderDate, customerName, productCount, orderStatus,bill,ship
        })
});

const data2 = await res2.json();
console.log(data2);

if(res2.status === 422 || !data2){
    alert("Fill the data");
    console.log("error");
    return
}
else{
    alert("Data added");
    console.log("Data added");
    history("/orders");
}
    }

  return (
    <div className='container'>
            <NavLink to="/">
                Home
            </NavLink>

            <form className='mt-5'>
                <div className='row'>
                    <div class="col-lg-6 col-md-6 col-12 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Order No.</label>
                        <input type="text" onChange={setData} value={inpVal.orderNo} name='orderNo' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Brand</label>
                        <input type="text" onChange={setData} value={inpVal.brand} name='brand' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12 d-none  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Date</label>
                        <input type="date" onChange={setData} value={inpVal.orderDate} name='orderDate' class="form-control" id="exampleInputPassword1" disabled/>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Expected Date</label>
                        <input type="date" onChange={setData} value={inpVal.expectedDate} name='expectedDate' class="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Customer</label>
                        <select onChange={setData} class="form-select" name='customerName' value={inpVal.customerName} aria-label="Default select example">
                            <option >Open this select menu</option>
                            {
                                getuserData.map((getuserData, id) => {
                                    return (
                                        <>
                                            <option value={getuserData._id} selected={inpVal.customerName == getuserData}>{getuserData.name}</option>
                                        </>
                                    )
                                })
                            }
                            {/* {getUserDate} */}
                        </select>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Product Count</label>
                        <input type="text" onChange={setData} value={inpVal.productCount} name='productCount' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Order Status</label>
                        {/* <input type="text" onChange={setData} value={inpVal.orderStatus} name='orderStatus' class="form-control" id="exampleInputPassword1" /> */}
                        <select onChange={setData} class="form-select" name='orderStatus' value={inpVal.orderStatus} aria-label="Default select example">
                            <option >Open this select menu</option>
                            <option value={"true"} selected={inpVal.orderStatus == "true"}>true</option>
                            <option value={"false"} selected={inpVal.orderStatus == "false"}>false</option>
                        </select>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Country</label>
                        <input type="text" onChange={setData} value={inpVal.country} name='country' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">State</label>
                        <input type="text" onChange={setData} value={inpVal.state} name='state' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">City</label>
                        <input type="text" onChange={setData} value={inpVal.city} name='city' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Zip Code</label>
                        <input type="text" onChange={setData} value={inpVal.zip} name='zip' class="form-control" id="exampleInputPassword1" />
                    </div>

                </div>
                <div className='row'>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Billing Address</label>
                        <textarea class="form-control" onChange={setData} value={inpVal.bill} name='bill' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Shipping Address</label>
                        <textarea class="form-control" onChange={setData} value={inpVal.ship} name='ship' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <button type="submit" onClick={updateOrder} class="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default EditOrder