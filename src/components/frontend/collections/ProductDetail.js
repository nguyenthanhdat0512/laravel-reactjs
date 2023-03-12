import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from 'react-router-dom';

function ProductDetail(props)
{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [viewProduct, setProductt] = useState([]);

    useEffect(() => {

        let isMounted = true;

        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
  
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning",res.data.message,"error");
                }
            }
        });
        axios.get(`/api/allproduct`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProductt(res.data.products);
                    setLoading(false);
                }
            }
        });
      
        return () => {
            isMounted = false
        };
    }, [props.match.params.category, props.match.params.product, history]);

    // Quantity Increment/Decrement in Hooks - Start
    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }
    // Quantity Increment/Decrement in Hooks - End

    const submitAddtocart = (e) => {
        e.preventDefault();
        
        const data = {
            product_id: product.id,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                //Created - Data Inserted
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 409){
                //Already added to cart
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 401){
                //Unauthenticated
                swal("Error",res.data.message,"error");
            }else if(res.data.status === 404){
                //Not Found
                swal("Warning",res.data.message,"warning");
            }
        });

    }

    if(loading)
    {
        return <h4>Loading Product Detail...</h4>
    }
    else
    {

        var avail_stock = '';
        if(product.qty > 0)
        {
            avail_stock = <div>
                <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtocart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        }
        else
        {
            avail_stock = <div>
                <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
            </div>
        }
        
        var display_Productdata = "";
        display_Productdata = viewProduct.map( (item) => {
            return (
                <article class="itemside mb-3">
              <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <img src={`http://localhost:8000/${item.image}`} alt={item.name} width="96" height="96" class="img-md img-thumbnail"/>
                </Link>
                <div class="info">
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <div class="title mb-1">{ item.name } <br/> { item.brand } </div>
                </Link>
                <strong class="price"> {item.selling_price} VNĐ</strong>
                </div>
            </article>
            )
        });
    }

    return (
        <div className="home-section">
          
           
        
                <section class="bg-primary padding-y-sm">
                <div class="container">
                
                    <ol class="breadcrumb ondark mb-0">
                    <h6>Collections / {product.category.name} / {product.name}</h6>
                    </ol>
                
                </div> 
                </section>
                
                
               
                <section class="padding-y">
                <div class="container">
                
                <div class="row">
                <aside class="col-lg-6">
                    <article class="gallery-wrap"> 
                    <div class="img-big-wrap img-thumbnail">
                    <a data-fslightbox="mygalley" data-type="image"> 
                        <img height="560" src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-100" /> 
                    </a>
                    </div>
               
                    </article> 
                </aside>
                <main class="col-lg-6">
                    <article class="ps-lg-3">
                    <h4 class="title text-dark">{product.name} <br />   {product.brand} </h4>
                    <div class="rating-wrap my-3">
                    <ul class="rating-stars">
                    <li style={{width:"80%"}} class="stars-active"> <img src="assets/images/misc/stars-active.svg" alt=""/> </li>
                    <li> <img src="assets/images/misc/starts-disable.svg" alt=""/> </li>
                    </ul>
                    <b class="label-rating text-warning"> 4.5</b>
                    <i class="dot"></i>
                    <span class="label-rating text-muted"> <i class="fa fa-shopping-basket"></i> 154 orders </span>
                    <i class="dot"></i>
                    </div> 
                <div>
                {avail_stock}
                    </div>    
                    <div class="mb-3"> 
                    <var class="price h5">  {product.selling_price} VNĐ</var> 
                 
                    </div> 
                
                    <p>{product.description}</p>
                
                   
                
                    <hr/>
                
                    
                    </article> 
                </main> 
                </div> 
                
                </div> 
                </section>
                
                <section class="padding-y bg-light border-top">
                <div class="container">
                <div class="row">
                    <div class="col-lg-8">
              
                <div class="card">
                    <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_specs" data-bs-toggle="tab" class="nav-link active">Specification</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_warranty" data-bs-toggle="tab" class="nav-link">Warranty info</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_shipping" data-bs-toggle="tab" class="nav-link">Shipping info</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_seller" data-bs-toggle="tab" class="nav-link">Seller profile</a>
                    </li>
                    </ul>
                    </header>
                    <div class="tab-content">
                    <article id="tab_specs" class="tab-pane show active card-body">
                    <p>With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    <ul class="list-check cols-two">
                    <li>Some great feature name here </li>
                    <li>Lorem ipsum dolor sit amet, consectetur </li>
                    <li>Duis aute irure dolor in reprehenderit </li>
                    <li>Optical heart sensor </li>
                    <li>Easy fast and ver good </li>
                    <li>Some great feature name here </li>
                    <li>Modern style and design</li>
                    </ul>
                    <table class="table border table-hover">
                    <tr>
                        <th>  Display: </th> <td> 13.3-inch LED-backlit display with IPS </td>
                    </tr>
                    <tr>
                        <th>  Processor capacity: </th> <td> 2.3GHz dual-core Intel Core i5 </td>
                    </tr>
                    <tr>
                        <th>  Camera quality: </th> <td>720p FaceTime HD camera  </td>
                    </tr>
                    <tr>
                        <th>  Memory </th> <td> 8 GB RAM or 16 GB RAM </td>
                    </tr>
                    <tr>
                        <th>  Graphics </th> <td> Intel Iris Plus Graphics 640 </td>
                    </tr>
                    </table>
                    </article> 
                    <article id="tab_warranty" class="tab-pane card-body">
                    Tab content or sample information now <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    </article>
                    <article id="tab_shipping" class="tab-pane card-body">
                    Another tab content  or sample information now <br/>
                    Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </article>
                    <article id="tab_seller" class="tab-pane card-body">
                    Some other tab content  or sample information now <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </article>
                    </div>
                </div>
              
                    </div> 
                    <aside class="col-lg-4">
              
                    <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Các sản phẩm khác</h5>
                    {display_Productdata}
                 
                
                    </div> 
                    </div> 
             
                    </aside> 
                </div>
                
                <br/><br/>
                
                </div>
                </section>
               
                    
        </div>
      
       
    );
}

export default ProductDetail;
