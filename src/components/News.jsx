import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Avatar from "antd/lib/avatar/avatar";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 8 : 12,
    });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return <Loader />;
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Search a crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                            <Option key={coin.symbol} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title level={4} className="news-title">
                                    {news.name.length >= 50
                                        ? `${news.name.substring(0, 50)}...`
                                        : news.name}
                                </Title>
                                <img
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "100px",
                                        borderRadius: "50%",
                                    }}
                                    src={news?.image?.thumbnail?.contentUrl}
                                    alt={news.name.slice(0, 10)}
                                />
                            </div>
                            <p>
                                {news.description.length > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl
                                        }
                                        alt="news-channel-image"
                                    />
                                    <Text className="provider-name">
                                        {news.provider[0]?.name}
                                    </Text>
                                </div>

                                <Text>
                                    {moment(news.datePublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
