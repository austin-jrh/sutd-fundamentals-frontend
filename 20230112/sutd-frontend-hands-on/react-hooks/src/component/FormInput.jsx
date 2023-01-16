import React, { useState, useRef, useEffect } from "react";

const FormInput = () => {
  const renderCount = useRef(0);
  const lastNameChangeCount = useRef(0);

  // controlled input
  const [firstName, setFirstName] = useState("");

  // uncontrolled input
  const lastNameInput = useRef();

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    lastNameInput.current?.focus();
  }, []);

  const formHandler = () => {
    const data = {
      firstName,
      lastName: lastNameInput.current?.value,
    };
    // console.log(
    //   "🚀 ~ file: FormInput.jsx:25 ~ formHandler ~ lastName",
    //   lastName
    // );
    console.log("🚀 ~ file: FormInput.jsx:22 ~ formHandler ~ data", data);
  };

  return (
    <div>
      <h3>Handling Form Inputs</h3>

      <form>
        <label htmlFor="firstName">First Namme</label>
        <input
          type="text"
          id="firstName"
          placeholder="Your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Your Last Name"
          ref={lastNameInput}
          onChange={(e) => {
            console.log("Lastname changed");
            lastNameChangeCount.current += 1;
          }}
        />

        <button type="button" onClick={formHandler}>
          Submit
        </button>
      </form>

      <p>The number of Re-renders: {renderCount.current}</p>
    </div>
  );
};

export default FormInput;
