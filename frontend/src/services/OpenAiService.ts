import OpenAi from 'openai'
import PromptsService from './PromptsService'

class OpenAiService {
    private openai: OpenAi

    constructor() {
        this.openai = new OpenAi({ apiKey: import.meta.env.OPENAI_API_KEY })
    }

    async getResponse(prompt: ReturnType<typeof PromptsService.getPrompt>): Promise<string | null> {
        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        })
        return completion.choices[0].message.content
    }
}

export default new OpenAiService()