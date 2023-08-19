import React, { Component } from "react";
import "../style/bottom.css"
import httpServices from "../services/httpServices";

export default class BottomPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPlaying: false,
     songs:{},
     isLoaded: false,
        };
        this.audioRef = React.createRef();
      }




    async fetchData() {
        let { id } = this.props.match.params;
        let response = await httpServices.get(`/gana/${id}`);
        console.log(response);
        const { data } = response;
        this.setState({ songs: data });
      }
    
      componentDidMount() {
        this.fetchData();
        this.audioRef.current.addEventListener('canplaythrough', this.handleAudioLoad);
    }
  
    componentWillUnmount() {
      this.audioRef.current.removeEventListener('canplaythrough', this.handleAudioLoad);
    }
  
    handleAudioLoad = () => {
    //   this.setState({ isLoaded: true });
    };

    playSong = () => {
        this.setState({ isPlaying: true });
        this.audioRef.current.play();
      };
    
      pauseSong = () => {
        this.setState({ isPlaying: false });
        this.audioRef.current.pause();
      };

  render() {
    const {songs,isPlaying,isLoaded}=this.state
    return (
      <div className="player_container">
        <section id="bottomplayer" className="ply_bar ">
          <div id="mq_ads">
            Advertisement&nbsp;&nbsp;|&nbsp;&nbsp;Your song has been queued and
            will play shortly.
          </div>
          <div id="adsOverlayOnPlayerForPause"></div>
          <div id="adsOverlayOnPlayer"></div>

          <div className="Progress Rac__progress-bar">
            <div className="TimeLine__track Progress__track">
              <div className="TimeLine__hover-track false" role="presentation">
                <input
                  className="seek"
                  id="seek"
                  min="0"
                  data-seek=""
                  type="range"
                  step="0.01"
                />
              </div>
              <div
                className="TimeLine__scrubbed"
                style={{ width: "6.19%" }}
              ></div>
              <div
                className="TimeLine__scrubbed_buf"
                style={{ width: "0px" }}
              ></div>
            </div>
          </div>

      
        <div  className="_lt">
          <div className="LazyLoad is-visible">
            <a href={songs.albumLink}>
              <img
                src={songs.imgSrc}
                alt={songs.imageAlt}
                title={songs.imageTitle}
              />
            </a>
          </div>
          <div className="_txt">
            <strong className="t_over">
              <a href={songs.albumLink}>
                <span title="Premium" className="new_premium">
                  Premium
                </span>
                {songs.songName}
              </a>
            </strong>
            <small className="t_over">
              <a href={songs.albumLink}>{songs.songTitle}</a>
            </small>
          </div>
          <button className="sm-hide _ic" title="Add to favorites">
            <svg className="fav " width="18" height="18" viewBox="0 0 19 19">
              <g fill="none" fillRule="evenodd">
                <path
                  className="svg_color"
                  fillRule="nonzero"
                  d="M9 17.792l-1.208-1.1C3.5 12.8.667 10.225.667 7.083.667 4.508 2.683 2.5 5.25 2.5c1.45 0 2.842.675 3.75 1.733A5.011 5.011 0 0 1 12.75 2.5c2.567 0 4.583 2.008 4.583 4.583 0 3.142-2.833 5.717-7.125 9.609L9 17.792z"
                ></path>
              </g>
            </svg>
          </button>
          <button className="sm-hide _ic" title="More options" data-position="fixed">
            <svg className="threedot_svg" width="20" height="20" viewBox="0 0 24 24">
              <g className="svg_color" fill="#000" transform="translate(10 5)">
                <circle cx="1.5" cy="1.5" r="1.5"></circle>
                <circle cx="1.5" cy="7.5" r="1.5"></circle>
                <circle cx="1.5" cy="13.5" r="1.5"></circle>
              </g>
            </svg>
          </button>
        </div>
  


        <div className="_md playerCtr">
          <div className="time sm-hide">
            <span className="_a">00:00</span>
            <span className="sepr">/</span>
            <span className="_b">00:00</span>
          </div>
          <button title="Repeat" className="repeat sm-hide r_off ">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path className="svg_color" fill="#000" fillRule="evenodd" d="M18.5 13.024V18H8.302v2L5 17.532l3.302-2.46V17H17.5v-3.976h1zM16.698 4L20 6.468l-3.302 2.46V7H7.5v3.976h-1V6h10.198V4z"></path>
            </svg>
          </button>
          <button title="Previous Song" className="prev sm-hide ">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <g class="svg_color" fill="#000" transform="translate(-655 -2658) translate(87 2624)"><g transform="translate(520 29) rotate(-180 32.714 12.5)"><path d="M5.187 2.955L12.588 12.834 -2.215 12.834z" transform="rotate(90 5.187 7.895)"></path><rect width="1.482" height="14.803" x="9.632" y=".74" rx=".741"></rect></g></g>
            </svg>
          </button>
          <button title="Play" className="play false" onClick={this.playSong} >
            <svg width="13" height="14" viewBox="0 0 16 24">
            <path class="svg_color" fill-rule="evenodd" d="M0 0v24l20-12z"></path>
            </svg>
          </button>
          <button title="Next Song" className="next sm-hide ">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <g class="svg_color" fill="#000" transform="translate(-655 -2658) translate(87 2624)"><g transform="translate(520 29) rotate(-180 32.714 12.5)"><path d="M5.187 2.955L12.588 12.834 -2.215 12.834z" transform="rotate(90 5.187 7.895)"></path><rect width="1.482" height="14.803" x="9.632" y=".74" rx=".741"></rect></g></g>
            </svg>
          </button>
          <button title="Shuffle" className="shuffle sm-hide s_off ">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd"><path class="svg_color" fill="#000" d="M19 5.163l-.645 4.36-1.552-1.552L5.626 19.15l-.62-.62L16.186 7.352l-1.55-1.55L19 5.163zm-4.602 8.386l2.443 2.443 1.514-1.514.64 4.365-4.36-.644 1.588-1.588-2.445-2.443.62-.62zM5.628 4.85l5.064 5.065-.62.62L5.008 5.47l.62-.62z"></path></g>
            </svg>
          </button>
        </div>


        <div className="_rt">
          <div className="_a sm-hide">
            <div className="Volume">
              <button title="Volume" className="Button false ToggleButton Volume__toggle ">
                <svg width="24" height="24" viewBox="0 0 24 24">
                <g class="svg_color" fill="#000" fill-rule="evenodd"><path d="M9.148.045c-.163-.074-.358-.054-.499.051L4.066 3.43H.47C.21 3.43 0 3.622 0 3.86v4.284c0 .237.21.429.47.429h3.596l4.583 3.334c.084.06.186.093.292.094.072-.002.142-.017.207-.043.162-.072.264-.222.264-.386V.431c0-.164-.102-.314-.264-.386zM8.471 10.68L4.527 7.81c-.083-.06-.186-.094-.292-.095H.941V4.287h3.294c.106-.001.209-.034.292-.094l3.944-2.871v9.358zM12.01.062c-.145-.08-.325-.083-.474-.009-.148.075-.24.215-.244.369-.004.154.083.298.228.377 2.419 1.32 3.539 2.974 3.539 5.202 0 2.228-1.12 3.882-3.539 5.202-.22.125-.291.387-.16.591.088.126.24.203.405.206.086.002.17-.02.244-.06C14.692 10.475 16 8.572 16 6.001c0-2.57-1.308-4.473-3.99-5.939z" transform="translate(4 6)"></path><path d="M11.595 8.572h.17c.134 0 .261-.052.348-.146.692-.649 1.074-1.52 1.063-2.425.011-.904-.37-1.776-1.063-2.425-.122-.143-.329-.202-.518-.146-.19.07-.311.242-.3.429v4.284c-.011.187.11.36.3.429z" transform="translate(4 6)"></path></g>
                </svg>
              </button>
              <div className="vol_wrap">
                <div className="_inner">
                  <input className="Volume__slider " title="Volume" type="range" step="0.01" min="0" max="100" id="volume" />
                  <div className="TimeLine__scrubbed" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="_b sm-hide ">
            <button title="Song Quality">Audio: <span>High</span></button>
          </div>
          <button title="Queue" className="_d">
            <svg width="14" height="12" viewBox="0 0 10 17">
              <path className="svg_color" fill="#000" fillRule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path>
            </svg>
          </button>
        </div>

        <audio ref={this.audioRef} src={songs.src} controls />

        </section>
      </div>
    );
  }
}
