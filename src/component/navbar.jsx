import React, { Component } from 'react'
import "../style/navbar.css"
import Login from './login'
import httpServices from '../services/httpServices'
import authServices from '../services/authServices'
import {FaLongArrowAltUp} from "react-icons/fa"
import FilterFunction from './filterFunction'

export default class Navbar extends Component {
    state={
        showForm:false,
        formData: { q: "", email: "", password: "" },
        formData1: {
        name:"",
          email: "",
          password: "",
          phone: "",
        },
        localuser: this.props?.user?.name,
        showDrop:false,
        showHamburger:false,
    }

    handleHambuger=()=>{
        this.setState((prevState) => {
            return { showHamburger: !prevState.showHamburger,showDrop:false };
          });
    }

    showModal = () => {
        console.log("hyyy");
        this.setState({ showForm: true  });
      };

      handleCloseForm = () => {
        this.setState({ showForm: false });
      };

      handleDrop=()=>{
        this.setState((prevState) => {
            return { showDrop: !prevState.showDrop,showHamburger:false };
          });
      }

      handleChange = (e) => {
        let { currentTarget: input } = e;
        let formData = { ...this.state.formData };
        formData[input.name] = input.value;
        this.setState({ formData: formData, searchTerm: input.value });
      };
      handleChange1 = (e) => {
        let { currentTarget: input } = e;
        let formData1 = { ...this.state.formData1 };
        formData1[input.name] = input.value;
        console.log(formData1);
        this.setState({ formData1: formData1 });
      };

      handleSubmitForm = (e) => {
        // debugger
        e.preventDefault();
        console.log(this.state.formData);
        let body = this.state.formData;
        this.postData("/user", body);
      };
      handleSubmitForm1 = (e) => {
        e.preventDefault();
        console.log(this.state.formData);
        let body = this.state.formData1;
        this.postData("/register", body);
      };


      async postData(url, obj) {
        try {
          let response = await httpServices.post(url, obj);
          console.log(response);
          let { data } = response;
          console.log("log in ", data);
          //    console.log("token",token);
          console.log(data.name);
          authServices.storeToken(data);
          this.setState({ logged: true });
          this.setState({ localuser: data?.name });
          this.handleCloseForm();
          // window.location = "/";
          console.log(response);
        } catch (ex) {
          console.log(ex.response);
          let errMsg = `${ex.response.status} ${ex.response.statusText}`;
          this.setState({ errMsg: errMsg });
        }
      }

    //   handeleAllPage=()=>{
    //     this.setState({showHamburger:false,showDrop:false})
    //   }

  render() {
    const {showForm,showDrop,showHamburger}=this.state
    return (
        <>
    <header className='gheader h_home' >
        <div className="_inner">
            <div className="lt">
            <div class="box">
                <a aria-label="back icon" class="back-arrow lg-hide" href="/home">
                <svg width="24" height="24" viewBox="0 0 24 24">
                <path class="svg_color" fill="#000" fill-rule="evenodd" d="M19.7 11H7.5l5.6-5.6L11.7 4l-8 8 8 8 1.4-1.4L7.5 13h12.2z"></path>
                </svg></a>
                <button class="ham" aria-label="menu button" onClick={this.handleHambuger}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path class="svg_color" fill="#000" fill-rule="nonzero" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"></path>
            </svg>
            </button>
            </div>
             <div class="log_wrap">
                <a class="logo" aria-label="gaana logo" href="/home">
                <svg width="87" height="22" viewBox="0 0 87 22"><g fill="none" fill-rule="evenodd"><path class="svg_color_brand" fill="#e72c30" d="M57.998 12.982c.122-.678.23-1.313.347-1.95.383-2.159.767-4.317 1.138-6.476.11-.625-.28-1.074-.925-1.104-.414-.018-.834-.012-1.248-.012-.864.006-1.436.51-1.583 1.35-.462 2.65-.937 5.301-1.411 7.946-.019.09-.129.234-.196.234-1.186-.018-2.368-.03-3.549-.108-.767-.048-1.382-.432-1.814-1.068-.024-.03-.055-.053-.097-.102-.165.175-.317.342-.48.498-.543.534-1.17.852-1.955.792-.554-.042-1.12 0-1.662-.096-.968-.174-1.759-.648-2.234-1.59-.073.324-.152.642-.225.966-.165.774-.158.768-.962.732-.572-.024-1.144-.102-1.638-.396-.377-.228-.7-.552-1.077-.852-.11.114-.262.282-.42.438-.542.528-1.169.828-1.954.798-.749-.03-1.497.018-2.222-.246-1.29-.474-1.99-1.583-1.766-2.927.293-1.77.548-3.55.95-5.295.408-1.752 1.474-2.975 3.355-3.353a4.12 4.12 0 01.815-.084c1.553-.006 3.105-.006 4.657-.006.079 0 .152.012.256.024-.152.852-.304 1.685-.45 2.52-.348 1.924-.7 3.843-1.035 5.769-.03.18.042.401.133.563.232.414.95.702 1.425.624.176-2.045.585-4.048 1.016-6.04.384-1.763 1.474-2.998 3.367-3.376a4.12 4.12 0 01.815-.084c1.553-.006 3.105-.006 4.658-.006.066 0 .14.012.243.018-.091.522-.177 1.031-.268 1.535-.414 2.285-.834 4.57-1.248 6.855-.06.324.055.594.323.792.103.078.22.156.34.186.25.066.53.18.768.132.328-.066.206-.426.249-.654.475-2.579.932-5.158 1.388-7.743.067-.36.134-.725.207-1.103.098-.006.183-.018.274-.018 1.51 0 3.025-.006 4.535 0 .59.006 1.169.126 1.704.384.908.444 1.437 1.17 1.395 2.171-.031.84-.183 1.68-.323 2.513-.366 2.111-.749 4.222-1.126 6.327-.019.12-.03.24-.068.354-.023.06-.103.138-.157.138-.755.036-1.492.03-2.265.03zM39.291 3.464a.917.917 0 00-.147-.024c-.766 0-1.54-.006-2.306 0-.768.006-1.346.468-1.485 1.206-.3 1.574-.584 3.152-.853 4.731-.134.798.268 1.248 1.108 1.284.335.011.67.006 1.005 0 .919-.006 1.467-.474 1.63-1.367.25-1.392.512-2.784.767-4.169.086-.545.177-1.098.28-1.661zm10.172.006c-.085-.018-.116-.03-.14-.03-.773 0-1.54-.012-2.313 0-.78.011-1.358.474-1.498 1.224a422.148 422.148 0 00-.852 4.731c-.122.714.195 1.14.925 1.23.402.048.81.03 1.212.03.883-.006 1.442-.474 1.594-1.332l.713-3.85c.122-.654.237-1.32.359-2.003zm-21.038 9.518c-.213 0-.384.006-.554 0-.84-.018-1.687.018-2.52-.072-1.26-.144-2.137-.924-2.387-1.997-.14-.588-.06-1.17.043-1.751.28-1.548.548-3.1.846-4.648.36-1.872 1.826-3.215 3.769-3.365 1.138-.09 2.288-.054 3.433-.066.608-.006 1.211 0 1.868 0-.079.474-.152.924-.23 1.367-.44 2.453-.884 4.906-1.328 7.36-.28 1.54-.536 3.082-.852 4.617-.427 2.093-2.045 3.058-3.707 3.293-.402.053-.81.06-1.212.06-1.4.005-2.8 0-4.2 0-.018 0-.037-.006-.08-.018.006-.036 0-.072.019-.102.39-.69.773-1.38 1.181-2.057.06-.096.243-.162.371-.162 1.23-.013 2.453-.006 3.683-.006.938 0 1.419-.378 1.62-1.284.097-.377.151-.737.237-1.17zm-.926-2.363v.036c.317 0 .633-.024.944.006.31.03.42-.096.469-.384.322-1.883.657-3.766.992-5.65.128-.707-.237-1.17-.974-1.193-.408-.012-.81-.006-1.217-.006-.816.012-1.37.474-1.516 1.271-.158.864-.323 1.722-.475 2.586-.134.773-.286 1.546-.377 2.326-.068.558.243.924.82.99.44.054.89.018 1.334.018zm44.044-9.53c-.214 1.194-.427 2.345-.634 3.502a669.492 669.492 0 00-.864 4.793c-.116.641.158 1.043.786 1.247.078.024.17.174.158.252-.11.69-.238 1.373-.366 2.099-1.077-.066-2.014-.39-2.684-1.301-.177.185-.329.36-.493.52-.536.517-1.15.829-1.93.787-.675-.036-1.352.03-2.015-.175-1.492-.455-2.24-1.612-1.978-3.124.298-1.739.553-3.484.95-5.206.376-1.619 1.35-2.8 3.055-3.25a4.67 4.67 0 011.078-.15c1.583-.018 3.165-.006 4.742-.006.048 0 .104.006.195.012zm-2.8 2.369c-.123-.012-.196-.024-.274-.024-.731 0-1.462-.006-2.192 0-.755.011-1.333.456-1.467 1.182a319.26 319.26 0 00-.87 4.881c-.104.612.213 1.032.845 1.11.408.054.828.042 1.242.042.95 0 1.498-.48 1.662-1.404.268-1.511.554-3.016.828-4.522.079-.413.146-.827.225-1.265zM0 0h18v18H0z"></path><path class="svg_g" fill="#FFF" d="M11.585 3.752c.371-.004.74 0 1.143 0-.049.297-.093.58-.142.86-.268 1.541-.54 3.084-.811 4.626-.171.968-.328 1.937-.522 2.903-.261 1.316-1.251 1.922-2.268 2.07a5.588 5.588 0 01-.742.037c-.856.004-1.713 0-2.57 0a.151.151 0 01-.048-.012c.004-.021 0-.045.01-.063.24-.434.474-.867.724-1.293.037-.06.149-.102.227-.102.753-.008 1.501-.004 2.254-.004.573 0 .867-.237.99-.807.06-.237.093-.463.146-.735-.13 0-.235.004-.34 0-.514-.013-1.032.01-1.542-.046-.772-.09-1.308-.58-1.461-1.255-.085-.37-.036-.736.027-1.102.171-.972.336-1.949.518-2.92.22-1.177 1.118-2.022 2.306-2.115.697-.057 1.4-.035 2.1-.042zM9.91 5.225l-.373.001c-.498.008-.837.297-.927.8-.097.542-.197 1.081-.29 1.624-.082.487-.175.973-.23 1.463-.042.35.147.66.501.66h1.393c.177 0 .258-.061.288-.241.197-1.184.402-2.368.606-3.552.08-.444-.145-.736-.596-.75-.249-.008-.495-.004-.745-.004z"></path></g></svg>
             </a>
             </div>
             <div class="mb_lang lg-hide">
                <div class="_lg">
                    <span>Hindi,</span><span>English</span></div>
                    <svg width="10" height="17" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg>
             </div>
             <button class="search_inpage lg-hide" aria-label="search icon">
                <svg width="23" height="23" viewBox="0 0 25 25"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M10.5 2A6.5 6.5 0 0 1 17 8.5c0 1.6-.6 3.1-1.56 4.23l.27.27h.8l5 5-1.5 1.5-5-5v-.8l-.27-.27C13.55 14.447 12.05 15 10.5 15a6.5 6.5 0 1 1 0-13zm0 2A4.48 4.48 0 0 0 6 8.5a4.48 4.48 0 0 0 4.5 4.5A4.48 4.48 0 0 0 15 8.5 4.48 4.48 0 0 0 10.5 4z"></path></svg>
             </button>

             <div class="sbox sm-hide">
                <button class="input_box"><span class="h_search">
               <svg width="18" height="18" viewBox="0 0 25 25"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M10.5 2A6.5 6.5 0 0 1 17 8.5c0 1.6-.6 3.1-1.56 4.23l.27.27h.8l5 5-1.5 1.5-5-5v-.8l-.27-.27C13.55 14.447 12.05 15 10.5 15a6.5 6.5 0 1 1 0-13zm0 2A4.48 4.48 0 0 0 6 8.5a4.48 4.48 0 0 0 4.5 4.5A4.48 4.48 0 0 0 15 8.5 4.48 4.48 0 0 0 10.5 4z"></path></svg></span><span>Search Artists, Songs, Albums</span>
             </button>
             </div>

            </div>
            <div class="mid lg-hide">
                <svg width="18" height="18" viewBox="0 0 25 25"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M10.5 2A6.5 6.5 0 0 1 17 8.5c0 1.6-.6 3.1-1.56 4.23l.27.27h.8l5 5-1.5 1.5-5-5v-.8l-.27-.27C13.55 14.447 12.05 15 10.5 15a6.5 6.5 0 1 1 0-13zm0 2A4.48 4.48 0 0 0 6 8.5a4.48 4.48 0 0 0 4.5 4.5A4.48 4.48 0 0 0 15 8.5 4.48 4.48 0 0 0 10.5 4z"></path></svg>
            <button class="ms_btn">Search Artists, Songs, Albums</button>
            </div>
            <div class="rt sm-hide">
                <a href="/subscribe/buy-gaana-plus" target="_blank" class="gplus mr60">Get Gaana Plus</a>
                <button class="lg mr">
                    <svg width="32" height="24" viewBox="0 0 20 16"><g fill="none" fill-rule="evenodd"><g transform="translate(-1108 -117) translate(1089 58) translate(19 15) translate(0 43) translate(.5 1.5)"><rect class="svg_box" width="11" height="11" x="7.591" y="3.5" fill="#FFF" stroke="#8E8E93" rx="5.5"></rect><rect class="svg_box" width="11" height="11" x=".5" y=".5" fill="#FFF" stroke="#8E8E93" rx="5.5"></rect><text fill="#8E8E93" font-size="7" font-weight="500"><tspan x="3.5" y="9">A</tspan></text><text fill="#8E8E93" font-size="5" font-weight="500"><tspan x="12" y="11.5">अ</tspan></text></g></g></svg>
                    </button>
                    <button class="thm mr" aria-label="theme button"><svg width="28" height="28" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><g class="svg_stroke" fill-rule="nonzero" stroke="#000" stroke-width=".5"><path d="M18.062 15.441c-2.222 1.13-4.847 1.148-7.084.047-2.237-1.1-3.825-3.19-4.287-5.64-.526-2.94.62-5.93 2.975-7.768.241-.185.321-.512.193-.787-.119-.279-.415-.438-.714-.384h-.002c-2.678.463-5.047 2.012-6.545 4.28-1.497 2.269-1.99 5.055-1.364 7.7.568 2.587 2.164 4.833 4.42 6.22 2.087 1.27 4.565 1.739 6.972 1.319.193-.034.386-.074.577-.12 1.393-.337 2.697-.971 3.822-1.859.72-.584 1.35-1.27 1.872-2.036.174-.247.158-.58-.04-.81-.196-.23-.524-.296-.795-.162zm-1.447 2.489c-1.05.828-2.266 1.42-3.566 1.735-2.406.567-4.938.165-7.05-1.12-2.104-1.295-3.591-3.39-4.12-5.803-.587-2.469-.127-5.07 1.271-7.189C4.548 3.436 6.76 1.99 9.26 1.56 6.71 3.55 5.47 6.788 6.042 9.972c.5 2.653 2.219 4.916 4.641 6.109 2.422 1.193 5.264 1.176 7.672-.046-.485.713-1.07 1.352-1.74 1.896h0v-.001z" transform="translate(5 5)"></path></g></g></svg></button>
         {this.state.localuser ? (
         <button class="user_ic" onClick={this.handleDrop}>
            <img src="https://a10.gaanacdn.com/images/users/144/crop_110x110_225506144.jpg" alt="user" />
            </button>
      
             ) : (
                  <button class="user" onClick={this.showModal}>Log In / Sign Up</button>
                )}
                    {showDrop && (
                      <div className="lgdrop_pp">
                      <div class="_li">
                        <svg width="18" height="18" viewBox="0 0 18 18"><path class="svg_color" fill="#000" d="M14.351 13.545c-.804-1.281-2.036-2.215-3.448-2.664.738-.573 1.22-1.457 1.22-2.46 0-1.723-1.4-3.124-3.123-3.124-1.722 0-3.124 1.401-3.124 3.124 0 1.003.483 1.888 1.221 2.46-1.412.449-2.644 1.383-3.448 2.664C2.606 12.318 1.972 10.733 1.972 9c0-3.876 3.153-7.03 7.028-7.03 3.875 0 7.028 3.154 7.028 7.03 0 1.732-.634 3.317-1.677 4.544M6.848 8.42c0-1.187.965-2.152 2.152-2.152 1.187 0 2.152.965 2.152 2.152 0 1.186-.965 2.152-2.152 2.152-1.187 0-2.152-.966-2.152-2.152M9 16.028c-1.792 0-3.424-.68-4.666-1.787.011-.016.03-.024.042-.042.958-1.637 2.729-2.654 4.624-2.654 1.894 0 3.666 1.017 4.623 2.653.011.018.028.03.04.046C12.421 15.35 10.79 16.028 9 16.028M9 1C4.59 1 1 4.59 1 9.001 1 13.411 4.59 17 9 17s8-3.588 8-7.999C17 4.589 13.41 1 9 1" transform="translate(-1109 -73) translate(1089 58) translate(19 15) translate(1)"></path></svg>
                      <a class="link" href="/profile"><span>Profile</span></a>
                      </div>
                      <div class="_li">
                        <svg width="20" height="18" viewBox="0 0 20 16"><g fill="none" fill-rule="evenodd"><g transform="translate(-1108 -117) translate(1089 58) translate(19 15) translate(0 43) translate(.5 1.5)"><rect class="svg_box" width="11" height="11" x="7.591" y="3.5" fill="#FFF" stroke="#8E8E93" rx="5.5"></rect><rect class="svg_box" width="11" height="11" x=".5" y=".5" fill="#FFF" stroke="#8E8E93" rx="5.5"></rect><text fill="#8E8E93" font-size="7" font-weight="500"><tspan x="3.5" y="9">A</tspan></text><text fill="#8E8E93" font-size="5" font-weight="500"><tspan x="12" y="11.5">अ</tspan></text></g></g></svg>
                        <span>Languages</span>
                        </div>
                        
                        <div class="_li">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                            <a class="link" href="/settings">
                            <span>Settings</span></a>
                            </div>

                            <div class="_li logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
                           <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>
                           <a class="link" href='/logout'><span>Log Out</span></a>    
                                </div>
                      </div>  
                    )}
            </div>
        </div>
    </header>
{showHamburger && (
    <div className={showHamburger ? "gnav open":"gnav"}>
        <div className="log_wrap">
        <a class="mid" href="/profile">
            <img src="https://a10.gaanacdn.com/images/users/144/crop_110x110_225506144.jpg" alt="user" />
            <strong>Hello, Guest </strong></a>
        </div>
        <div className="nav-pannel">
        <div class="scrollhost-container">
            <div id="scrollpad" class="scrollhost undefined">
                <div class="row">
                    <a class="link active" href="/"><small>Home</small></a>
                    <a class="link" href="/radio"><small>Radio</small></a>
                    <a class="link" href="/podcast"><small>Podcast</small></a>
                    <a class="link" href="/music"><small>My Music</small></a>
                    <a class="link" href="/weblink/republicday"><small>India's Music</small></a>
                    <button class="link"><small>Language</small><span>(Set Music language)</span></button>
                    <button class="link _col"><span>Night Mode</span><label class="form-switch">
                        <input type="checkbox" /><i></i></label></button>
                        </div>
                        <div class="row">
                            <strong class="title">Go Premium</strong>
                            <a target="_blank" href="/subscribe/buy-gaana-plus" class="link"><small>Get Gaana Plus</small></a>
                            </div>
                        <div class="row">
                            <strong class="title">Quick Access</strong>
                            <a class="link" href="/songs"><small>Trending Songs</small></a>
                            <a class="link" href="/newrelease"><small>New Songs</small></a>
                            <a class="link" href="/old-songs"><small>Old Songs</small></a>
                            <a class="link" href="/album"><small>Album</small></a>
                            <a class="link" href="/artist"><small>Artist</small></a>
                            <a class="link" href="/lyrics"><small>Lyrics</small></a>
                            <a class="link" href="/music-label"><small>Music Labels</small></a>
                            <a class="link" href="/genre"><small>Genres</small></a>
                            </div>
                            <div class="row">
                                <strong class="title">Account</strong>
                                <a class="link" href="/profile"><small>Profile</small></a>
                                <a class="link" href="/settings"><small>Settings</small></a>
                                <button class="link"><small>Log Out</small></button>
                                </div>
                                </div>
                                <div class="scroll-bar sm-hide" style={{opacity:"0"}}><div class="scroll-thumb" style={{height:"264.917px",top:"4.21992px"}}></div>
                                </div>
                                </div>
        </div>
    </div>
)}
{/* <iframe   /> */}

<FilterFunction  />

<Login
     showForm={showForm}
     formData1={this.state.formData1}
     formData={this.state.formData}
     handleClose={this.handleCloseForm}
     handleSubmit={this.handleSubmitForm}
     handleChange={this.handleChange}
     handleSubmit1={this.handleSubmitForm1}
     handleChange1={this.handleChange1}
/>

    </>
    )
  }
}



{/* <iframe
src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
width="300"
height="80"
frameBorder="0"
allowTransparency="true"
allow="encrypted-media"
title="SpotifyPlayer"></iframe> */}