# Love Coach AI Demo

> **⚠️ Important:** This demo requires your own Tavus personas to work. The default persona IDs are placeholders - you'll need to create your own personas on the Tavus Platform and update the IDs in the code. See the Prerequisites and Getting Started sections below for detailed steps.

## ❤️ Introduction

Welcome to the Love Coach AI Demo, a showcase of Tavus's Conversational Video Interface (CVI) technology! Try out a hosted version [here](https://demo-tavus-val.vercel.app/). (no API key required!)
This demo demonstrates how you can create empathetic, AI-powered relationship coaches using hyperrealistic, interactive video personas.

With this demo, you can:
- Experience real-time video interactions powered by Tavus CVI APIs
- Fork and customize the experience
- Use a new **Persona ID** or **Replica ID** to create your own AI coach or mentor

The Love Coach Demo stack includes:
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## ❤️ Prerequisites

1. Create an account on [Tavus Platform](https://platform.tavus.io/api-keys).
2. Generate an API token in your account settings.

<br></br>
## 🔧 Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Clone and Customize:**  
   Fork this repository and modify it to create your own unique AI coach persona. To personalize your experience:
   - Edit the **persona_id** in the `createConversation.ts` file to match your new persona. You can learn how to [create your own persona](https://docs.tavus.io/sections/conversational-video-interface/creating-a-persona) or persona replicas directly on the [Tavus Platform](https://platform.tavus.io/).
   - You can also create different types of coaches or mentors by swapping in your own personas.

   For example, to update the persona ID, locate the following snippet in `createConversation.ts`:

   ```typescript
   body: JSON.stringify({
     // Replace with your own Persona ID
     persona_id: "your_persona_id_here",
   }),
   ```

<br></br>
## 📚 Learn More About Tavus

- [Developer Documentation](https://docs.tavus.io/)
- [API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Daily React Reference](https://docs.daily.co/reference/daily-react)
