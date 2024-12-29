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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {news.length > 0 ? (
                    news.map((article, index) => (
                       
                        <div
                            key={index}
                            className="bg-white border w-56 h-56 border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                        > <div>
                            {/* Image Section */}
                            <img
                                style={{ width: "220px", height: "auto" }} // Set image width to 220px and height auto
                                className="mx-auto mt-4 rounded mb-4"
                                src={article.urlToImage || "https://via.placeholder.com/220"}
                                alt={article.title}
                            />

                            {/* Text Content Section */}
                            <div className="flex flex-col space-y-2 px-4 py-4">
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
