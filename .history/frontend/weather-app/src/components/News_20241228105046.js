import axios from "axios"

export function News(){
    axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=285a0a0a4990450f912b15b90e783319")
           .then(response => {
             console.log(response.data.articles);
             // Display news articles here
            })
           .catch(error => {
             console.error("Error fetching news: ", error);
            });
            return(
                <div>
                    News goes here
                </div>
             );
}