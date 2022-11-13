import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { addData } from './context/ContextProvider';

const RegisterCustomer = () => {

    const history = useNavigate("");

    const [inpVal, setInp] = useState({
        name: "",
        email: "",
        contact: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        addDate: ""
    })
    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {

        e.preventDefault();

        const { name, email, contact, country, state, city, zip, addDate } = inpVal;

        const res = await fetch("http://localhost:8003/registerCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, contact, country, state, city, zip, addDate
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
            return
        }
        else {
            alert("Data added");
            console.log("Data added");
            // setuData(data);
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
                    <input type="date" onChange={setData} value={inpVal.addDate = new Date()} name='addDate' class="form-control" id="exampleInputPassword1" disabled/>
                </div>
                



                </div>
                <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegisterCustomer