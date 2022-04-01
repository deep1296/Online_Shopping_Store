
import { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import "./Homepageproducts.css"

export const HomepageProduct = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        getData();   
    },[])
    const getData =()=> {
        axios.get("https://project-unit5.herokuapp.com/homepageProducts").then(({data}) => {
            console.log("data", data)
            
            setProduct([...data]) 
            
    })

}

    return (
       
        <div id="sproduct">
            {product.map((el,i) =>
               <Link key={i} className="card" style={{textDecoration: 'none'}} to={`product/${el.id}`}>
               <div>
                   <img width="100%" className="cardimg" src={el.images[0]} alt="product img"/>
               </div>
               <div className="tbox">
                   <div className="title">
                       <span>{el.title}</span>
                   </div>
                   <div className="amount">
                       <div className="actualprice">&#x20b9;{el.discounted_price}</div>
                       <div className="discountprice">&#x20b9;{el.original_price}</div>
                       <div className="discount">{Math.floor(((el.original_price-el.discounted_price)/el.original_price)*100)}%off</div>
                   </div>
                   <div style={{color:'#999999'}}>
                       <i className='fas fa-badge-percent' style={{fontSize:'24px',color:'#5585F8',margin:'10px'}}>&#xf02c;</i>   &#x20b9;{el.original_price-el.discounted_price} discount on 1st order
                     
                        </div>
                   <div className="free">
                       Free Delivery
                   </div>
                   <div style={{display:"flex",justifyContent:'space-between'}}>
                       <div className="rating">
                       <span className="fa fa-star checked"></span>
                       {el.rating}
                       </div>
                       {/* <AddShoppingCartIcon style={{marginTop:'8px',color:'#5585F8'}}/> */}
                   </div>
               </div>
                </Link>
            )}
        </div>
    )
}