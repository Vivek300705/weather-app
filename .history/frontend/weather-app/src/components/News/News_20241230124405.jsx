import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./news.css"; // Import the CSS file

const News = () => {
    const [news, setNews] = useState([]); // To store articles
    const [visibleNews, setVisibleNews] = useState(10); // Initially show 10 news articles

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles); // Set all fetched articles
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    const loadMoreNews = () => {
        setVisibleNews((prev) => prev + 10); // Load 10 more news articles
    };

    return (
        <div className="news-container">
            <div className="news-articles">
                {news.length > 0 ? (
                    news.slice(0, visibleNews).map((article, index) => (
                        <div key={index} className="news-card">
                            {/* Image Section */}
                            <img
                                className="news-image"
                                src={article.urlToImage || "https://via.placeholder.com/220?text=No+Image"}
                                alt={article.title}
                            />

                            {/* Content Section */}
                            <div className="news-text-content">
                                <h5 className="news-card-title">
                                    {article.title || "No Title Available"}
                                </h5>
                                <p className="news-card-description">
                                    {article.description || "No description available."}
                                </p>
                                <a
                                    href={article.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="news-read-more"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading news...</p>
                )}
            </div>

            {news.length > visibleNews && (
                <div className="load-more-button">
                    <button onClick={loadMoreNews}>Load More</button>
                </div>
            )}
        </div>
    );
};

News.propTypes = {
    coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};

export default News;
