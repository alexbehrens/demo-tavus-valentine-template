import { IConversation } from "@/types";

export const createConversation = async (): Promise<IConversation> => {
  // Get token from localStorage instead of env
  const token = localStorage.getItem('tavus-token') || '';
  
  // Add this debug log
  console.log('API Key available:', !!token);
  
  // Get settings directly from localStorage
  const savedSettings = localStorage.getItem('tavus-settings');
  const settings = savedSettings ? JSON.parse(savedSettings) : {};
  
  // Build the context string
  let contextString = settings.conversational_context || "";
  
  const payload = {
    persona_id: settings.persona_id || "pa97785bb355", // Use persona_id from settings
    custom_greeting: settings.greeting || "Hi there! I'm your AI relationship coach. I'm here to help you navigate the complexities of love and relationships.",
    conversational_context: contextString
  };
  
  console.log('Sending payload to API:', payload);
  
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token || "", // Use token from localStorage
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};