import  { useState } from "react";
import Weather from "./weather";

const Dashboard = () => {
    const [location] = useState("New York"); // Remove 'setLocation' since it's unused

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {/* Pass the location prop */}
            <Weather location={location} />
        </div>
    );
};

export default Dashboard;
