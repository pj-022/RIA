import { MDBFooter } from "mdbreact";
import React from "react";
import "./Footer.css";
import logo from "../../images/RIA-logos_transparent.png"

// react icons import here
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillGooglePlusCircle,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillGithub,
  AiFillPhone,
} from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { SiRevolut } from "react-icons/si";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-start text-muted footerbg">
      <section className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom footerHead">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="socialLogo">
          <a href="https://www.faceook.com" className=" text-reset">
            <AiFillFacebook />
          </a>
          <a href="https://www.twitter.com" className="text-reset">
            <AiFillTwitterCircle />
          </a>
          <a href="https://www.gmail.com" className="text-reset">
            <AiFillGooglePlusCircle />
          </a>
          <a href="https://www.instagram.com" className="text-reset">
            <AiFillInstagram />
          </a>
          <a href="https://www.linkedin.com/in/pj022" className="text-reset">
            <AiFillLinkedin />
          </a>
          <a href="https://github.com/pj-022" className="text-reset">
            <AiFillGithub />
          </a>
        </div>
      </section>

      <section className="footerBody">
        <div className="container text-md-left mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
              <h6 className=" fw-bold">
                {/* <SiRevolut style={{ width: 65, height: 40 }} /> */}
                <img src={logo} style={{height: "110px", width: "110px"}}/>
                RIA Inc.
              </h6>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
              <h6 className="text-uppercase fw-bold mb-2">Tech Used</h6>
              <p>
                <a href="https://reactjs.org/" className="text-reset">
                  ReactJS
                </a>
              </p>
              <p>
                <a href="https://www.mongodb.com/" className="text-reset">
                  MongoDB
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
              <h6 className="text-uppercase fw-bold mb-2">Terms & Policies</h6>
              <p>
                <a className="text-reset">
                  Privacy Policies
                </a>
              </p>
              <p>
                <a className="text-reset">
                  Terms of Service
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
              <h6 className="text-uppercase fw-bold mb-2">Contact</h6>
              <p>
                <FaRegEnvelope /> piyushjha524@gmail.com
              </p>
              <p>
                <AiFillPhone /> +91 798 457 9282
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright :  
        <a className="text-reset fw-bold">
          RightInternetApp@BloggInc
        </a>
      </div>
    </MDBFooter>
  );
}
