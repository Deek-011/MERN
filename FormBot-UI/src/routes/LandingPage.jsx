import React from "react";
import {logo, bannerImage, lpEllipse, lpTriangle } from "../data/imagesData";
import styles from "./LandingPage.module.css";
import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
      <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navbarLogo}>
            <img
              src={logo}
              alt="Logo"
              className={styles.navbarLogoImg}
            />
            <span className={styles.navbarLogoText}>FormBot</span>
          </div>
          <div className={styles.navbarActions}>
            <Link to="/login"><button className={`${styles.btn} ${styles.btnSignin}`} >Sign In</button></Link>
            <Link to="/"><button className={`${styles.btn} ${styles.btnCreate}`}>Create a FormBot</button></Link>          
          </div>
        </nav>

        <main>
          <img src={lpTriangle} alt="triangle image" className={`${styles.shapes} ${styles.triangle}`}/>
              <div className={styles.textContainer}>
      <h1 className={styles.gradientText}>Build advanced chatbots</h1>
      <h2 className={styles.gradientText}>visually</h2>  <p className={styles.description}>
        Typebot gives you powerful blocks to create unique chat experiences. Embed them
        anywhere on your web/mobile apps and start collecting results like magic.     </p>
      <button className={`${styles.btn} ${styles.btnCreate}`}>
        Create a FormBot for free
      </button>
    </div>
          <img src={lpEllipse} alt="ellipse image" className={`${styles.shapes} ${styles.ellipse}`}/>
        </main>

        {/* banner */}
      <div className={styles.bannerContainer}>
        <img src={bannerImage} alt="bannerImage" className={styles.bannerImage}/>
      </div>
        
        {/* Footer */}
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
          <div className={styles.footerRow}>
            <span><img src={logo} alt="logo" className={styles.footerlogo}/>FormBot</span>
            <p>Made with ❤️ by</p>
            <a>@cuvette</a>
          </div>
          <div className={styles.footerRow}>
            <span>Product</span>
            <a href="">Status<LuExternalLink /></a>
            <a href="">Documentation<LuExternalLink /></a>
            <a href="">Roadmap<LuExternalLink /></a>
            <a href="">Pricing<LuExternalLink /></a>
          </div>
          <div className={styles.footerRow}>
            <span>Community</span>
            <a href="">Discord<LuExternalLink /></a>
            <a href="">GitHub repository<LuExternalLink /></a>
            <a href="">Twitter<LuExternalLink /></a>
            <a href="">LinkedIn<LuExternalLink /></a>
            <a href="">OSS Friends<LuExternalLink /></a>
          </div>
          <div className={styles.footerRow}>
            <span>Company</span>
            <a href="">About<LuExternalLink /></a>
            <a href="">Contact<LuExternalLink /></a>
            <a href="">Terms of Service<LuExternalLink /></a>
            <a href="">Privacy Policy<LuExternalLink /></a>
          </div>
        </div>
        </div>

        </div>
      </>
    );

  
};

export default LandingPage;
