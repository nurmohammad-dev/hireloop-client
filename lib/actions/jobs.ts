const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const CreateJob = async(data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(data)
    });
    return res.json();
}