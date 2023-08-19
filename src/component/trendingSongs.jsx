import React, { Component } from 'react'

import "../style/trending.css"
import httpServices from '../services/httpServices';

export default class TrendingSongs extends Component {
state={
    products:[],
    currentPage: 1,
    screenWidth: window.innerWidth,
}

async fetchData() {
    let response = await httpServices.get("/gana");
    console.log(response);
    const { data } = response;
    this.setState({ products: data });
  }

  componentDidMount() {
    this.fetchData();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  handlePage = (p) => {
    this.setState({ currentPage: this.state.currentPage + p });
  };


  render() {
    const {currentPage,  products, screenWidth}=this.state
    let  pageSize= 5;
    let dealPage = []; // Use "let" instead of "const"
    console.log(dealPage);
    if (products) {
      if (screenWidth <= 400) {
        pageSize = 4;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth <= 600) {
        pageSize = 4;
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth < 998) {
         pageSize = Math.min(pageSize, 4);
        let startIndex = (currentPage - 1) * pageSize;
        console.log(startIndex);
   
        console.log(pageSize);
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else if (screenWidth < 1190) {
         pageSize = Math.min(pageSize, 5);
        let startIndex = (currentPage - 1) * pageSize;
        console.log(startIndex);
    
        console.log(pageSize);
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      } else {
        let startIndex = (currentPage - 1) * pageSize;
        let DealsData = [...products];
        dealPage = DealsData.splice(startIndex, pageSize);
      }
    }
    
    return (
<section className='caro caro_sqr mWrap'>
    <div className="head">
        <div className="row row2">
            <div className="col">
            <h1 class="_h2">Trending Songs</h1>
            </div>
            <a class="" title="Trending Songs See all" href="/songs"><span>See All</span></a>
        </div>
    </div>
    <div className="caro_container">
    <ul className="card_wrap">
          {dealPage.map((item, index) => (
            <li className="card" key={index}>
              <a className="img default_bg premium_icon" href={item.link}>
                <img src={item.imgSrc} alt={item.title} title={item.title} />
                <span className="play_icon" title="Play"></span>
              </a>
              <div className="t_wrap">
                <a className="al t_over" href={item.link} title={item.title}>
                  {item.songName}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn_prev sm-hide disable" title="Previous"
          disabled={currentPage === 1}
              onClick={() => this.handlePage(-1)} >
        <svg width="7" height="12" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg>
        </button>
        <button className="btn btn_next sm-hide" title="Next" 
        onClick={() => this.handlePage(1)}
        disabled={currentPage === Math.ceil(products.length / pageSize)} >
        <svg width="7" height="12" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg>
        </button>

    </div>
</section>
    )
  }
}
