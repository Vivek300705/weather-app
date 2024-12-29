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

        fetchNews(); // Call the fetchNews function to load news on mount
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Local News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white  rounded overflow-hidden shadow-lg w-[40%] h-auto object-cover mx-auto mt-4"
                        >
                            <img
                                className="w-[40%] h-auto object-cover mx-auto mt-4"
                                src={article.urlToImage || "https://via.placeholder.com/300"}
                                alt={article.title}
                            />
                            <div className="px-4 py-4">
                                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    {article.description || "No description available."}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">Loading news...</p>
                )}
            </div>
        </div>
    );
};

export default News;
