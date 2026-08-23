import groq from "./groq.js"; 

const groqWithRetry = async (params, maxRetries = 3) => 
    {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try 
        {
            return await groq.chat.completions.create(params);
        } 
        catch (error) 
        {
            const isRateLimit = error.status === 429;
            const isLastAttempt = attempt === maxRetries;
 
            if (!isRateLimit || isLastAttempt) {
                throw error;
            }
 
            const waitTime = Math.pow(2, attempt) * 1000; // 1000ms, 2000ms, 4000ms...
            console.log(`Groq rate limit hit. Retrying in ${waitTime / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
    }
};
 
export default groqWithRetry;
 