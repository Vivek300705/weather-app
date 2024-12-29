import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();  // Call the fetchNews function to load news on mount
    }, []);  // Empty dependency array to run only once on mount

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2 className="text-2xl font-semibold mb-4 col-span-full">Local News</h2>
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-xl rounded-lg overflow-hidden w-50 h-50 mx-auto flex flex-col"
                    >
                        <div className="flex w-12 h-12">
                            <img
                                src={article.urlToImage || "https://via.placeholder.com/50"}
                                alt={article.title}
                                className="w-12 h-12 object-cover"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm font-medium text-gray-800">{article.title}</h3>
                            <p className="text-xs text-gray-600 my-2">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-xs"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Loading news...</p>
            )}
        </div>
    );
};

export default News;
