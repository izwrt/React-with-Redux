import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((state)=>{return state.customer.fullName})

  console.log("name",customer)
    return <h2>👋 Welcome, {customer}</h2>;
  }
  
  export default Customer;