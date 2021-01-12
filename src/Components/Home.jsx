import React, { Component } from 'react';
import NavSocialMedia from "./NavSocialMedia"
import Jumbo from "./Jumbo"

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <NavSocialMedia />
                <Jumbo/>
            </div>
         );
    }
}
 
export default Home;