import Gun from "gun";
import SEA from "gun/sea";
import { useState } from "react";
import "./App.css";

const gun = Gun({
  peers: ["http://localhost:3000/gun"],
});
const test = SEA;

const pair = await test.pair();
const enc = await test.encrypt("hello", pair);
console.log(pair);
console.log(enc);

const user = gun.user();

function App() {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createAccount(alias, password);
        }}
      >
        <h3>Name</h3>
        <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <br />
        <h3>Password</h3>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Create Account</button>
      </form>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(alias, password);
        }}
      >
        <h3>Alias</h3>
        <input type="text" />
        <br />
        <h3>Password</h3>
        <input type="text" />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

function createAccount(alias: string, password: string) {
  user.create(alias, password, (ack) => {
    console.log(ack);
  });
}

function login(alias: string, password: string) {
  user.auth(alias, password, (ack) => {
    console.log(ack);
  });
}

export default App;
