const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

 export const getJobs = async () => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "GET",
        headers: {  
            "Content-Type": "application/json",
        },
    });
    return res.json();
}