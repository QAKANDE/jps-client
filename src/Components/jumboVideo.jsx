import React, { Component } from 'react';


class jumboVideo extends Component {
    state = {  }
    render() { 
        return ( 
                 <div className="jumbotron jumbotron-fluid">
                <div className="video-embed">
                      <div class="container-placer">
    <div class="embed-container">
        <iframe src="https://fast.wistia.net/embed/iframe/j38ihh83m5?videoFoam=true&autoplay&endVideoBehavior=loop&muted=true" title="Wistia video player" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen ></iframe>
    </div>
</div>
                </div> 
                <div className="container text-white">
                    <h1 class="display-4">Wistia video Jumbotron Bootstrap 4</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
     </div>
         );
    }
}
 
export default jumboVideo;