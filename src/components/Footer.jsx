import { Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Footer = () => {
    return (
        <div className="footer">
            <p style={{ color: "grey" }}>&copy;2022 CryptoHub</p>
            <p style={{ color: "grey" }}> Made with 💖 by Pawel Borkar</p>
            <Space>
                <Link to="/">Home</Link>
                <Link to="/news">News</Link>
                <a
                    href="https://github.com/pawelborkar/cryptohub"
                    target="_blank"
                    rel="noreferrer"
                >
                    Source Code
                </a>
            </Space>
        </div>
    );
};

export default Footer;
