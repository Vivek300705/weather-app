import { useState, useEffect } from "react";
import axios from "axios";
import "./news.css"; // Import the CSS file

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
    }, []); // Empty array ensures it only runs once when the component mounts

    return (
        <div className="news-container">
            <div className="news-articles-container">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div
                            key={index}
                            className="news-card"
                        >
                            {/* Image Section */}
                            <img
                                className="rounded-t-lg"
                                src={article.urlToImage || "https://via.placeholder.com/220"}
                                alt={article.title}
                            />

                            {/* Text Content Section */}
                            <div className="content">
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
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    );
};

export default News;
