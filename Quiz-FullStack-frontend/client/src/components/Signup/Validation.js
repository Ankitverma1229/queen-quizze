function Validation(user) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;

  if (user.name === "") {
    error.name = "Name should not be empty";
  }
  if (user.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(user.email)) {
    error.email = "Email Didn't match";
  }
  if (user.password === "") {
    error.password = "password should not be empty";
  } else if (!password_pattern.test(user.password)) {
    error.password =
      "Weak Password (Should be atleast 8 characters with special symbols one upper case and one  number atleast)";
  }

  if (String(user.confirmPassword) !== String(user.password)) {
    error.confirmPassword = "Password not matched";
  }
  return error;
}

export default Validation;
