import React, { Component } from 'react'
import "../style/trending.css"
import httpServices from '../services/httpServices';

export default class FetaureArtist extends Component {
    state={
        products:[],
        currentPage: 1,
        screenWidth: window.innerWidth,
    }
    
    async fetchData() {
        let response = await httpServices.get("/artist");
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
        <section className="caro caro_sqr caro_circ">
        <div className="head">
            <div className="row row2">
                <div className="_col">
                    <h2 className="_h2">Featured Artists</h2>
                </div>
            </div>
        </div>
        <div className="caro_container">
            <ul className="card_wrap">
                {dealPage.map(artist => (
                    <li className="card" key={artist.name}>
                        <a className="img default_bg" aria-label="artwork" href={artist.link}>
                            <div className="LazyLoad is-visible">
                                <img src={artist.imgSrc} alt={artist.name} title={artist.name} />
                            </div>
                        </a>
                        <div className="t_wrap">
                            <a alt={artist.name} title={artist.name} className="al t_over" href={artist.link}>
                                {artist.name}
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
