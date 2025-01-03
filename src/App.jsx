import React from "react";
import Grid from "./components/Grid";

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Falling Rain Simulation</h1>
      <Grid rows={15} cols={20} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "20px",
  },
  title: {
    fontSize: "1.5rem",
    color: "#FFFFFF",
    marginBottom: "20px",
  },
};

export default App;
