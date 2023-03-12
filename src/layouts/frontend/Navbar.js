import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import swal from 'sweetalert';
import axios from 'axios';

function Navbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success",res.data.message,"success");
                history.push('/');
            }
        });

    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons = (
            <div class="widget-header icontext">
            <a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></a>
            <div class="text">
                <div> 
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Đăng nhặp</Link>
                </li>
                <h6>OR</h6>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Đăng ký</Link>
                </li>
            </ul>
                </div>
            </div>
        </div>
        );
    }
    else
    {
        AuthButtons = (
          <div class="widget-header icontext">
          <a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></a>
          <div class="text">
              <div> 
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
                </div>
            </div>
        </div>
        );
    }

    return (
        <header class="section-header">
        <section class="header-main border-bottom">
        <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-2 col-4">
            <Link className="navbar-brand" to="#">Web Bán Hàng</Link>
            </div>
            <div class="col-lg-6 col-sm-12">
                <form action="#" class="search">
                    <div class="input-group w-100">
                        <input type="text" class="form-control" placeholder="Search" />
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="submit">
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                    </div>
                </form>
            </div> 
           
            <div class="col-lg-4 col-sm-6 col-12 vv">
                <div class="widgets-wrap float-md-right">
                    <div class="widget-header  mr-3">
                        <Link className="nav-link" to="/cart" class="icon icon-sm rounded-circle border"><i class="fa fa-shopping-cart"></i></Link>
                        <span class="badge badge-pill badge-danger notify">0</span>
                    </div>
                    {AuthButtons}
                </div> 
            </div> 
        </div> 
            </div> 
        </section>
        <nav class="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
          <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main_nav">
              <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                  <Link className="nav-link active" to="/">Trang Chủ</Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to="/about">About</Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                <li class="nav-item">
                <Link className="nav-link" to="/collections">Collection</Link>
                </li>
          
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> More</a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Foods and Drink</a>
                    <a class="dropdown-item" href="#">Home interior</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Category 1</a>
                    <a class="dropdown-item" href="#">Category 2</a>
                    <a class="dropdown-item" href="#">Category 3</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </header>
    );
}

export default Navbar;
