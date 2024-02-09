import './Footer.css'

import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footContainer">
                <div className="footRow">

                    <div className="footCol">
                        <h4>get help</h4>
                        <ul>
                            <li><Link to='/comingSoon'>shipping</Link></li>
                            <li><Link to='/comingSoon'>returns</Link></li>
                            <li><Link to='/comingSoon'>order status</Link></li>
                            <li><Link to='/comingSoon'>warranty</Link></li>
                            <li><Link to='/comingSoon'>peyment options</Link></li>
                        </ul>
                    </div>

                    <div className="footCol">
                        <h4>services</h4>
                        <ul>
                            <li><Link to={`/services/${`fogingSystems`}`} >fogging system</Link></li>
                            <li><Link to={`/services/${`dripSystems`}`}>drip system</Link></li>
                            <li><Link to={`/services/${`irrigationSystem`}`}>irrigation system</Link></li>
                            <li><Link to={`/services/${`waterPump`}`}>water pomp system</Link></li>
                            <li><Link to={`/services/${`waterTank`}`}>water tank</Link></li>
                            <li><Link to={`/services/${`excavationOperations`}`}>excavation operations</Link></li>
                        </ul>
                    </div>
                    <div className="footCol">
                        <h4>online shop</h4>
                        <ul>
                            <li><Link to='/shop/waterpumps'>waterpomps</Link></li>
                            <li><Link to='/shop/irigationSystems'>irrigation systems</Link></li>
                            <li><Link to='/shop/parts'>parts</Link></li>
                            <li><Link to='/shop/powerMachines'>power mashines</Link></li>
                            <li><Link to='/shop/pipes'>pipes</Link></li>
                            <li><Link to='/shop/tools'>tools</Link></li>
                        </ul>
                    </div>

                    <div className="footCol">
                        <h4>company</h4>
                        <div className="socialLinks">
                            <Link to="https://www.facebook.com/rainsystems" ><i className="fa-brands fa-facebook "></i></Link>
                            <Link to="#" ><i className="fa-solid fa-phone "></i></Link>
                            <Link to="#" ><i className="fa-solid fa-envelope-open-text "></i></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;