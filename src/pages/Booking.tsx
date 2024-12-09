import "./../styles/Booking.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import bild from "./../assets/SidePicBooking.png";

import axios from "axios";
import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import { INewCustomer } from "../models/INewCustomer";
import Calendar from "react-calendar";

export const Booking = () => {
  const restaurantID = "65cdf38894d2af1c6aeae91d";

  /////////////////// States ////////////////////

  const [date, setDate] = useState("");
  const [userInputNumber, setUserInputNumber] = useState("");

  const [chosenTime, setChosenTime] = useState("");
  const [time18Button, setTime18Button] = useState(false);
  const [time21Button, setTime21Button] = useState(false);
  const [ShowForm, setShowForm] = useState(true);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showBookedMessage, setShowBookedMessage] = useState(false);
  const [showErrorForInput, setShowErrorForInput] = useState(false);
  const [showErrorForDate, setShowErrorForDate] = useState(false);
  const [showErrorForCustomer, setShowErrorForCustomer] = useState(false);
  const [fullyBooked, setFullyBooked] = useState(false);
  const [showErrorForPhone, setShowErrorForPhone] = useState(false);

  const [newCustomer, setNewCustomer] = useState<INewCustomer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [bookings, setBookings] = useState<IBooking[]>([]);

  //////////////// Hämta alla bokningar från API ////////////////////

  useEffect(() => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65cdf38894d2af1c6aeae91d"
      )
      .then((response) => {
        setBookings([...response.data]);
      });
  }, []);
  /////////////////////////////////////////////////////////////////
  //////////////// Skapande av alla funktioner ////////////////////
  /////////////////////////////////////////////////////////////////
  const chosenTimeToEat = (time: string) => {
    setChosenTime(time);
    setShowForm(false);
    setShowCustomerForm(true);
  };

  const handleCalendarClick = (value: Date) => {
    const dateString = value.toLocaleDateString();

    setDate(dateString);
    console.log(dateString);
  };
  // Kollar lediga bord samt validering och felmeddelande
  const CheckIfAvailableTables = () => {
    if (userInputNumber === "" && date === "") {
      setShowErrorForInput(true);
      setShowErrorForDate(true);
      setTime18Button(false);
      setTime21Button(false);
    } else if (userInputNumber === "") {
      setShowErrorForInput(true);
      setShowErrorForDate(false);
      setTime18Button(false);
      setTime21Button(false);
    } else if (date === "") {
      setShowErrorForDate(true);
      setShowErrorForInput(false);

      setTime18Button(false);
      setTime21Button(false);
    } else {
      setShowErrorForDate(false);
      setShowErrorForInput(false);
      let amountOfTables = 15;

      let checkDate = date;
      let bookedTablesat18 = 0;
      let bookedTablesat21 = 0;

      for (let i = 0; i < bookings.length; i++) {
        const order = bookings[i];

        if (order.date === checkDate && order.time === "18:00") {
          bookedTablesat18++;
        }
        if (order.date === checkDate && order.time === "21:00") {
          bookedTablesat21++;
        }
      }
      if (bookedTablesat18 < amountOfTables) {
        setTime18Button(true);
        console.log("available tables");
      } else {
        console.log("Its fully booked");
      }
      if (bookedTablesat21 < amountOfTables) {
        setTime21Button(true);
        console.log("available tables");
      } else {
        console.log("Its fully booked");
      }
      if (bookedTablesat18 && bookedTablesat21 === amountOfTables) {
        setFullyBooked(true);
      }
    }
  };

  // funktion för att avbryta bokning
  const CancelBooking = () => {
    setDate("");
    setChosenTime("");
    setUserInputNumber("");
    setShowCustomerForm(false);
    setShowForm(true);
    setTime18Button(false);
    setTime21Button(false);
  };

  const NavigateToHomePage = () => {
    window.location.href = "/";
  };
  // Skapa bokning på "Slutför" knappen
  const CreateBooking = () => {
    if (
      newCustomer.name === "" ||
      newCustomer.lastname === "" ||
      newCustomer.email === "" ||
      newCustomer.phone === ""
    ) {
      setShowErrorForCustomer(true);
    } else if (newCustomer.phone.length < 10 || newCustomer.phone.length > 10) {
      setShowErrorForPhone(true);
    } else {
      setShowBookedMessage(true);
      setShowCustomerForm(false);
      let customer = new Customer(
        newCustomer.name,
        newCustomer.lastname,
        newCustomer.email,
        newCustomer.phone
      );
      const payload = {
        restaurantId: restaurantID,
        date: date,
        time: chosenTime,
        numberOfGuests: parseInt(userInputNumber),
        customer,
      };
      const getData = async () => {
        try {
          const response = await axios.post(
            "https://school-restaurant-api.azurewebsites.net/booking/create",

            payload
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  };
  /////////////////////////////// HTML struktur för Bookingsidan ////////////////////////////
  return (
    <>
      <div className="bodyn">
        <div className="leftside">
          {ShowForm && (
            <div>
              <section className="section-container">
                <header className="section-header">
                  <div className="text-div-container">
                    <p>Låt oss skapa magiska smakögonblick tillsammans!</p>
                    <p> Välj datum och tid som passar er bäst!</p>
                  </div>
                </header>
              </section>
              <form
                className="input-form"
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                }}
              >
                <input
                  className="input-number"
                  type="number"
                  min={1}
                  max={6}
                  placeholder="Ange antalet gäster 1-6"
                  value={userInputNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUserInputNumber(e.target.value);
                  }}
                />
                {showErrorForInput && (
                  <div className="error-message">
                    Vänligen ange antalet gäster
                  </div>
                )}

                <div className="calendar-div">
                  <Calendar
                    onClickDay={(value) => handleCalendarClick(value)}
                    value={date}
                    minDate={new Date()}
                  />
                </div>
                {showErrorForDate && (
                  <div className="error-message">Vänligen ange datum</div>
                )}

                <button
                  className="next-button"
                  onClick={CheckIfAvailableTables}
                >
                  Nästa
                </button>
              </form>

              <section className="times-section">
                <div className="times-div">
                  {time18Button && (
                    <div>
                      <button
                        className="time-btn"
                        onClick={() => chosenTimeToEat("18:00")}
                      >
                        18:00
                      </button>
                    </div>
                  )}
                  {time21Button && (
                    <div>
                      <button
                        className="time-btn"
                        onClick={() => chosenTimeToEat("21:00")}
                      >
                        21:00
                      </button>
                    </div>
                  )}
                  {fullyBooked && (
                    <div className="error-message">
                      Denna dag är tyvärr fullbokad, vänligen välj annat datum
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {showCustomerForm && (
            <div className="customer-details">
              <div>
                <div className="extra-form-div">
                  <h3>
                    Unlock the full experience by providing the remaining
                    details to complete your booking.
                  </h3>
                </div>
                <div className="info-booking-text">
                  Guest: {userInputNumber} <br />
                  Time: {chosenTime} <br />
                  Date: {date}
                </div>
              </div>
              <form
                className="form"
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                }}
              >
                <div className="form-div">
                  {showErrorForCustomer && (
                    <div className="error-message">
                      Vänligen fyll i alla fälten
                    </div>
                  )}
                  {showErrorForPhone && (
                    <div className="error-message">
                      Telefonnummer skall bestå av 10 siffror
                    </div>
                  )}

                  <div className="input-divs">
                    <input
                      className="input-text"
                      type="text"
                      name="name"
                      placeholder="Namn"
                      value={newCustomer.name}
                      onChange={(e) =>
                        setNewCustomer({ ...newCustomer, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-divs">
                    <input
                      className="input-text"
                      type="text"
                      name="lastName"
                      placeholder="Efternamn"
                      value={newCustomer.lastname}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input-divs">
                    <input
                      className="input-text"
                      type="text"
                      name="email"
                      placeholder="email"
                      value={newCustomer.email}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input-divs">
                    <input
                      className="input-text"
                      type="text"
                      name="phone"
                      placeholder="Telefon"
                      value={newCustomer.phone}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <p className="gdpr-text">I consent to TastyBurgers storing my data:</p>
                  <input type="checkbox"  required/>

                  <div className="yeye">
                    <button className="next-button" onClick={CreateBooking}>
                      Slutför
                    </button>
                    <button className="next-button" onClick={CancelBooking}>
                      Avbryt
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {showBookedMessage && (
            <>
              <div className="input-divs">
                <p className="end-message">
                  Din bokning är nu skapad! Vi ser fram emot erat besök.
                </p>
              </div>
              <div className="input-divs">
                <button className="time-btn" onClick={NavigateToHomePage}>
                  Till Start
                </button>
              </div>
            </>
          )}
        </div>
        <div className="picdiv">
          <img src={bild} className="bild" />
        </div>
      </div>
    </>
  );
};
