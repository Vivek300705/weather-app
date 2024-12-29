import axios from "axios"

export function News(){
            axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY")
           .then(response => {
             console.log(response.data.articles);
             // Display news articles here
            })
           .catch(error => {
             console.error("Error fetching news: ", error);
            });
}