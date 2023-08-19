import React, { Component } from "react";

import "../style/allTrending.css";
import httpServices from "../services/httpServices";
import Footer from "./footer";

export default class AllTrendingSongs extends Component {
    state={
        songs:[],
    }

    async fetchData() {
        let response = await httpServices.get("/gana");
        console.log(response);
        const { data } = response;
        this.setState({ songs: data });
      }
    
      componentDidMount() {
        this.fetchData();
        window.addEventListener("resize", this.handleResize);
      }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll);
    //   }
    
    //   componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    //   }


    //   handleScroll = () => {
    //     const { prevScrollPos } = this.state;
    //     const currentScrollPos = window.pageYOffset;
    
    //     if (currentScrollPos < prevScrollPos) {
    //       // Scrolling up, expand the scroll_headerInfo section
    //       this.setState({
    //         detailInfoHeight: 0,
    //         scrollHeaderInfoHeight: 100, // Adjust the desired height
    //         prevScrollPos: currentScrollPos,
    //       });
    //     } else {
    //       // Scrolling down, expand the detail_info section
    //       this.setState({
    //         detailInfoHeight: 200, // Adjust the desired height
    //         scrollHeaderInfoHeight: 0,
    //         prevScrollPos: currentScrollPos,
    //       });
    //     }
    //   };
    


  render() {
    const { detailInfoHeight, scrollHeaderInfoHeight,songs } = this.state;
    return (
        <div className="wrapper">
            <div class="inr_top_ads"><div id="ads_645x60_pd_high" class="advert adunit leaderboard"></div><div id="ads_645x60_pd_high_refresh" class="advert adunit leaderboard"></div></div>
      <div class="page-wrap trending_pg">
        <div class="detail_wrap">
          <ul id="breadcrum" class="breadcrumb sm-hide">
            <li>
              <a class="_link" href="/">
                <span>Gaana</span>
              </a>
            </li>
            <li>
              <span class="sep">
                <svg width="10" height="17" viewBox="0 0 10 17">
                  <path
                    class="svg_color"
                    fill="#000"
                    fill-rule="evenodd"
                    d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
                  ></path>
                </svg>
              </span>
              <span class="_title">Trending Songs</span>
            </li>
          </ul>

          <section id="detail_info" className="info_sec"      >
            <div className="blur_wrapper sm-hide">
              <img src="https://a10.gaanacdn.com/gn_img/albums/6Zxb27K9wN/xb2qrjNoW9/size_l_1688020211.jpg" alt="blurImg" />
            </div>
            <div className="atw">
              <img src="https://a10.gaanacdn.com/gn_img/albums/6Zxb27K9wN/xb2qrjNoW9/size_l_1688020211.jpg" alt="Trending Songs" title="Trending Songs" />
            </div>
            <div className="info">
              <div className="_a">
                <h1 className="title t_over" title="Trending Songs">
                  Trending Songs
                </h1>
                <button className="icon lg-hide" title="More Options">
                  <svg
                    className="threedot_svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      className="svg_color"
                      fill="#000"
                      transform="translate(10 5)"
                    >
                      <circle cx="1.5" cy="1.5" r="1.5"></circle>
                      <circle cx="1.5" cy="7.5" r="1.5"></circle>
                      <circle cx="1.5" cy="13.5" r="1.5"></circle>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="_b">
                <p className="al_name">Top trending hits, refreshed daily</p>
                <span className="al_name">Created by Gaana</span>
                <span className="al_name">30 Tracks</span>
              </div>
              <div className="_d">
                <button className="btn btn_solid" id="playBtn1" title="Play">
                  Play
                </button>
              </div>
            </div>
          </section>

      {/* <section id="scoll_headerInfo" className="scroll-info sm-hide active"    >
        <div className="_lt t_over">
          <div className="LazyLoad is-visible">
            <picture>
              <source srcSet="https://a10.gaanacdn.com/gn_img/albums/6Zxb27K9wN/xb2qrjNoW9/size_l_1688020211.jpg" media="(min-width: 992px)" />
              <source srcSet="https://a10.gaanacdn.com/gn_img/albums/6Zxb27K9wN/xb2qrjNoW9/size_m_1688020211.jpg" />
              <img alt="Trending Songs" title="Trending Songs" />
            </picture>
          </div>
          <strong className="t_over" title="Trending Songs">Trending Songs</strong>
        </div>
        <div className="_rt">
          <button className="btn btn_solid" id="playBtn1" title="Play">Play</button>
        </div>
      </section> */}


<section className="song-list">
        <ul className="_row list_heading sm-hide">
          <li className="_sno"><span>#</span></li>
          <li className="_atw"></li>
          <li className="_wrap">
            <div className="_grp">
              <div className="_tra">
                <span>Track</span>
              </div>
              <div className="_art">
                <span>Artists</span>
              </div>
            </div>
          </li>
          <li className="_ply lg-hide"></li>
          <li className="_fav"></li>
          <li className="_dot"></li>
          <li className="_dur">
            <span>Duration</span>
          </li>
        </ul>
       
          {songs.map((song, index) => (
            <>
             <ul className="_row list_data">
            <li key={index} className="_atw default_bg _plyCr">
              <div className="LazyLoad is-visible">
                <img src={song.imgSrc} alt={song.title} title={song.title} />
              </div>
            </li>
            <li className="_wrap">
              <div className="_grp">
                <a className="_tra t_over _plyCr" href={`/gana/${song.id}`}>
                  <span className="t_over">{song.songName}</span>
                </a>
                <div className="_art t_over">
                  <span className="t_over">
                    {song.singer.map((artist, idx) => (
                      <React.Fragment key={idx}>
                        <a title={artist} className="_link" href={`/artist/${artist}`}>
                          {artist}
                        </a>
                        {idx < song.singer.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
            </li>
            <li title="Play" className="_ply lg-hide _plyCr">
              <svg width="14" height="15" viewBox="0 0 16 24">
                <path className="svg_color" fill-rule="evenodd" d="M0 0v24l20-12z"></path>
              </svg>
            </li>
            <li className="_fav sm-hide">
              <button title="Add to favorites">
              <svg class="fav " width="19" height="19" viewBox="0 0 19 19"><g fill="none" fill-rule="evenodd"><path class="svg_color" fill-rule="nonzero" d="M9 17.792l-1.208-1.1C3.5 12.8.667 10.225.667 7.083.667 4.508 2.683 2.5 5.25 2.5c1.45 0 2.842.675 3.75 1.733A5.011 5.011 0 0 1 12.75 2.5c2.567 0 4.583 2.008 4.583 4.583 0 3.142-2.833 5.717-7.125 9.609L9 17.792z"></path></g></svg>
              </button>
            </li>
            <li className="_dot">
              <button title="More Options">
                <svg className="threedot_svg" width="24" height="24" viewBox="0 0 24 24">
                  <g className="svg_color" fill="#000" transform="translate(10 5)">
                    <circle cx="1.5" cy="1.5" r="1.5"></circle>
                    <circle cx="1.5" cy="7.5" r="1.5"></circle>
                    <circle cx="1.5" cy="13.5" r="1.5"></circle>
                  </g>
                </svg>
              </button>
            </li>
            <li className="_dur sm-hide">
              <span>{song.duration}</span>
            </li>
            </ul>
            </>
          ))}
     
        {/* ... more ul elements */}
      </section>


        </div>
      </div>
      <div className="advert advert_h_larg sm-hide"></div>
      <Footer />
      </div>

    );
  }
}
