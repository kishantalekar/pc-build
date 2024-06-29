import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import basestyle from "./../components/Base.module.css";
import loginstyle from "./../components/UI/Login.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "@/store/GlobalState";
import Cookies from "js-cookie";
import { ClipLoader, PacmanLoader, ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
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
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setLoading(true);
    try {
      if (
        user.email == "admin123@gmail.com" &&
        user.password == "pcbuildadmin"
      ) {
        router.push("/admin");
      }
    } catch (error) {
      // alert("Invalid credentials");
      toast.error("Invalid username or password");
      console.log("Error in logging due to : ", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //     axios.post("http://localhost:9002/login", user).then((res) => {
  //       alert(res.data.message);
  //       setUserState(res.data.user);
  //       // navigate("/", { replace: true });
  //     });
  //   }
  // }, [formErrors]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/register");
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <>
      {/* {loading ? (
        <div style={{ display: "grid", placeContent: "center" }}>
          <p>Loading...</p>
        </div>
      ) : ( */}

      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          //   minHeight: "100vh",
          //   backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/406/203/689/pc-build-water-cooling-ram-120mm-fan-hd-wallpaper-preview.jpg)`,
        }}
      >
        <h2
          className="text-5xl font-bold mb-10"
          style={{ textAlign: "center", marginTop: 200 }}
        >
          Admin Login
        </h2>

        <div className={loginstyle.login}>
          <form>
            {/* <h1 style={{ textAlign: "center" }}>Login</h1> */}
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

            <button
              className={basestyle.button_common}
              onClick={loginHandler}
              style={{ backgroundColor: "#560cf7" }}
            >
              {loading ? <ClipLoader size={8} color="white" /> : "Login"}
            </button>
          </form>
          {/* <NavLink to="/signup">Not yet registered? Register Now</NavLink> */}
          {/* <a onClick={handleClick}>don't have an account? register</a> */}
        </div>

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
      {/* )} */}
    </>
  );
};

export default LoginPage;
