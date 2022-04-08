import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.container}>
      <PasswordGenerator />
    </div>
  );
}

export default App;
