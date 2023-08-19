import React, { Component } from 'react'
import "../style/banner.css"
export default class Banner extends Component {
    state={
        activeSlideIndex: 0,
        slides:["https://a10.gaanacdn.com/gn_img/showcase/ZaP37OR3Dy/aP37jVBKDy/size_m_1633948869.webp","https://a10.gaanacdn.com/gn_img/showcase/XYybzrb2gz/YybzgzmK2g/size_s_1684485419.webp",
    "https://a10.gaanacdn.com/images/showcase/1691397373_13935.jpg","https://a10.gaanacdn.com/images/showcase/1631860600_13323.jpg",
"https://a10.gaanacdn.com/images/showcase/1640488725_13508.jpg","https://a10.gaanacdn.com/gn_img/showcase/BZgWoOW2d9/ZgWonrr32d/size_m_1690188028.webp","https://a10.gaanacdn.com/images/showcase/1691142830_13911.jpg"],

    }
    handlePrevClick = () => {
        this.setState(prevState => ({
          activeSlideIndex: (prevState.activeSlideIndex - 1 + this.state.slides.length) % this.state.slides.length,
        }));
      };
    
      handleNextClick = () => {
        this.setState(prevState => ({
          activeSlideIndex: (prevState.activeSlideIndex + 1) % this.state.slides.length,
        }));
      };
  render() {
    const {slides}=this.state
    const numberOfSlides = slides.length;
    return (
        <section className="banner_carousel">
        <ul id="banner_carousel" className="inner animate">
          {slides.map((slide, index) => (
            <li
              key={index}
              className={`slide animate ${index === this.state.activeSlideIndex ? 'active' : ''}`}
              style={{  transform: `translateX(${291 * (index - this.state.activeSlideIndex)}px)`,
                // transform: `translateX(${100 * (index - this.state.activeSlideIndex)}%)`,
              opacity: index === this.state.activeSlideIndex ? 1 : 0.6, }}
            >
                <a className='_a default_bg'>
                 <img src={slide} alt="Banner Image" />
                 </a>
            </li>
          ))}
        </ul>
        <div className="controls">
          <button title='Previous' className="_lt sm-hide" onClick={this.handlePrevClick}>
          <svg width="10" height="17" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg>
          </button>
          <button title='Next' className="_rt sm-hide" onClick={this.handleNextClick}>
          <svg width="10" height="17" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg>
          </button>
        </div>
      </section>

    )
  }
}
