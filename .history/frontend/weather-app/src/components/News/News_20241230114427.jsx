import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./news.css"; // CSS file for the news section

const News = ({ country }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles);
            } catch (err) {
                setError("Failed to fetch news.");
                console.error("Error fetching news:", err);
            }
        };

        fetchNews();
    }, [country]);

    return (
        <div className="news-container">
            <h3>Top News</h3>
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className="news-card">
                        <img
                            className="news-image"
                            src={article.urlToImage || "https://via.placeholder.com/220"}
                            alt={article.title}
                        />
                        <div className="news-text">
                            <h5 className="news-title">{article.title}</h5>
                            <p className="news-description">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading news...</p>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

News.propTypes = {
    country: PropTypes.string.isRequired,
};

export default News;
