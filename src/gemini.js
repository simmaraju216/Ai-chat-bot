const Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBzMQFpOYk9I8Y4Bsws8wKfo7LtGfXrYyw";

export async function genarateResponse(prompt) {
  try {
    const response = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.candidates || !data.candidates.length) {
      console.error("Gemini API error:", data);
      return "⚠️ AI did not return a response.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Network error:", err);
    return "⚠️ Network error.";
  }
}
