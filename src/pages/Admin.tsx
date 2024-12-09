import { ChangeEvent, useEffect, useState } from "react";
import "./../styles/Admin.scss";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import AdmingBookingItem from "../components/AdminBookingItem";


export const Admin = () => {
  const restaurantID = "65cdf38894d2af1c6aeae91d";

 // State variables
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLogIn, setShowLogIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showBookingDone, setShowBookingDone] = useState(true);

// Error handling states
  const [showErrorForCustomer, setShowErrorForCustomer] = useState(false);
  const [showErrorForInput, setShowErrorForInput] = useState(false);
  const [showErrorForDate, setShowErrorForDate] = useState(false);

 // States for booking updates
  const [showChange, setShowChange] = useState(false);
  const [showChangedMessage, setShowChangedMessage] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState<IBooking>({
    
    _id: "",
    restaurantId: restaurantID,
    date: "",
    time: "",
    numberOfGuests: 0,
    customerId: "",
  });

  // Fetch bookings on component mount
  useEffect(() => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65cdf38894d2af1c6aeae91d"
      )
      .then((response) => {
        setBookings([...response.data]);
      });
  }, []);


// Switch to login view
  const handleSwitch = () => {
    setShowLogIn(true);
    setShowButton(false);
  };

// Login function
  const LogIn = () => {
    if (
      userName === "admin" ||
      (userName === "Admin" && password === "admin") ||
      password === "Admin"
    ) {
      setShowAdmin(true);
      setShowLogIn(false);
    } else {
      setShowErrorForCustomer(true);
    }
  };

  // Handle booking change request
  const handleBookingChange = (bookingID: string, CustomerID: string) => {
    setShowChange(true);
    setShowAdmin(false);
    setUpdatedBooking({
      ...updatedBooking,
      _id: bookingID,
      customerId: CustomerID,
    });
  };

  // Send updated booking data to the server
  const sendChangedData = async () => {
    if (!updatedBooking.date || !updatedBooking.numberOfGuests) {
      setShowErrorForDate(!updatedBooking.date);
      setShowErrorForInput(!updatedBooking.numberOfGuests);
      return;
    }

    const updatedBookingData = {
      id: updatedBooking._id,
      restaurantId: restaurantID,
      date: updatedBooking.date,
      time: updatedBooking.time,
      numberOfGuests: updatedBooking.numberOfGuests,
      customerId: updatedBooking.customerId,
    };

    try {
      const response = await axios.put(
        "https://school-restaurant-api.azurewebsites.net/booking/update/" +
          updatedBookingData.id,
        updatedBookingData
      );
  
      setShowChangedMessage(true);
      setShowChange(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    
    }
  };

  ///// Removes a booking //////
  const handleRemoveBooking = async (bookingID: string) => {
    const response = await axios.delete(
      "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
        bookingID
    );
    setBookings((prevBookings) =>
      prevBookings.filter((Allbooking) => Allbooking._id !== bookingID)
    );

    setShowBookingDone(true);
  };

  // Handle time change
  const handleTimeChange = (time: string) => {
    setUpdatedBooking({ ...updatedBooking, time });
  }; 

  // Navigate to home page
  const NavigateToHomePage = () => {
    window.location.href = "/admin";
  };

  return (
    <>
      <div className="body-admin">
        {showButton && (
          <div className="login-button">
            <button onClick={handleSwitch}>Log in</button>
          </div>
        )}
        {showLogIn && (
          <div className="admin-container">
            <div className="div-text">
                  <h4> Welcome to the Adminportal</h4>
                  <p> Our new booking system makes it easy for us to adjust reservations on the fly. This means smoother operations and happier customers. Let's use this tool to work together seamlessly and make our guests' experiences even better!
            </p>
            <div className="div-text-2"> 
              <p> Are you part of our lovely staff?</p>
                  <p> Please log in to continue:</p>
                  </div>
           
                </div>
              <div className="input-div-admin">
                
                <div>
                  <div>
                    <input
                      className="input-admin"
                      type="text"
                      placeholder="Användarnamn"
                      value={userName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <input
                      className="input-admin"
                      type="password"
                      placeholder="Lösenord"
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                    />
                    {showErrorForCustomer && (
                       <div className="error-message">
                        Incorrect username or password. Please try again.
                        </div>
                        )}

                  </div>
                  <div className="btn-div">
                    <button className="btn" onClick={LogIn}>
                      Log in
                    </button>
                  </div>
                </div>
              </div>
          </div>
        )}
        {showAdmin && (
          <div className="container">
            <div className="admin-page">
              {bookings.map((booking) => {
                return (
                  <AdmingBookingItem
                  key={booking._id}
                  booking={booking}
                  onRemove={handleRemoveBooking}
                  onChange= {handleBookingChange}
                  />
                  )
                  })}
            </div>
          </div>
    )}
        {showChange && (
          <div className="update">
            <p >Choose another date:</p>
            <input className="admin-change-forum"
              type="date"
              value={updatedBooking.date}
              onChange={(e) =>
                setUpdatedBooking({ ...updatedBooking, date: e.target.value })
              }
            />
             {showErrorForDate && (
                  <div className="error-message">Vänligen ange datum</div>
                )}
           <p className="admin-change-text"> Choose different time:</p>
            <button className="change-button" onClick={() => handleTimeChange("18:00")}>
              18:00
            </button>
            <button className="change-button" onClick={() => handleTimeChange("21:00")}>
              21:00
            </button>
            <p className="admin-change-text">Choose amount of guests:</p>
            <input className="admin-change-forum"
               type="number"
               min={1}
               max={6}
               placeholder="Ange antalet gäster 1-6"
              value={updatedBooking.numberOfGuests}
              onChange={(e) =>
                setUpdatedBooking({
                  ...updatedBooking,
                  numberOfGuests: parseInt(e.target.value),
                })
              }
            />
            {showErrorForInput && (
                  <div className="error-message">
                    Vänligen ange antalet gäster
                  </div>
                )}
            <button className="change-button" onClick={sendChangedData}>Update Booking</button>
          </div>
        )}
        {showChangedMessage && (
          <div>
            <div className="admin-change-continue">
              Changes have been made <br />
              Continue to login
            </div>
            <button className="change-button" onClick={NavigateToHomePage}>Continue</button>
          </div>
        )}
      </div>
    </>
  );
};
