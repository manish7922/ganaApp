import React, { Component } from 'react'
import "../style/home.css"
import Banner from './banner'
import TrendingSongs from './trendingSongs';
import NewRelease from './newRelease';
import FetaureArtist from './fetaureArtist';
import Radio from './radio';
import Footer from './footer';
import FilterFunction from './filterFunction';
import BottomPlayer from './bottomPlayer';
export default class Home extends Component {
  render() {
    console.log("hyy");
    return (
<div className="wrapper">
      {/* <FilterFunction /> */}
    <div className="home_pg">
        <div className="advert_v_Small sm-hide adunit"></div>
        <div className="advert_v_Small sm-hide adunit"></div>
        <div className="page-wrap">
            <Banner />
            <TrendingSongs />
            <div class="ad2_wrap parent_ad"><div id="home_ads_645x60_pd_high" class="inner_ad adunit"></div><div id="home_ads_645x60_pd_high_refresh" class="inner_ad adunit"></div></div>
       <NewRelease />
       <FetaureArtist />
       <Radio />
       <Footer />
       {/* <BottomPlayer /> */}
        </div>
    </div>
    <div className="advert advert_h_larg sm-hide"></div>
</div>
    )
  }
}
