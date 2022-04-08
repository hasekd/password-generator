import React, { useState } from "react";
import classes from "./PasswordGenerator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = "?$%!#^&*@";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("26");
  const [selectedLower, setSelectedLower] = useState(false);
  const [selectedUpper, setSelectedUpper] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState(false);
  const [selectedSpecial, setSelectedSpecials] = useState(false);
  const [copy, setCopy] = useState(false);

  const passwordLenghtInputHandler = (e) => {
    setPasswordLength(e.target.value);
  };

  const lowerCaseHandler = (e) => {
    setSelectedLower(e.target.checked);
  };

  const upperCaseHandler = (e) => {
    setSelectedUpper(e.target.checked);
  };

  const numberHandler = (e) => {
    setSelectedNumbers(e.target.checked);
  };

  const specialHandler = (e) => {
    setSelectedSpecials(e.target.checked);
  };

  const submitPassword = (e) => {
    e.preventDefault();

    if (
      !selectedLower &&
      !selectedUpper &&
      !selectedNumbers &&
      !selectedSpecial
    ) {
      alert("Atleast one checkbox must be selected.");
    } else {
      let charList = "";

      if (selectedLower) {
        charList += lowerLetters;
      }

      if (selectedUpper) {
        charList += upperLetters;
      }

      if (selectedNumbers) {
        charList += numbers;
      }

      if (selectedSpecial) {
        charList += specialChars;
      }

      let createdPassword = "";

      for (let i = 0; i < passwordLength; i++) {
        createdPassword += charList.charAt(
          Math.floor(Math.random() * charList.length)
        );
      }

      setPassword(createdPassword);
    }
  };

  const copyPassword = () => {
    if (password.length === 0) {
      alert("Pasword is not generated.");
    } else {
      navigator.clipboard.writeText(password);
      setCopy(true);

      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={submitPassword} className={classes.card}>
      <div className={classes.password}>
        {password === "" ? <h3>Password Generator</h3> : <h3>{password}</h3>}
        {copy ? (
          <FontAwesomeIcon className={classes.icon} icon={faCheck} />
        ) : (
          <FontAwesomeIcon
            className={classes.icon}
            onClick={copyPassword}
            icon={faClipboard}
          />
        )}
      </div>
      <div className={classes.option}>
        <label>Password Lenght</label>
        <input
          value={passwordLength}
          onChange={passwordLenghtInputHandler}
          min="6"
          max="26"
          type="number"
        />
      </div>
      <div className={classes.option}>
        <label>Add Lower Case Letters</label>
        <input onChange={lowerCaseHandler} type="checkbox" />
      </div>
      <div className={classes.option}>
        <label>Add Upper Case Letters</label>
        <input onChange={upperCaseHandler} type="checkbox" />
      </div>
      <div className={classes.option}>
        <label>Add Numbers</label>
        <input onChange={numberHandler} type="checkbox" />
      </div>
      <div className={classes.option}>
        <label>Add Special Characters</label>
        <input onChange={specialHandler} type="checkbox" />
      </div>
      <div className={classes.button}>
        <button type="submit">Generate Password</button>
      </div>
    </form>
  );
}

export default PasswordGenerator;
