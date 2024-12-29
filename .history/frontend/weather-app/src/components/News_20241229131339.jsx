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

        fetchNews();
    }, []);

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Local News</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 flex flex-col w-60"
                        >
                            {/* Image and Text in same div, stack vertically */}
                            <div className="flex flex-col items-center px-4 py-4">
                                {/* Image Section */}
                                <img
                                    style={{ width: "100px", height: "100px" }}
                                    className="object-cover mx-auto rounded mb-4"
                                    src={article.urlToImage || "https://via.placeholder.com/100"}
                                    alt={article.title}
                                />

                                {/* Text Content */}
                                <div className="flex flex-col space-y-2">
                                    <h3 className="font-semibold text-sm text-gray-800 mb-2">{article.title}</h3>
                                    <p className="text-gray-600 text-xs mb-4">
                                        {article.description || "No description available."}
                                    </p>
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
