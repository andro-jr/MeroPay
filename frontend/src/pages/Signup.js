import FormSideDetails from "../components/Form/FormSideDetails";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { signUpUser } from "../api/auth";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";
import Container from "../components/Container";

const Signup = () => {
  const navigate = useNavigate();
  const { updateNotification } = useContext(NotificationContext);

  const { authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateUserInput = (userInput) => {
    const { username, email, password } = userInput;
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);
    }

    if (!username) return { ok: false, err: "Name is missing" };
    if (containsSpecialChars(username) || username.includes(" "))
      return {
        ok: false,
        err: "Username cannot contain space any special characters.",
      };
    if (!email.trim()) return { ok: false, err: "Email is missing" };
    if (!isValidEmail.test(email))
      return { ok: false, err: "Email is invalid" };
    if (!password.trim()) return { ok: false, err: "Password is missing" };
    if (password.length < 8)
      return { ok: false, err: "Password must be atleast 8 characters" };

    return { ok: true };
  };

  // console.log(inputData);

  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    // console.log(value, name);
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { ok, err } = validateUserInput(inputData);

    if (err) return updateNotification("error", err);

    const payload = {
      name: inputData.username.toLowerCase(),
      email: inputData.email,
      password: inputData.password,
    };

    const { error, user } = await signUpUser(payload);
    if (error) return updateNotification("error", error);

    setIsLoading(false);
    // console.log(user);

    navigate("/auth/OtpVerification", {
      state: {
        userId: user.id,
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <Container>
      <div className="container max-w-[1300px] m-auto login min-h-[70vh]">
        <FormSideDetails />

        <div className="flex flex-col items-center my-auto p-0 lg:p-5 2xl:p-20 pr-0  overflow-y-auto overflow-x-hidden">
          <h3 className="text-4xl text-blue-500 font-bold mt-0 md:mt-0">
            Sign Up
          </h3>
          <p className="my-8 mt-4 max-w-[350px] lg:max-w-[400px] text-center">
            Signup for Mero Pay. Your complete expense Tracker
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="lamaleon213"
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleChange}
            />
            <FormInput
              placeholder="abc@example.com"
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="************"
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
            />

            <Button
              title="Sign Up"
              styles="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />

            {/* <span>
              New to MeroPay?<Link to="/register">Create Account</Link>
            </span> */}
            <span className="text-sm text-gray-400 flex gap-2 mt-8 text-center items-center justify-center">
              <p>Already have an account?</p>
              <Link
                to="/auth/sign-in"
                className=" hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
