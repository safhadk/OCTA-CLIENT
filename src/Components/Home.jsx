import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from './InputField';
import Radio from './Radio';
import axios from '../Axios/userAxios';
import { Toast } from '../Helper/Toast';

function Home() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [next, setNext] = useState(1)
  const [wheels, setNumWheels] = useState(null)
  const [type, setType] = useState("")
  const [model, setModel] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [vehicleModel, setvehicleModel] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onNextClick = () => {
    const isFirstNameValid = firstName.trim().length > 0;
    const isLastNameValid = lastName.trim().length > 0;
    if (!isFirstNameValid) {
      setError("Please enter a valid first name");
    } else if (!isLastNameValid) {
      setError("Please enter a valid last name");
    } else if ((next === 2 && !wheels) || (next === 3 && !type) || (next === 4 && !model)) {
      setError("Please Select One Option");
    } else {
      setError(false);
      setNext(next + 1);
    }
  }

  //handle previous button click 

  const onPrevClick = () => {
    setNext(next - 1)
  }

  //handle submit button click 

  const submit = async () => {
    try {
      if (startDate > endDate) {
        setError("Start Date Must Be Less Than End Date");
      } else {
        const { data } = await axios.post('/', { firstName, lastName, wheels, type, model, startDate, endDate })
        if (!data) {
          setError("Car Already Booked Choose Other Dates");
          Toast.fire({ icon: "error", title: "Car Already Booked" });
        } else {
          Toast.fire({ icon: "success", title: "Booking Successful" }).then(() => {
            setNext(0);
            setSuccess(!success);
          });
          setError(false);
        }
      }
    } catch (err) {
      console.error(`Error in booking submit: ${err.message}`);
    }
  }

  //seeding vehicle data to db

  // const seedvehicles = async () => {
  //   const { data } = await axios.post("/")
  // }

  // useEffect(() => {
  //   seedvehicles()
  // }, [])

  //handle vehicle type

  const handleType = async (value) => {
    try {
      setType(value)
      setModel("")
      const { data } = await axios.get(`/?wheel=${wheels}&type=${value}`)
      setvehicleModel(data)
    } catch (err) {
      console.error(`Error in Vehicle Type Handling: ${err.message}`);
    }
  };

  //handle no of wheels

  const handleWheels = async (value) => {
    try {
      setNumWheels(value)
      setType("")
      const { data } = await axios.get(`/?wheel=${value}`)
      setVehicleTypes(data)
    } catch (err) {
      console.error(`Error in No Of Wheel Handling: ${err.message}`);
    }
  };

  return (
    <div className="mx-auto flex flex-col space-y-4 sm:w-1/2 md:w-1/3 lg:w-1/4 border-2 border-gray-300 bg-gray-100 p-6 rounded-lg">
      {error && <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
        <p>{error}</p>
      </div>}

      {success && <div class="bg-gray-100 ">
        <div class="bg-white p-6  md:mx-auto">
          <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Booking Confirmed!</h3>
            <p class="text-gray-600 my-2">Thank you for reserving your car online.</p>
            <p> Have a safe and enjoyable trip! </p>
          </div>
        </div>
      </div>

      }
      {next === 1 &&
        <>
          <InputField label={"First Name"} value={firstName} onChange={setFirstName} placeHolder={"Enter Your First Name"} />
          <InputField label={"Last Name"} value={lastName} onChange={setLastName} placeHolder={"Enter Your Last Name"} />
        </>
      }

      {next === 2 &&
        <>
          <label className="text-lg font-medium text-gray-700">
            Number Of Wheels
          </label>
          <div className="flex items-center mt-2">
            <Radio label={'2'} value={wheels} onChange={handleWheels} img={'/bike.png'} />
            <Radio label={'4'} value={wheels} onChange={handleWheels} img={'/car-rent-4.png'} />
          </div>
        </>
      }

      {next === 3 &&
        <>
          <label className="text-lg font-medium text-gray-700">
            Type of vehicle
          </label>
          <div className="flex items-center mt-2">
            {vehicleTypes.map((types) => (
              <Radio key={types} label={types} value={types === type ? type : null} name={"vehicleType"} onChange={handleType} img={`/${types}.png`} />
            ))}
          </div>
        </>
      }

      {next === 4 &&
        <>
          <label className="text-lg font-medium text-gray-700">
            Specific Model
          </label>
          <div className="flex items-center mt-2">
            {vehicleModel.map((models) => (
              <Radio key={models} label={models} value={models === model ? model : null} name={"vehicle model"} onChange={setModel} img={`/${models}.png`} />
            ))}
          </div>
        </>
      }

      {next === 5 &&
        <>
          <label className="text-lg font-medium text-gray-700">
            Select a Date Range
          </label>
          <div className="flex items-center mt-2">
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              dateFormat="dd/MM/yyyy"
              placeholderText="Start Date"
              minDate={new Date()}
              className="w-full px-4 py-2 text-lg text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <DatePicker
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              dateFormat="dd/MM/yyyy"
              placeholderText="End Date"
              className="w-full px-4 py-2 text-lg text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              minDate={startDate}
            />
          </div>
        </>
      }

      {next !== 1 && next !== 0 &&
        <button
          className="w-full px-4 py-2 text-lg font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          onClick={onPrevClick}
        >
          Previous
        </button>
      }
      {next !== 5 && next !== 0 &&
        <button className="w-full px-4 py-2 text-lg font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          onClick={onNextClick}
        >
          Next
        </button>
      }

      {next === 5 &&
        <button className="w-full px-4 py-2 text-lg font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          onClick={submit}
        >
          Submit
        </button>}
    </div>
  )
}

export default Home