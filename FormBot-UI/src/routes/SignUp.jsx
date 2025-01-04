import React, { useState } from "react";
import { signup } from "../services";
import styles from "./SignUp.module.css";
import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2 } from "../data/imagesData";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if(!formData.username){
      newErrors.username = 'Username is required';
    }

    if(!formData.email.trim()){
      newErrors.email = 'Email is required';
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = "Email is envalid";
    }
 // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signup(formData);
      if (res.status === 200) {
        alert("Registered successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      else {
        console.log(res);
        alert("User already existed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An unexpected error occurred.");
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
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className={styles.labelContainer}>
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.username}
              name="username"
              placeholder="Enter a username"
            />
            {errors.username && <p className={styles.errorText}>{errors.username}</p>}
          </div>

          {/* Email */}
          <div className={styles.labelContainer}>
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.email}
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.labelContainer}>
            <label>Password</label>
            <input
              type="password"
              placeholder="•••••••••••"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={styles.labelContainer}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="•••••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          {/* Buttons */}
          <div className={`${styles.btnContainer}`}>
            <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>
              Sign Up
            </button>
            <span>OR</span>
            <button className={`${styles.btn} ${styles.googleContainer}`}>
              <img src={googleIcon} alt="google" />
              Sign Up with Google
            </button>
          </div>

          <p className={styles.signuptext}>
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span> Login</span>
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

export default SignUp;


// import React, { useState } from "react";
// import { signup } from "../services";
// import styles from "./SignUp.module.css";
// import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2} from "../data/imagesData";
// import { IoArrowBack } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword : ""
//   });


//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const res = await signup(formData);
//     if (res.status === 200) {
//       alert("Registered successfully");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } else {
//       console.log(res);
//       alert("error");
//     }
//   };

//   return (
//     <>
//      <div className={styles.container}>
//         <p className={styles.backButton}><IoArrowBack /></p>
//         <div className={`${styles.shapes} ${styles.triangle}`}><img src={loginTriangle} alt="" /></div>
//       <form onSubmit={handleRegister}>
//          <div className={styles.labelContainer}>
//                     <label>Username</label>
//         <input
//           type="text"
//           onChange={(e) =>
//             setFormData({ ...formData, [e.target.name]: e.target.value })}
//           value={formData.username}
//           name="username"
//           placeholder="enter name"
//         />
//         </div>
//          <div className={styles.labelContainer}>
//                     <label>Email</label>
//         <input
//           type="text"
//           onChange={(e) =>
//             setFormData({ ...formData, [e.target.name]: e.target.value })
//           }
//           value={formData.email}
//           name="email"
//           placeholder="enter email"
//         />
//         </div>
//         <div className={styles.labelContainer}>
//                     <label>Password</label>
//                     <input
//                       type="password"
//                       placeholder="•••••••••••"
//                       name="password"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({
//                           ...FormData,
//                           [e.target.name]: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                        <div className={styles.labelContainer}>
//                     <label>Confirm Password</label>
//                     <input
//                       type="password"
//                       placeholder="•••••••••••"
//                       name="password"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({
//                           ...FormData,
//                           [e.target.name]: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 <div className={`${styles.btnContainer} ${styles.labelContainer}`}>
//                           <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>Sign Up</button>
//                           <span>OR</span>
//                           <button className={`${styles.btn} ${styles.googleContainer}`}>
//                             <img src={googleIcon} alt="google" />
//                             Sign Up with Google
//                           </button>
                
//                           </div>
//                           <p className={styles.signuptext}>
//                                       Already have an account?
//                                   <Link to="/login" style={{ textDecoration: 'none' }}><span> Login</span></Link> 
//                                     </p>
//       </form>
//       <div className={`${styles.shapes} ${styles.ellipse1}`}><img src={loginEllipse1} alt="" /></div>
//       <div className={`${styles.shapes} ${styles.ellipse2}`}><img src={loginEllipse2} alt="" /></div>
//       </div>
//     </>
//   );
// };

// export default SignUp;