import React, { useContext, useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { addData } from './context/ContextProvider';
import ReactPaginate from "react-paginate";

const Customer = () => {

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

  const deleteCustomer = async (id) => {
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
      getdata();
    }
  }

  const [pageNumber, setpageNumber] = useState(0);
  const userPerPage = 5;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = getuserData.slice(pagesVisited, pagesVisited + userPerPage)
    .map((getuserData, id) => {

      return (
        <tr >
          {/* <th scope="row">{id + 1}</th> */}
          <td>{getuserData.name}</td>
          <td>{getuserData.email}</td>
          <td>{getuserData.contact}</td>
          <td>{getuserData.country}</td>
          <td>{getuserData.state}</td>
          <td>{getuserData.city}</td>
          <td>{getuserData.zip}</td>
          <td>{(new Date(getuserData.addDate)).toLocaleDateString()}</td>
          <td className='d-flex justify-content-around'>
            <NavLink to={`viewCustomer/${getuserData._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
            <NavLink to={`editCustomer/${getuserData._id}`}><button className='btn btn-primary'><CreateIcon /></button></NavLink>
            <button className='btn btn-danger' onClick={() => deleteCustomer(getuserData._id)}><DeleteIcon /></button>
          </td>
        </tr>
      )
    })

const pageCount = Math.ceil(getuserData.length / userPerPage);
const changePage = ({selected}) =>{
setpageNumber(selected);
}

  return (

    <>

      <div className='mt-5'>
        <div className='container'>
          <div className='add_btn mt-2 mb-2'>
            <NavLink to="/registerCustomer" className='btn btn-primary'>Add Customer</NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className='table-dark'>
                {/* <th scope="col">Id</th> */}
                <th scope="col">Customer name</th>
                <th scope="col">Customer email</th>
                <th scope="col">Contact</th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">Zip</th>
                <th scope="col">Added Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody >

              {displayUsers}
<ReactPaginate 
          previousLabel = {"<  "}
          nextLabel = {"  >"}

          pageCount = {pageCount}
          onPageChange ={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"priviousBtn"}
          nextClassName={"nextBtn"}
          activeClassName = {"paginationActive"}
          />
            </tbody>
          </table>

          

        </div>
      </div>

    </>
  )
}

export default Customer