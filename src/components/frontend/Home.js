import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Home() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getCategory`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    // console.log(res.data.category);
                    setCategory(res.data.category);
                    setLoading(false);
                }
            }
        });
         axios.get(`/api/allproduct`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMountered = false;
        }
    }, []);
    
        var showCategoryList = '';
        showCategoryList =category.map( (item, idx) => {
            return (
            <div class="col-md-13" key={idx} >
            <div class="card">
                <ul class="menu-category">
                 <li>
                 <Link to={`collections/${item.slug}`}>
                   <center>{item.name}</center>   
                    </Link>
                 </li>
                </ul>
            </div>
            </div> 
             )
        });
        var display_Productdata = "";
        display_Productdata = viewProduct.map( (item) => {
            return (
                <div class="col-md-3">
                <div href="#" class="card card-product-grid">
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <img src={`http://localhost:8000/${item.image}`} alt={item.name} /> 
                </Link>
                    <figcaption class="info-wrap">
                    <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{ item.name }</h5>
                                </Link>
                        <div class="price mt-1">{item.selling_price} VNĐ</div> 
                    </figcaption>
                </div>
            </div> 
            )
        });
       
    
    return  (
        <div className="App">  
         <section class="section-main bg padding-y">
            <div class="container">
            <div class="row">
            <div class="col-md-3" >
            <div class="card">
                 {showCategoryList}
            </div>
            </div> 
                <div class="col-md-9">
                    <article class="banner-wrap">
                        <img src="assets/images/2.jpg" class="w-100 rounded" />
                    </article>
                </div> 
            </div> 
            </div> 
            </section>
        <section class="section-name padding-y-sm">
        <div class="container">
        <header class="section-heading">
            <a href="#" class="btn btn-outline-primary float-right">See all</a>
            <h3 class="section-title">Popular products</h3>
        </header>
            
        <div class="row">
            {display_Productdata}
          
        </div>
        </div>
        </section>
      
        <section class="section-name padding-y bg">
        <div class="container">
        <div class="row">
        <div class="col-md-6">
            <h3>Download app demo text</h3>
            <p>Get an amazing app  to make Your life easy</p>
        </div>
        <div class="col-md-6 text-md-right">
            <a href="#"><img src="assets/images/misc/appstore.png" height="40" /></a>
            <a href="#"><img src="assets/images/misc/appstore.png" height="40" /></a>
        </div>
        </div> 
        </div>
        </section>
        
        
        <footer class="section-footer border-top bg">
        <div class="container">
          <section class="footer-top  padding-y">
            <div class="row">
              <aside class="col-md col-6">
                <h6 class="title">Brands</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">Adidas</a></li>
                  <li> <a href="#">Puma</a></li>
                  <li> <a href="#">Reebok</a></li>
                  <li> <a href="#">Nike</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Company</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">About us</a></li>
                  <li> <a href="#">Career</a></li>
                  <li> <a href="#">Find a store</a></li>
                  <li> <a href="#">Rules and terms</a></li>
                  <li> <a href="#">Sitemap</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Help</h6>
                <ul class="list-unstyled">
                  <li> <a href="#">Contact us</a></li>
                  <li> <a href="#">Money refund</a></li>
                  <li> <a href="#">Order status</a></li>
                  <li> <a href="#">Shipping info</a></li>
                  <li> <a href="#">Open dispute</a></li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h6 class="title">Account</h6>
                <ul class="list-unstyled">
                  <li> <a href="#"> User Login </a></li>
                  <li> <a href="#"> User register </a></li>
                  <li> <a href="#"> Account Setting </a></li>
                  <li> <a href="#"> My Orders </a></li>
                </ul>
              </aside>
              <aside class="col-md">
                <h6 class="title">Social</h6>
                <ul class="list-unstyled">
                  <li><a href="#"> <i class="fab fa-facebook"></i> Facebook </a></li>
                  <li><a href="#"> <i class="fab fa-twitter"></i> Twitter </a></li>
                  <li><a href="#"> <i class="fab fa-instagram"></i> Instagram </a></li>
                  <li><a href="#"> <i class="fab fa-youtube"></i> Youtube </a></li>
                </ul>
              </aside>
            </div> 
          </section>  
          <section class="footer-bottom row">
            <div class="col-md-2">
              <p class="text-muted">   2021 Company name </p>
            </div>
            <div class="col-md-8 text-md-center">
              <span  class="px-2">info@com</span>
              <span  class="px-2">+000-000-0000</span>
              <span  class="px-2">Street name 123, ABC</span>
            </div>
            <div class="col-md-2 text-md-right text-muted">
              <i class="fab fa-lg fa-cc-visa"></i> 
              <i class="fab fa-lg fa-cc-paypal"></i> 
              <i class="fab fa-lg fa-cc-mastercard"></i>
            </div>
          </section>
        </div>
        </footer>
     
    </div>
   );
}

export default Home;
