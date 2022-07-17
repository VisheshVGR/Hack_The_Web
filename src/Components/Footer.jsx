import React from "react"
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <footer className=" bg-primary">
                <Container fluid="xxl" className="p-5 d-flex flex-column justify-content-center align-items-center">
                    <div className="wrapper">
                        {/* <div className="button-social" onClick={() => window.open("https://www.instagram.com/vishesh22_17/")}>
                            <div className="icon">
                                <i className="fab fa-instagram"></i>
                            </div>
                            <span>Instagram</span>
                        </div>

                        <div className="button-social" onClick={() => window.open("https://www.linkedin.com/in/vishesh-vgr/")}>
                            <div className="icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <span>Linkedin</span>
                        </div> */}

                        <div className="button-social" onClick={() => window.open("https://github.com/VisheshVGR/Hack_The_Web")}>
                            <div className="icon">
                                <i className="fab fa-github"></i>
                            </div>
                            <span>Github</span>
                        </div>
                    </div>

                    <p className="text-white pt-4 text-center">
                        <i className="fas fa-code"></i> Hack The Web<br />2022 &#169; All Rights Reserved.
                    </p>
                </Container>
            </footer>
        </>
    )
}

export default Footer