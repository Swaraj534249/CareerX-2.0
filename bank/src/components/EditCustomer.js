import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate  } from "react-router-dom";

const EditCustomer = () => {

    const history = useNavigate("");

    const [inpVal, setInp] = useState({
        name:"",
        accNo:"",
        bank:"",
        add1:"",
        add2:"",
        city:"",
        country:"",
        zip:""
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
        setInp(data);
        console.log("Get Data");
      }
    }
  
    useEffect(() => {
      getdata();
    }, [])

    const updateuser = async(e)=>{
e.preventDefault();

const {name,accNo,bank,add1,add2,city,country,zip} = inpVal;

const res2 = await fetch(`http://localhost:8003/updateCustomer/${id}`, {
    method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,accNo,bank,add1,add2,city,country,zip
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
    history("/");
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
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" onChange={setData} value={inpVal.name} name='name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                
                <div class="col-lg-6 col-md-6 col-12  mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" onChange={setData} value={inpVal.email} name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="col-lg-6 col-md-6 col-12  mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contact</label>
                    <input type="text" onChange={setData} value={inpVal.contact} name='contact' class="form-control" id="exampleInputPassword1" />
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
                <div class="col-lg-6 col-md-6 col-12  mb-3">
                    <label for="exampleInputPassword1" class="form-label">Date</label>
                    <input type="date" onChange={setData} value={inpVal.addDate} name='addDate' class="form-control" id="exampleInputPassword1" />
                </div>
                



                </div>
                <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default EditCustomer