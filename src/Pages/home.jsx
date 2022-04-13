import React from "react";
import styles from "./home.module.css";
import { useDispatch } from "react-redux";
import {getQuery } from "../Redux/action";
import { Link } from 'react-router-dom';
import { HomepageProduct } from "./Homepageproducts/Homepageproducts";

const Home = ()=>{
    const dispatch = useDispatch();
    const getSares = ()=>{
        dispatch(getQuery("Sarees"))
    }
    const getDreses = ()=>{
        dispatch(getQuery("Dresses"))
    }
    const getMenswares = ()=>{
        dispatch(getQuery("Mens Top Wear"))
    }
    const homeCare = ()=>{
        dispatch(getQuery("Home and Kitchen"))
    }
    return (
        <div>
            <div className={styles.banner}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        Lowest Prices
                        <div>Best Quality Shopping</div>
                    </div>
                    <div className={styles.title1}>
                        50 lakh+ Styles | 650+ categories
                    </div>
                    <div className={styles.button}>
                        <img width="8%" height="50%" src="https://www.freepnglogos.com/uploads/google-play-png-logo/google-severs-music-studio-png-logo-21.png"/>
                        <span>Download the Meesho App</span>
                    </div>
                </div>
                <div className={styles.container1}>
                </div>
            </div>
            <div className={styles.line}>
                <div className={styles.hr}></div>
                <div className={styles.hrtitle}>Top Categories to choose from</div>
                <div className={styles.hr}></div>
            </div>
            <div className={styles.banner1}>
                <div className={styles.img}>
                    <Link to='/cat'><img onClick={getSares} src="https://images.meesho.com/images/marketing/1631611172021.png"/></Link>
                </div>
                <div className={styles.temp}>
                    <Link to='/cat'><img onClick={getDreses} src="https://images.meesho.com/images/marketing/1631610854491.png"/></Link>
                </div>
                <div className={styles.temp}>
                    <Link to='/cat'><img onClick={getMenswares} src="https://images.meesho.com/images/marketing/1631611208025.png"/></Link>
                </div>
            </div>
            <Link style={{textDecoration:'none'}} to="/cat"><div onClick={homeCare} className={styles.banner2}>
                <div className={styles.tbox}>
                    <span>Homecare</span>
                    <button>VIEW ALL</button>
                </div>
                <div className={styles.cardBox}>
                    <div className={styles.card}>
                        <img src="https://images.meesho.com/images/marketing/1629883981751.png"/>
                    </div>
                    <button>Bedsheets</button>
                </div>    
                <div className={styles.cardBox}>
                    <div className={styles.card}>
                        <img src="https://images.meesho.com/images/marketing/1629884011960.png"/>
                    </div>    
                    <button>Kitchenware</button>
                </div>
                <div className={styles.cardBox}>
                    <div className={styles.card}>
                        <img src="https://images.meesho.com/images/marketing/1629883997863.png"/>
                    </div>
                    <button>Carpets</button>
                </div>   
            </div></Link>
            <div className={styles.banner3}>
                <div className={styles.banner3container}>
                    <h4>Become a Reseller and</h4>
                    <h1>Start your Online Business</h1>
                    <h1>with Zero Investment</h1>
                    <div className={styles.banner3ibox}>
                        <img src="https://images.meesho.com/images/pow/playstore-icon.png"/>
                        <img src="https://images.meesho.com/images/pow/appstore-icon.png"/>
                    </div>
                </div>
            </div>
            <div className={styles.banner4}>
            </div>
            <h1 className={styles.Sproducts}>Products For You</h1>
            <HomepageProduct />
            <div className={styles.foot}>
            <div className={styles.banner5}>
                <div className={styles.banner5tbox}>
                    <h1 className={styles.banner5h1}>Shop Non-Stop on Meesho</h1>
                    <p style={{textAlign: 'left',marginTop:10}}>Trusted by more than 1 Crore Indians<br/>
                        Cash on Delivery | Free Delivery
                        </p>
                        
                        <div className={styles.logos}>

                        <img src="https://meesho.com/_next/static/images/google-play-button-1f2aa747a3eefa161840b04e057b31ac.png" alt="playstore" />
                        <img src="https://meesho.com/_next/static/images/appstore-button-4b171cf04fe0557718dfd2cbf309c61d.png" alt="apple"/>
                        </div>
                    
                </div>
                <div className={styles.career}>
                        <p>Careers</p>
                        
                            <p>Become a supplier</p>
                            <p>Our Influencer Program</p>
                            <p>Hall of Fame</p>
                      
                   
                </div>
                <div className={styles.career}>
                    <p>Legal and Policies</p>
                        <p>Meesho Tech Blog</p>
                        <p>Notices and Return</p>
                </div>
               
                    <div className={styles.career}>
                        
                        <h4>Reach out to us</h4>
                        <div className={styles.social}>
                         <a href="https://www.facebook.com/meeshosupply"><img src="https://meesho.com/assets/facebook.png" alt="fb"/></a>  
                         <a href="https://www.instagram.com/meeshoapp/"><img src="https://meesho.com/assets/instagram.png" alt="instagram"/></a>   
                         <a href="https://www.youtube.com/channel/UCaGHIRKYUYlaI_ZAt2hxpjw"><img src="https://meesho.com/assets/youtube.png" alt="youtube"/></a>
                            <a href="https://www.linkedin.com/company/meesho/"><img src="https://meesho.com/assets/linkedin.png" alt="linkedin" /></a>
                            <a href="https://twitter.com/Meesho_Official/"><img src="https://meesho.com/assets/twitter.png" alt="twitter"/></a>
                        </div>
                   
                    </div>

                    <div className={styles.career}>
                    <h4>Contact Us</h4>
                    <h6>Fashnear Technologies Private<br/>Limited,<br/>
                            CIN: U74900KA2015PTC082263<br/>
                            06-105-B, 06-102, (138 Wu)<br/>Vaishnavi Signature, No. 78/9,<br/>Outer Ring Road, Bellandur,<br/>Varthur Hobli, Bengaluru-560103,<br/>Karnataka, India<br/>
                            E-mail address:<br/>query@meesho.com<br/>
                            © 2015-2022 Meesho.com</h6>
                        
                </div>
                    
                </div>

                <div className={styles.footer}>
                <div style={{marginLeft:15}}>More About Meesho download the app now</div>
            </div>

            </div>
            

            {/* <div className={styles.footer}>
                <div className={styles.innerfoot}></div>
            </div> */}

        </div>
    )
}
export default Home;
