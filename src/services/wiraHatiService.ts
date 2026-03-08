interface ActionResponse {
  activityName: string;
  videoId?: string;
  error?: boolean;
  fallbackMessage?: string;
  displayMessage?: string;
  actionLink?: string;
}

const MOCK_DB = [
  { keywords: ['anger', 'mad', 'frustrated', 'stress', 'angry'], activity: 'High-Intensity Boxing', videoId: 'jD1yE8E6QxU' },
  { keywords: ['sad', 'down', 'depressed', 'crying'], activity: 'Gentle Yin Yoga', videoId: 'v7AYKMP6rOE' },
  { keywords: ['anxious', 'nervous', 'panic', 'worry'], activity: 'Calming Breathwork', videoId: 'aNXKjGFUlMs' },
  { keywords: ['tired', 'sluggish', 'lazy', 'exhausted'], activity: 'Energizing Morning Flow', videoId: '4pKly2JojMw' },
];

export async function getActionSuggestion(userText: string): Promise<ActionResponse> {
  // Use your unified API URL from the .env file
  const rawApiUrl = import.meta.env.VITE_WIRAHATI_API_URL;
  const apiKey = import.meta.env.VITE_WIRAHATI_API_KEY;

  // Prototype Mode: If the unified API URL is missing or still the placeholder, use the mock database
  if (!rawApiUrl || rawApiUrl.includes('your-backend.com')) {
    console.log("Using Mock Database (Missing or Placeholder VITE_WIRAHATI_API_URL)");
    const lowerText = userText.toLowerCase();
    const match = MOCK_DB.find(item => item.keywords.some(kw => lowerText.includes(kw)));
    
    if (match) {
      return { activityName: match.activity, videoId: match.videoId };
    }
    return { activityName: 'Light Stretching', videoId: 'g_tea8ZNk5A' }; // Default mock
  }

  // In development, we use the local Vite proxy to completely bypass CORS errors.
  // In production, it will call your API directly (which will require CORS headers on your server).
  const apiUrl = import.meta.env.DEV ? '/api/proxy' : rawApiUrl;

  // Production Mode: Single API Call
  try {
    // STEP 1: Call your unified backend API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your custom authorization header here if your API requires it
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
      },
      // Send the user's raw text to your backend
      body: JSON.stringify({
        message: userText 
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Response:", data);
    
    // STEP 2: Extract the activity name and video ID from your backend's response
    // Handle the specific structure: { data: { recommendation: { search_phrase, action_link, display_message } } }
    const recommendation = data?.data?.recommendation;
    
    const activityName = recommendation?.search_phrase || data.activityName || data.activity || data.query || data.suggestedActivity || data.name;
    const videoId = data.videoId || data.youtubeId || data.video || data.url;
    const displayMessage = recommendation?.display_message;
    const actionLink = recommendation?.action_link;
    
    if (!activityName && !displayMessage) {
      console.error("Failed to extract activity name. Received data:", data);
      throw new Error(`Failed to extract activity name from API response. Received: ${JSON.stringify(data)}`);
    }

    return { 
      activityName: activityName || "suggested activity", 
      videoId,
      displayMessage,
      actionLink
    };

  } catch (error: any) {
    console.error("API Error:", error);
    
    let fallbackMessage = "I'm having trouble connecting to my resources, but I still suggest taking 5 deep breaths.";
    
    // Specifically handle the common "Failed to fetch" browser error
    if (error.message === 'Failed to fetch') {
      fallbackMessage = "I couldn't reach the API. This usually happens if the API URL is incorrect, the server is down, or the server is missing CORS (Cross-Origin Resource Sharing) headers.";
    }

    return {
      activityName: "5 deep breaths",
      error: true,
      fallbackMessage
    };
  }
}
