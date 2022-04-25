import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        key={currency.uuid}
                        className="crypto-card"
                    >
                        <Link
                            key={currency.uuid}
                            to={`/crypto/${currency.uuid}`}
                        >
                            <Card
                                style={{
                                    backgroundColor:'#fff',
                                    
                                    
                                }}
                                title={`${currency.rank}. ${currency.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        alt={`${currency.name}`}
                                        src={currency.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: $ {millify(currency.price)}</p>
                                <p>Symbol: {currency.symbol}</p>
                                <p>
                                    Market Cap: ${millify(currency.marketCap)}
                                </p>
                                <p>Total Supply Amount: {currency.supply}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
