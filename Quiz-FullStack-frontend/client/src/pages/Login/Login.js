import LoginForm from "../../components/Login/LoginForm.js";
import LoginImage from "../../components/Login/LoginImage.js";
const Login = () => {
  return (
    <section className="Login-section  flex justify-center items-center md:w-[100vw] md:min-h-[100vh]">
      <div className="flex flex-col bg-white my-24 min-h-[50%] lg:h-[90%] lg:w-[85vw] xl:w-[80vw] 2xl:w-[70vw] xl:h-[85%] mx-auto  rounded-xl md:flex-row">
        <LoginImage />
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
