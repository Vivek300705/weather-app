import { useState, useEffect } from "react";
import axios from "axios";
import "./"; // Import the CSS file

const News = () => {
    const [news, setNews] = useState([]); // Set to an array to hold all articles

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles); // Set all articles
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-container">
            <h2 className="news-title">Local News</h2>
            <div className="news-articles-container">
                <div className="news-articles">
                    {news.length > 0 ? (
                        news.map((article, index) => (
                            <div key={index} className="news-card">
                                {/* Image Section */}
                                <img
                                    className="news-image"
                                    src={article.urlToImage || "https://via.placeholder.com/220"}
                                    alt={article.title}
                                />

                                {/* Text Content Section */}
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
            </div>
        </div>
    );
};

export default News;
