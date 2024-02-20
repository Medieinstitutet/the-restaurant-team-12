import { ChangeEvent, useEffect, useState } from "react";
import "./../styles/Admin.scss";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import { Bookings } from "../models/Booking";

export const Admin = () => {
  const restaurantID = "65cdf38894d2af1c6aeae91d";

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLogIn, setShowLogIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showBookingDone, setShowBookingDone] = useState(true);

  const [showChange, setShowChange] = useState(false);
  const [showChangedMessage, setShowChangedMessage] = useState(false);
  const [bookingToUpdate, setBookingToUpdate] = useState<IBooking>({
    _id: "",
    restaurantId: restaurantID,
    date: "",
    time: "",
    numberOfGuests: 0,
    customerId: "",
  });
  const [updatedBooking, setUpdatedBooking] = useState<IBooking>({
    _id: "",
    restaurantId: restaurantID,
    date: "",
    time: "",
    numberOfGuests: 0,
    customerId: "",
  });

  useEffect(() => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65cdf38894d2af1c6aeae91d"
      )
      .then((response) => {
        setBookings([...response.data]);
      });
  }, []);

  const handleSwitch = () => {
    setShowLogIn(true);
    setShowButton(false);
  };
  const LogIn = () => {
    if (
      userName === "admin" ||
      (userName === "Admin" && password === "admin") ||
      password === "Admin"
    ) {
      setShowAdmin(true);
      setShowLogIn(false);
    }
  };
  const handleBookingChange = (bookingID: string, CustomerID: string) => {
    setShowChange(true);
    setShowAdmin(false);
    setUpdatedBooking({
      ...updatedBooking,
      _id: bookingID,
      customerId: CustomerID,
    });
  };

  const sendChangedData = async () => {
    const updatedBookingData = {
      id: updatedBooking._id,
      restaurantId: restaurantID,
      date: updatedBooking.date,
      time: updatedBooking.time,
      numberOfGuests: updatedBooking.numberOfGuests,
      customerId: updatedBooking.customerId,
    };

    const response = await axios.put(
      "https://school-restaurant-api.azurewebsites.net/booking/update/" +
        updatedBookingData.id,
      updatedBookingData
    );

    setShowChangedMessage(true);
    setShowChange(false);
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
  ///////////////////////////////////////////////////////////////

  const handleTimeChange = (time: string) => {
    setUpdatedBooking({ ...updatedBooking, time });
  };
  const NavigateToHomePage = () => {
    window.location.href = "/admin";
  };

  return (
    <>
      <div className="body">
        {showButton && (
          <div>
            <button onClick={handleSwitch}>Log in</button>
          </div>
        )}
        {showLogIn && (
          <div className="container">
            <div className="container-div">
              <div className="input-div">
                <div className="div-text">
                  Welcome to the Adminpage <br />
                  Please log in to continue:
                </div>
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
                  </div>
                  <div className="btn-div">
                    <button className="btn" onClick={LogIn}>
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAdmin && (
          <div className="container">
            <div className="admin-page">
              {bookings.map((allBookings) => {
                return (
                  <div key={allBookings._id} className="li-div">
                    <li key={allBookings._id}>
                      Date: {allBookings.date} Time:
                      {allBookings.time} Guests:{allBookings.numberOfGuests}
                    </li>

                    <button
                      onClick={() => handleRemoveBooking(allBookings._id)}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        handleBookingChange(
                          allBookings._id,
                          allBookings.customerId
                        )
                      }
                    >
                      Change info
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {showChange && (
          <div className="update">
            <p>Choose another date:</p>
            <input
              type="date"
              value={updatedBooking.date}
              onChange={(e) =>
                setUpdatedBooking({ ...updatedBooking, date: e.target.value })
              }
            />
            Choose different time:
            <button className="Btn" onClick={() => handleTimeChange("18:00")}>
              18:00
            </button>
            <button className="Btn" onClick={() => handleTimeChange("21:00")}>
              21:00
            </button>
            Choose amount of guests:
            <input
              type="number"
              value={updatedBooking.numberOfGuests}
              onChange={(e) =>
                setUpdatedBooking({
                  ...updatedBooking,
                  numberOfGuests: parseInt(e.target.value),
                })
              }
            />
            <button onClick={sendChangedData}>Update Booking</button>
          </div>
        )}
        {showChangedMessage && (
          <div>
            <div>
              Changes have been made <br />
              Continue to login
            </div>
            <button onClick={NavigateToHomePage}>Continue</button>
          </div>
        )}
      </div>
    </>
  );
};
