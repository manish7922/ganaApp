import React, { Component } from 'react'
import "../style/filter.css"
export default class FilterFunction extends Component {
  render() {
    return (
      <div className='wrapper'>
        <section class="lg_filter bbStyle">
            <div class="_a">
                <a class="link selected" href="/home"><small>All</small></a>
                <a class="link" href="/songs"><small>Trending Songs</small></a>
                <a class="link" href="/newrelease"><small>New Songs</small></a>
                <a class="link" href="/old-songs"><small>Old Songs</small></a>
                <button class="link sublink" aria-label="submenu"><small>Moods &amp; Genres <svg width="10" height="17" viewBox="0 0 10 17"><path class="svg_color" fill="#000" fill-rule="evenodd" d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"></path></svg></small>
                <div class="drop"><div class="scrollhost-container">
                    <div id="scrollpad" class="scrollhost undefined">
                        <a href="/occasion/party">Party</a><a href="/occasion/romance">Romance</a>
                        <a href="/occasion/90searly2000s">90s &amp; 2000s</a>
                        <a href="/occasion/devotional">Bhakti</a>
                        <a href="/occasion/indie">Indie</a>
                        <a href="/occasion/edm">EDM</a>
                        <a href="/occasion/ghazals">Ghazals</a>
                        <a href="/occasion/workout">Workout</a>
                        <a href="/occasion/stars">Stars</a>
                        <a href="/occasion/retroacrossdecades">Retro</a>
                        <a href="/occasion/wedding1">Wedding</a>
                        <a href="/occasion/kids">Kids</a>
                        <a href="/occasion/dance">Dance</a>
                        <a href="/occasion/friendshipday">Friendship</a>
                        </div>
                        <div class="scroll-bar sm-hide" style={{opacity:"0"}}><div class="scroll-thumb" style={{height:"224.224px",top:"0px"}}>
                            </div>
                            </div>
                            </div>
                            </div>
                            </button>
                            <a class="link" href="/album"><small>Album</small></a>
                            <a class="link" href="/radio"><small>Radio</small></a>
                            <a class="link" href="/podcast"><small>Podcast</small></a>
                            <a class="link" href="/music"><small>My Music</small></a>
                            </div>
        </section>
        </div>
    )
  }
}
