import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services"; // Assuming this makes an API call
import styles from "./Login.module.css";
import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2 } from "../data/imagesData";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!loginFormData.email) {
     newErrors.email = "Email is required.";
   } else if(!emailRegex.test(loginFormData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }

    // Password validation
    if (!loginFormData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await login(loginFormData); // Assuming this returns a response with status codes and error messages
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        alert("Logged in successfully");
        navigate("/home");
      } else if (res.status === 404) {
        setErrors((prev) => ({ ...prev, email: "User not found." }));
      } else if (res.status === 400) {
        setErrors((prev) => ({ ...prev, password: "Password is incorrect." }));
      } else {
        alert("An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.backButton}>
          <IoArrowBack />
        </p>
        <div className={`${styles.shapes} ${styles.triangle}`}>
          <img src={loginTriangle} alt="" />
        </div>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className={styles.labelContainer}>
            <label className={styles.emailLabel}>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={loginFormData.email}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
              }
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className={styles.labelContainer}>
            <label>Password</label>
            <input
              type="password"
              placeholder="•••••••••••"
              name="password"
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
              }
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {/* Buttons */}
          <div className={`${styles.btnContainer} `}>
            <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>
              Log in
            </button>
            <span>OR</span>
            <button className={`${styles.btn} ${styles.googleContainer}`}>
              <img src={googleIcon} alt="google" />
              Sign in with Google
            </button>
          </div>

          <p className={styles.signuptext}>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span> Register now</span>
            </Link>
          </p>
        </form>
        <div className={`${styles.shapes} ${styles.ellipse1}`}>
          <img src={loginEllipse1} alt="" />
        </div>
        <div className={`${styles.shapes} ${styles.ellipse2}`}>
          <img src={loginEllipse2} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../services";
// import styles from "./Login.module.css";
// import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2} from "../data/imagesData";
// import { IoArrowBack } from "react-icons/io5";

// const Login = () => {
//   const navigate = useNavigate();

//   const [loginFormData, setLoginFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if (token) {
//   //     navigate("/home");
//   //   }
//   // }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login(loginFormData);
//       if (res.status === 200) {
//         const data = await res.json();
//         console.log(data);
//         localStorage.setItem("token", data.token);
//         alert("Logged in successfully");
//         navigate("/home");
//       } else {
//         alert("Login error");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("An error occurred while logging in.");
//     }
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <p className={styles.backButton}><IoArrowBack /></p>
//         <div className={`${styles.shapes} ${styles.triangle}`}><img src={loginTriangle} alt="" /></div>
//         <form onSubmit={handleLogin}>
//           <div className={styles.labelContainer}>
//             <label className={styles.emailLabel}>Email</label>
//             <input
//               className=""
//               type="text"
//               placeholder="Enter your email"
//               name="email"
//               value={loginFormData.email}
//               onChange={(e) =>
//                 setLoginFormData({
//                   ...loginFormData,
//                   [e.target.name]: e.target.value,
//                 })
//               }
//             />
          
//           </div>

//           <div className={styles.labelContainer}>
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="•••••••••••"
//               name="password"
//               value={loginFormData.password}
//               onChange={(e) =>
//                 setLoginFormData({
//                   ...loginFormData,
//                   [e.target.name]: e.target.value,
//                 })
//               }
//             />
            
//           </div>
//           <div className={`${styles.btnContainer} ${styles.labelContainer}`}>
//           <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>Log in</button>
//           <span>OR</span>
//           <button className={`${styles.btn} ${styles.googleContainer}`}>
//             <img src={googleIcon} alt="google" />
//             Sign in with Google
//           </button>

//           </div>
//           <p className={styles.signuptext}>
//             Don't have an account?
//             <Link to="/signup" style={{ textDecoration: 'none' }}><span> Register now</span></Link>
//           </p>
//         </form>
//         <div className={`${styles.shapes} ${styles.ellipse1}`}><img src={loginEllipse1} alt="" /></div>
//         <div className={`${styles.shapes} ${styles.ellipse2}`}><img src={loginEllipse2} alt="" /></div>
//       </div>
//     </>
//   );
// };

// export default Login;
