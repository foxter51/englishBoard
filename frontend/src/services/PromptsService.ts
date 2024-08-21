type PromptType = 'words' | 'description' | 'transcription'

class PromptsService {
    getPrompt(promptType: PromptType, word?: string): string {
        switch (promptType) {
            case 'description':
                return `What is the description of word: ${word}?. Response length is limited.
                It should be from 1 to 512 symbols.`
            case 'transcription':
                return `What is the transcription of word: ${word}? The response should be from 1 to 32
                symbols in such format [transcription].`
            case 'words':
                return `List 5 random useful words to learn. Each word should be from 1 to 32 symbols.
                Each word has description and transcription. The description should be from 1 to 512 symbols.
                The transcription should be from 1 to 32 symbols in such format [transcription]. The whole
                response should be an array of {word, description, transcription} in JSON format.`
            default:
                return ''
        }
    }
}

export default new PromptsService()