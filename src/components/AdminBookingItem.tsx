import { useState } from "react";
import { IBooking } from "../models/IBooking";
import axios from "axios";


//interfaces 
//2 olika gränssnitt 

interface IAdminItemProps {
    booking: IBooking;
    onRemove: (customerId: string) => void;
    onChange: (bookingId: string, customerId: string)=> void;
}
interface ICustomer {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string; 
}

//state
const AdmingBookingItem = (props: IAdminItemProps) => {
    const [customer, setCustomer]= useState<ICustomer>();
//function
    const handleGetCustomer = async () => {
        try {
            const response = await axios.get<ICustomer[]>(
                "https://school-restaurant-api.azurewebsites.net/customer/" + props.booking.customerId);
                setCustomer(response.data[0]);
        }catch (error) {
            console.error("Error when fetching customer data")
        }
    };
  
//rendering med props
    return (
        <div key={props.booking._id} className="li-div">
          <li key={props.booking._id}>
            Customer ID: {props.booking.customerId} <br />
            Date: {props.booking.date}  <br />
            Time:{props.booking.time} <br />
            Guests:{props.booking.numberOfGuests}
          </li>
          {customer && (
            <li>
                Name: {customer?.name} <br />
                Last Name:  {customer?.lastname} <br />
                Phone: {customer?.phone} <br />
                Email: {customer?.email}
            </li>
          )}

          <button className="change-booking-btn"
            onClick={() => props.onRemove(props.booking._id)}
          >
            Remove
          </button>
          <button className="change-booking-btn"
            onClick={() =>
             props.onChange(props.booking._id, props.booking.customerId)
            }
          >
            Change info
          </button>
          <button className="customer-details-btn" onClick={handleGetCustomer}>
            Customer Details
          </button>
        </div>
      );
}

export default AdmingBookingItem