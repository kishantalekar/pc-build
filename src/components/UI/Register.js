import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import registerstyle from "./Register.module.css";
import { useContext, useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import axios from "axios";
import { DataContext } from "@/store/GlobalState";
import Cookies from "js-cookie";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const RegisterPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "doe",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      error.fname = "First Name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    // if (formErrors) return;
    // setIsSubmit(true);

    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
    setLoading(true);

    try {
      console.log(fname.value, password, email);
      const response = await axios.post("/api/register", {
        username: user.fname,
        password: user.password,
        email: user.email,
      });
      if (response.data.success) {
        // localStorage.setItem("token", response.data.token);
        console.log(response.data);
        dispatch({
          type: "AUTH",
          payload: {
            token: response.data.access_token,
            user: response.data.user,
            isAuthenticated: true,
          },
        });

        Cookies.set("refreshtoken", response.data.refresh_token, {
          path: "api/auth/accessToken",
          expires: 7,
        });
        // Example
        // router.push("/");
        localStorage.setItem("firstLogin", true);
      } else {
        console.error("register failed:", response.data.message);
        alert("register failed:", response.data.message);
      }
    } catch (error) {
      console.log("error in registering : ", error);
      alert("something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //     axios.post("http://localhost:9002/signup/", user).then((res) => {
  //       alert(res.data.message);
  //       navigate("/login", { replace: true });
  //     });
  //   }
  // }, [formErrors]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);
  return (
    <>
      <div className="">
        <h2
          className="text-5xl font-bold mb-10"
          style={{ textAlign: "center" }}
        >
          Create Account
        </h2>

        <>
          <div className={registerstyle.register}>
            <form>
              {/* <h1>Create your account</h1> */}
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="user Name"
                onChange={changeHandler}
                value={user.fname}
              />
              <p className={basestyle.error}>{formErrors.fname}</p>
              <input
                style={{ display: "none" }}
                // className="hidden"
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
                onChange={changeHandler}
                value={user.lname}
              />
              <p className={basestyle.error}>{formErrors.lname}</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
              />
              <p className={basestyle.error}>{formErrors.email}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={changeHandler}
                  value={user.password}
                />
                {showPassword ? (
                  <IoMdEyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    size={22}
                    style={{ position: "absolute", right: 50 }}
                  />
                ) : (
                  <IoMdEye
                    onClick={() => setShowPassword(!showPassword)}
                    size={22}
                    style={{ position: "absolute", right: 50 }}
                  />
                )}
              </div>

              <p className={basestyle.error}>{formErrors.password}</p>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                value={user.cpassword}
              />
              <p className={basestyle.error}>{formErrors.cpassword}</p>
              <button
                className={[basestyle.button_common]}
                style={{ backgroundColor: "#560cf7" }}
                onClick={signupHandler}
              >
                {loading ? <ClipLoader size={8} color="white" /> : "Register"}
              </button>
            </form>
            {/* <NavLink to="/login"></NavLink> */}
            <a href={"/login"} onClick={handleClick}>
              Already registered? Login
            </a>
          </div>
        </>

        {/* <div
        onClick={() =>
          signIn("google", {
            callbackUrl: "https://pc-cloud.vercel.app/",
          })
        }
        className="flex justify-center items-center gap-4 bg-slate-800 hover:bg-slate-900 p-3 rounded-lg text-white mb-4 cursor-pointer"
      >
        <FcGoogle className="text-3xl" />
        <h2>Sign in with Google</h2>
      </div>
      <div
        onClick={() =>
          signIn("github", {
            callbackUrl: "https://pc-cloud.vercel.app/",
          })
        }
        className="flex justify-center items-center gap-4 bg-slate-800 hover:bg-slate-900 p-3 rounded-lg text-white cursor-pointer"
      >
        <BsGithub className="text-3xl" />
        <h2>Sign in with Github</h2>
      </div> */}
      </div>
    </>
  );
};

export default RegisterPage;
