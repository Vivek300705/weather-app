import { useState, useEffect } from "react";
import axios from "axios";

const News = ({ location }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=${location}&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        if (location) fetchNews();
    }, [location]);

    return (
        <div className="p-4 bg-green-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-2">Local News</h2>
            {news.map((article, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-medium">{article.title}</h3>
                    <p className="text-gray-700">{article.description}</p>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Read more
                    </a>
                </div>
            ))}
        </div>
    );
};

export default News;
