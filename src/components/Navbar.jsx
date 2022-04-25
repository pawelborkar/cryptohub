import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
    FundOutlined,
    BulbOutlined,
    MenuOutlined,
    GithubOutlined,
} from "@ant-design/icons";
import "../App.css";
import ring from "../Images/ring.png";
import Footer from "./Footer";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="nav-top">
                <div className="logo-container">
                    <Avatar src={ring} />
                    <Typography.Title level={2} className="logo">
                        <Link to="/">CryptoHub</Link>
                    </Typography.Title>
                    <Button
                        className="menu-control-container"
                        onClick={() => setActiveMenu(!activeMenu)}
                    >
                        <MenuOutlined />
                    </Button>
                </div>
                {activeMenu && (
                    <Menu theme="dark">
                        <Menu.Item key={1} icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key={2} icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>

                        <Menu.Item key={3} icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                        <Menu.Item key={4} icon={<GithubOutlined />}>
                            <a
                                href="https://github.com/pawelborkar/cryptohub"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Source Code
                            </a>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
            <div className="nav-bottom">
                <Footer />
            </div>
        </div>
    );
};

export default Navbar;
