import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactPaginate from 'react-paginate';

const Orders = () => {

    const [getOrderData, setOrderData] = useState([]);
  console.log(getOrderData);

  const getBankdata = async (e) => {

    const res = await fetch("http://localhost:8003/getOrders", {
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
        setOrderData(data);
      console.log("Get Data");
    }
  }

  useEffect(() => {
    getBankdata();
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
      getBankdata();
    }
  }

  const [pageNumber, setpageNumber] = useState(0);
  const userPerPage = 5;
  const pagesVisited = pageNumber * userPerPage;

  const displayOrders = getOrderData.slice(pagesVisited, pagesVisited + userPerPage)
    .map((getOrderData, id) => {

      return (
        <tr >
          {/* <th scope="row">{id + 1}</th> */}
          <td>{getOrderData.orderNo}</td>
          <td>{getOrderData.brand}</td>
          <td>{(new Date(getOrderData.orderDate)).toLocaleDateString()}</td>
          <td>{(new Date(getOrderData.expectedDate)).toLocaleDateString()}</td>
          <td>{getOrderData.customerName.value}</td>
          <td>{getOrderData.productCount}</td>
          <td>{getOrderData.orderStatus}</td>
          <td className='d-flex justify-content-around'>
            <NavLink to={`/orders/viewOrder/${getOrderData._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
            <NavLink to={`editOrder/${getOrderData._id}`}><button className='btn btn-primary'><CreateIcon /></button></NavLink>
            <button className='btn btn-danger' onClick={() => deleteOrder(getOrderData._id)}><DeleteIcon /></button>
          </td>
        </tr>
      )
    })

const pageCount = Math.ceil(getOrderData.length / userPerPage);
const changePage = ({selected}) =>{
setpageNumber(selected);
}

  return (
    <>
    
    <div className='mt-5'>
    <div className='container'>
      <div className='add_btn mt-2 mb-2'>
        <NavLink to="/registerOrder" className='btn btn-primary'>Add Order</NavLink>
      </div>

      <table class="table">
        <thead>
          <tr className='table-dark'>
            {/* <th scope="col">Id</th> */}
            <th scope="col">Order No.</th>
            <th scope="col">Brand</th>
            <th scope="col">Order Date</th>
            <th scope="col">Expected Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Product Count</th>
            <th scope="col">Order Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody >

          {displayOrders}
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

export default Orders