import React, { Component } from 'react';
import Jumbo from "./Jumbo"
import Products from "./Products"

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
               
                {/* <Jumbo /> */}
                <Products/>
            </div>
         );
    }
}
 
export default Home;