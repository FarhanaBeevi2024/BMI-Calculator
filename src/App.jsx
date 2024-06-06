import { Button } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import TextField from '@mui/material/TextField';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  //for conditional rendering
  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);
  const [isBmi, setIsBmi] = useState(false);

  const validate = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    console.log(!!value.match(/^[0-9]*$/));
    //!! is used to convert the return into boolena values (true or false)

    if (!!value.match(/^[0-9]*$/)) {
      if (name == "weight") {
        setWeight(value);
        setIsWeight(true);
      } else {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name == "weight") {
        setWeight(value);
        setIsWeight(false);
      } else {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const calculateBmi = () => {
    setIsBmi(false);
    if (weight === 0 || height === 0) {
      alert("Please enter your Weight and Height");
    } else {
      const heightMeter = height / 100;
      const bmi = weight / (heightMeter * heightMeter);
      setBmi(bmi.toFixed(2));
      if (bmi < 18.4) {
        setMessage("You are Underweight");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setMessage("You have Normal Weight");
        setIsBmi(true);
      } else if (bmi >= 25.5 && bmi <= 29.9) {
        setMessage("You are Overweight");
        setIsBmi(true);
      } else {
        setMessage("You have Obesity !");
        setIsBmi(true);
      }
    }
  };

  const handleReset = () => {
    setBmi(0);
    setHeight(0);
    setWeight(0);
    setMessage(" ");
    setIsHeight(false);
    setIsWeight(false);
    setIsBmi(false);
  };

  return (
    <div className="container">
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="p-3 bg-light rounded " style={{ width: "550px" }}>
        <div className="px-3">
          <h1 className=" text-center">BMI Calculator</h1>
          <p className="text-center">Check your Body Mass Index Easily</p>

          <form className="mt-5">
            <div className="mb-1">
            <TextField id="outlined-basic" label="Weight in Kg" variant="outlined" name="weight"
                placeholder="Weight in kg"
                onChange={(e) => validate(e)}
                value={weight || ""}
                className="form-control mt-3" />
            
              {!isWeight && <p className=" text-danger">*Invalid Input</p>}
            </div>

            <div className="mb-3">
            <TextField id="outlined-basic" label="Height in cm" variant="outlined" name="height"
                placeholder="Height in cm"
                onChange={(e) => validate(e)}
                value={height || ""}
                className="form-control mt-3" />
             
              {!isHeight && <p className="text-danger">*Invalid Input</p>}
            </div>

            <Button
              className="btn ms-5 fs-5"
              onClick={calculateBmi}
              disabled={isWeight && isHeight ? false : true}
              style={{ width: "150px", height: "45px" }}
              color="success"
            >
              Calculate
            </Button>

            <Button
              className="btn ms-5 fs-5"
              onClick={handleReset}
              style={{ width: "150px", height: "45px" }}
              variant="warning"
            >
              Reset
            </Button>

            <div className=" mt-3 d-flex justify-content-center align-items-center">
              <div className="mt-1 flex-column rounded shadow bg-secondary d-flex justify-content-center align-items-center p-4">
                <h5 className=" text-dark">Your Body Mass Index is</h5>
                <h2 className="fs-1 fw-bolder text-light"> {bmi} </h2>
                <h3 className=" text-warning">{message}</h3>

                <div className="img-container">
                  {isBmi &&
                    (bmi >= 18.5 && bmi <= 24.9 ? (
                      <p>
                        <img src={"./src/images/good.gif"} alt="" />
                      </p>
                    ) : (
                      <p>
                        <img src={"./src/images/bad.gif"} alt="" />
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="img-scale">
          <img src={"./src/images/bmiscale.png"} alt="" />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
