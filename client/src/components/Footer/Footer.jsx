import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footContainer">
                <div className="footRow">

                    <div className="footCol">
                        <h4>get help</h4>
                        <ul>
                            <li><Link to='#'>shipping</Link></li>
                            <li><Link to='#'>returns</Link></li>
                            <li><Link to='#'>order status</Link></li>
                            <li><Link to='#'>warranty</Link></li>
                            <li><Link to='#'>peyment options</Link></li>
                        </ul>
                    </div>

                    <div className="footCol">
                        <h4>services</h4>
                        <ul>
                            <li><Link to='#'>fogging system</Link></li>
                            <li><Link to='#'>drip system</Link></li>
                            <li><Link to='#'>irrigation system</Link></li>
                            <li><Link to='#'>water pomp system</Link></li>
                            <li><Link to='#'>water tank</Link></li>
                            <li><Link to='#'>excavation operations</Link></li>
                        </ul>
                    </div>
                    <div className="footCol">
                        <h4>online shop</h4>
                        <ul>
                            <li><Link to='#'>waterpomps</Link></li>
                            <li><Link to='#'>irrigation systems</Link></li>
                            <li><Link to='#'>parts</Link></li>
                            <li><Link to='#'>power mashines</Link></li>
                            <li><Link to='#'>pipes</Link></li>
                            <li><Link to='#'>tools</Link></li>
                        </ul>
                    </div>

                    <div className="footCol">
                        <h4>company</h4>
                        <div className="socialLinks">

                        <Link to="/abalt" ><i className="fa-solid fa-circle-info "></i></Link>
                        <Link to="https://rainsystems.eu/?fbclid=IwAR2BpFsMu5czvR8LLnkYrqjwHZwBSmv5CR_a7oWzOXZkK82OqBitf9ekfoU" ><i className="fa-solid fa-globe "></i></Link>
                        <Link to="https://www.facebook.com/rainsystems" ><i className="fa-brands fa-facebook "></i></Link>
                        <Link to="" ><i className="fa-solid fa-phone "></i></Link>
                        <Link to="" ><i className="fa-solid fa-envelope-open-text "></i></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer