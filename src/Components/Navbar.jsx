import styles from "./navbar.module.css";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'; import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ReactComponent as CartLogoIcon } from "../SVG/CartLogoIcon.svg";
import HistoryIcon from '@mui/icons-material/History';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch } from "react-redux";
import { getQuery } from "../Redux/action";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavbarFloat from "./NavbarFloat";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import useDebouncer from "../Hooks/useDebouncer";
const NavBar = () => {
    const dispatch = useDispatch();
    const [params, setParms] = React.useState(null);
    const [results, setResults] = React.useState(null);
    const [view, setView] = React.useState(false);
    const [cartTotal, setCartTotal] = React.useState(0);
    const { cart } = useSelector(state => state.cart, shallowEqual);
    const history = useHistory();
    const getNumber = localStorage.getItem("phone")
    const GetItem = () => {
        const data = [];
        for (var i = localStorage.length - 2; i >= 2; i--) {
            let res = JSON.parse(localStorage.getItem(i));
            console.log(res)
            res && res.length > 1 && data.push(res);
        }
        return (
            <div>
                {data.map((item) => (
                    <div className={styles.res}>
                        <HistoryIcon />
                        <div className={styles.rest}>{item}</div>
                    </div>
                ))}
            </div>
        )
    }

    const search = () => {
        const config = {
            method: 'get',
            url: `https://fake-rjson-server-pro.herokuapp.com/products?q=${params}&_limit=5&_page=1`
        }
        axios(config)
        .then((res) => {
            setResults(res.data)
            res.data.map((el, index) => {
                localStorage.setItem(index, JSON.stringify(el.title))
            })
        });
    }
    const debounced = useDebouncer( search ,400);

    React.useEffect(() => {
        debounced();
        let res = 0;
        cart.forEach((curr) => res += curr.qty);
        setCartTotal(res);
    }, [params, cart]);
    const getQ = (name) => {
        dispatch(getQuery(name));
        setView(false);
    }

    const SignUpButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        width: "80%",
        padding: '12px',
        margin: "auto",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#f43397',
        borderColor: '#f43397',
        '&:hover': {
            backgroundColor: '#f43397',
            borderColor: '#f43397',
            boxShadow: 'none',
        },
    });
    const logout = () => {
        localStorage.clear("phone");
        window.location.replace("/")
    }
    return (
        <>
            <div className={styles.Main_Header}>
                <div>
                    <div className={styles.upper}>
                        <div className={styles.header_conatainer}>
                            <Link to='/'>
                                <div className={styles.header_logo}>
                                    <CartLogoIcon />
                                </div>
                            </Link>
                            <div className={styles.Search_Input}>
                                <div className={styles.icon}>
                                    <SearchIcon />
                                </div>
                                <input onClick={() => { setView(!view); setResults(null) }} onChange={(e) => { setParms(e.target.value) }} className={styles.search_input} type="text" placeholder="Try Saree, Kurti or Search by Product Code" />
                            </div>
                            <div className={styles.cards_container}>
                                <div className={`${styles.downloadCard} ${styles.hideOnSm}`}>
                                    <div className={styles.cards}>
                                        <PhoneAndroidIcon className={styles.android} />
                                        <p>Download App</p>
                                        <div className={styles.dropdownContent}>
                                            <h5>Downlaod From</h5>
                                            <a href="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow" target="_blank">
                                                <img className={styles.appBtn} src="https://images.meesho.com/images/pow/homepage/google-play-button.jpg" alt="google play btn" />
                                            </a>
                                            <a href="https://apps.apple.com/us/app/meesho/id1457958492" target="_blank">
                                                <img className={styles.appBtn} src="https://images.meesho.com/images/pow/homepage/appstore-button.jpg" alt="app store btn" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.hideOnSm} style={{ width: "2px", height: "40px", backgroundColor: "lightgray" }}></div>
                                <div className={styles.hideOnSm} onClick={() => history.push("/seller")}>Become A Supplier</div>
                                <div className={styles.hideOnSm} style={{ width: "2px", height: "40px", backgroundColor: "lightgray" }}></div>
                                <div className={styles.profileCard}>
                                    <div className={styles.profile}>
                                        <PermIdentityIcon />
                                        <p>Profile</p>
                                        <div className={styles.profileContent}>
                                            {getNumber ? (
                                                <div style={{ cursor: "default", }}>
                                                    <div style={{ cursor: "text", gap: "0.5rem", display: "flex", justifyContent: "centrer", alignItems: "center" }}>
                                                        <AccountCircleRoundedIcon style={{ cursor: "default", }} fontSize="large" />
                                                        <div>
                                                            <p style={{ fontSize: "18px", marginBlockStart: "0.5em", marginBlockEnd: "0.2em", fontWeight: "bold" }}>Hello User</p>
                                                            <p style={{ fontSize: "16px", marginBlockEnd: "0.5em" }}>+91{getNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.dividerLines}></div>
                                                    <h3 style={{ cursor: "pointer", margin: 0, justifyContent: "left", alignItems: "center" }}><ShoppingBagIcon fontSize="medium" />My Orders</h3>
                                                    <div style={{ cursor: "pointer", margin: "auto", width: "100%" }}>
                                                        <div className={styles.dividerLines}></div>
                                                        <h3 onClick={logout} style={{ cursor: "pointer", margin: 0, paddingBottom: 15, justifyContent: "left", alignItems: "center" }}><LogoutRoundedIcon />Logout</h3>
                                                    </div>
                                                </div>
                                            ) :
                                                (
                                                    <>
                                                        <p style={{ fontSize: "18px", marginBlockStart: "0.5em", marginBlockEnd: "0.2em", fontWeight: "bold" }}>Hello User</p>
                                                        <p style={{ fontSize: "12px", marginBlockEnd: "0.5em" }}>To access your Meesho account</p>
                                                        <Link style={{ textDecoration: "none" }} to="/signup">
                                                            <SignUpButton variant="contained">SIGN UP</SignUpButton>
                                                        </Link>
                                                        <div className={styles.dividerLines}></div>
                                                        <h4 style={{ alignItems: "center" }}><ShoppingBagIcon fontSize="medium" />My Orders</h4>

                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className={styles.cart} onClick={() => history.push("/cart")}>
                                    <ShoppingCartIcon />
                                    <p>Cart</p>
                                    <div className={styles.cartTotal}>{cartTotal}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dividerLines}></div>
                <div className={styles.links}>
                    <Link onClick={() => getQ("Mens Top Were")} to="/cat">Mens Wear</Link>
                    <NavbarFloat key="Mens Top " onClick={() => { getQ("Mens Top Were"); history.push("/cat") }} textArr={[["All Men", "View All"], ["Top Wear", "All Top Wear", "Tshirts", "Shirts"], ["Bottom Wear", "Track Pants", "Jeans", "Trousers"], ["Men Accessories", "All Men Accessories", "Watches", "Belts", "Wallets", "Jewellery", "Sunglasses", "Bags"], ["Men Footwear", "Sports Shoes", "Casual Shoes", "Formal Shoes", "Sandals"], ["Ethnic Wear", "Men Kurtas", "Ethnic Jackets", "Inner & Sleep Wear", "All Inner & Sleep Wear"]]} />
                    <Link onClick={() => getQ("Dresses")} to="/cat">Womens Wear</Link>
                    <NavbarFloat key="women" onClick={() => { getQ("Dresses"); history.push("/cat") }} textArr={[["All Women", "View All"], ["All Suits & Dress Material", "Cotton Suits", "Embroidered Suits", "Chanderi Suits"], ["Other Ethnic", "Blouses", "Dupattas", "Lehanga", "Gown", "Ethnic Bottomwear"]]} />
                    <Link onClick={() => getQ("Sarees")} to="/cat">Sarees</Link>
                    <NavbarFloat key="Sarees" onClick={() => { getQ("Sarees"); history.push("/cat") }} textArr={[["All Sarees", "View All"], ["Silk Sarees", "Cotton Silk Sarees", "Cotton Sarees", "Georgette Sarees", "Chiffon Sarees", "Satin Sarees", "Embroidered Sarees"]]} />
                    <Link onClick={() => getQ("Jewellery")} to="/cat">Jewellery</Link>
                    <NavbarFloat key="Jewellery" onClick={() => { getQ("Jewellery"); history.push("/cat") }} textArr={[["All Jewellery", "View All"], ["Jewellery", "Jewellery Set", "Mangalsutras", "Earrings", "Studs", "Bangles", "Necklaces", "Rings", "Anklets"], ["Women Accessory", "Bags", "Watches", "Hair Accessories", "Sunglasses", "Socks"]]} />
                    <Link onClick={() => getQ("Dresses")} to="/cat">Dresses</Link>
                    <NavbarFloat key="Dresses" onClick={() => { getQ("Dresses"); history.push("/cat") }} textArr={[["All Dresses", "View All"], ["Suits & Dress Material", "All Suits & Dress Material", "Cotton Suits", "Embroidered Suits", "Chanderi Suits"], ["Other Ethnic", "Blouses", "Dupattas", "Lehanga", "Gown", "Ethnic Bottomwear"]]} />
                    <Link onClick={() => getQ("Beauty and health")} to="/cat">Beauty Products</Link>
                    <NavbarFloat key="Beauty n" onClick={() => { getQ("Beauty and health"); history.push("/cat") }} textArr={[["All Beauty Products", "View All"], ["Make up", "Face", "Eyes", "Lips", "Nails"], ["Wellness", "Sanitizers", "Oral Care", "Feminine Hygiene", "Skincare", "Deodorants"]]} />
                    <Link onClick={() => getQ("Beauty and health")} to="/cat">Health Products</Link>
                    <NavbarFloat key="Beauty an" onClick={() => { getQ("Beauty and health"); history.push("/cat") }} textArr={[["All Beauty Products", "View All"], ["Make up", "Face", "Eyes", "Lips", "Nails"], ["Wellness", "Sanitizers", "Oral Care", "Feminine Hygiene", "Skincare", "Deodorants"]]} />
                    <Link onClick={() => getQ("Bags and Footwear")} to="/cat">Bags and Footwear</Link>
                    <NavbarFloat key="Bags and" onClick={() => { getQ("Bags and Footwear"); history.push("/cat") }} textArr={[["Women Bags", "All Women Bags", "Handbags", "Clutches", "Slingbags"], ["Men Bags", "All Men Bags", "Men Wallets"]]} />
                    <Link onClick={() => getQ("Home and Kitchen")} to="/cat">Home</Link>
                    <NavbarFloat key="Home and" onClick={() => { getQ("Home and Kitchen"); history.push("/cat") }} textArr={[["Home Furnishing", "Bedsheets", "Doormats", "Curtains & Sheers", "Cushions & Cushion Covers", "Mattress Protectors"], ["Home Decor", "All Home Decor", "Stickers", "Clocks", "Showpieces", "Kitchen & Dining", "Kitchen Storage", "Cookware & Bakeware"]]} />
                    <Link onClick={() => getQ("Home and Kitchen")} to="/cat">Kitchen</Link>
                    <NavbarFloat key="Home" onClick={() => { getQ("Home and Kitchen"); history.push("/cat") }} textArr={[["Home Furnishing", "Bedsheets", "Doormats", "Curtains & Sheers", "Cushions & Cushion Covers", "Mattress Protectors"], ["Home Decor", "All Home Decor", "Stickers", "Clocks", "Showpieces", "Kitchen & Dining", "Kitchen Storage", "Cookware & Bakeware"]]} />
                </div>
            </div>
            {view ? (
                <div className={styles.url}>
                    {results != null ? (results.map((item) => (
                        <div className={styles.res}><SearchIcon />
                            <div className={styles.rest} onClick={() => { history.push(`/product/${item.id}`); setView(false) }}>{item.title}</div>
                        </div>
                    ))) : (
                        <div>
                            <div className={styles.res} style={{ padding: '1rem', fontSize: '18px', fontWeight: 'bold', color: 'rgb(102, 102, 102)' }}>
                                recent search</div>
                            <GetItem />
                        </div>)}
                </div>) : (<div>

                </div>)}
        </>
    )
}

export default NavBar;




// import "./Footer.css"

// export const Footer = () => {
//     return(
//         <>
//         <div className="container2">
//             <div className="left">
//                <div className="head">
//                 Shop Non-Stop on Meesho
//                </div>
//                <div className="pa">
//                Trusted by more than 1 Crore Indians
//                </div>
//                <div className="pa2">
//                Cash on Delivery | Free Delivery        
//                </div>
//                <div className="pic">
//                    <div className="and">
//                        <img src="https://imgs.search.brave.com/FO1miuVAAEKA09mnS8E3-lmlkEdZeJHnT5NGpis-7yk/rs:fit:1337:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC45/OEF4QWtSNWw1amV3/ZHM1Q1FFSkJBSGFD/byZwaWQ9QXBp" 
//                        alt="android" 
//                        href="https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow&pow_click_page_type=HP&pow_distinct_id=17fd1a465d2265-0e3f6981c7764c-9771a35-144000-17fd1a465d328a"
//                        />
//                    </div>
//                    <div className="app">
//                        <img src="https://imgs.search.brave.com/ItUzd68Ie9NIxFIiMw6jot0L8sb2cXvqr9EgoY41Ay4/rs:fit:948:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5u/TFlpMHM0R0ZUeDVj/cDlmektNRTlRSGFE/dCZwaWQ9QXBp" alt="apple store" />
//                    </div>
//                </div>
//                 {/* <h3>Trusted by more than 1 Crore IndiansCash on Delivery | Free Delivery</h3> */}
//             </div>
//             <div className="right">
//                 <div className="one">
//                     <div className="on">Careers</div>
//                     <div className="ont">Become a supplier</div>
//                     <div className="ont">Our Influencer Program</div>
//                 </div>
//                 <div className="one">
//                     <div className="on">Legal and Policies</div>
//                     <div className="ont">Meesho Tech Bog</div>
//                     <div className="ont">Notices and Returns</div>   
//                 </div>

//                 <div className="social">
//                     <div className="head">
//                         Reach out to us
//                     </div>
//                     <div className="logo">
//                         <div className="fb">
                        
//                         </div>
//                         <div className="insta"></div>
//                         <div className="utube"></div>
//                         <div className="link"></div>
//                         <div className="twit"></div>

//                     </div>
//                 </div>
//                 <div className="last">
//                     <div className="up">Contact us</div>
//                     <div className="cont">
                        
//                     Fashnear Technologies Private Limited,
//                     CIN: U74900KA2015PTC082263
//                     06-105-B, 06-102, (138 Wu) Vaishnavi Signature, No. 78/9, Outer Ring Road, Bellandur, Varthur Hobli, Bengaluru-560103, Karnataka, India
//                     E-mail address: query@meesho.com
//                     © 2015-2022 Meesho.com
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }