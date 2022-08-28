import React from "react";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="container" id="signupContainer">
      <form>
        <div class="mb-3">
          <h1>Signup Form</h1>
          <div class="mb-3">
            <label for="exampleInputName1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control boxStyle"
              id="exampleInputName1"
              required
            />
          </div>
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control boxStyle"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control boxStyle"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
