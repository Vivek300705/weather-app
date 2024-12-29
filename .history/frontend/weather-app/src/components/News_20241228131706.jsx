import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=India&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();  // Call the fetchNews function to load news on mount
    }, []);  // Empty dependency array to run only once on mount

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Local News</h2>
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                        <p className="text-gray-700 mb-2">{article.description}</p>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Read more
                        </a>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Loading news...</p>
            )}
        </div>
    );
};

export default News; // Default export
