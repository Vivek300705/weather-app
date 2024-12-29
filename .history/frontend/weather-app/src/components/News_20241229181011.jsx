import { useState, useEffect } from "react";
import axios from "axios";

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
        <div className="p-20 bg-gray-100"> {/* Applied 5x padding (20 in Tailwind is equivalent to 5rem) */}
            <h2 className="text-2xl font-semibold mb-10 text-center">Local News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            {/* Image Section */}
                            <img
                                className="rounded-t-lg w-full h-56 object-cover"
                                src={article.urlToImage || "https://via.placeholder.com/220"}
                                alt={article.title}
                            />

                            {/* Text Content Section */}
                            <div className="p-5">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {article.title || "No Title Available"}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
                    <p className="text-gray-500 text-center">Loading news...</p>
                )}
            </div>
        </div>
    );
};

export default News;
