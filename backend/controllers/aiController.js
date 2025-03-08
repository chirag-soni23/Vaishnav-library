import generateContent from "../services/ai.service.js";

async function chat(req,res){
    try {
        const { prompt } = req.body;
        if(!prompt){
            return res.status(400).json({error:"Prompt is required!"});
        }

        const generatedResponse = await generateContent(prompt);

        res.status(200).json({
            success: true,
            response: generatedResponse
        });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            success: false,
            error: "There was an error processing your request."
        });
        
    }
}

export default chat;