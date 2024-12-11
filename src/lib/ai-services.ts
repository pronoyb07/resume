// src/lib/ai-services.ts
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ResumeData } from '../types/resume';

export class AIOptimizer {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async optimizeResume(
        resume: ResumeData,
        jobDescription: string
    ): Promise<ResumeData> {
        const messages: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: 'You are a professional resume optimizer. Enhance the resume to match the job description precisely.'
            },
            {
                role: 'user',
                content: `
          Job Description: ${jobDescription}
          Current Resume: ${JSON.stringify(resume)}
          
          Please:
          1. Align skills with job requirements
          2. Enhance experience descriptions
          3. Highlight most relevant achievements
          4. Optimize resume structure
        `
            }
        ];

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages,
            response_format: { type: 'json_object' }
        });

        return JSON.parse(
            response.choices[0].message.content || '{}'
        ) as ResumeData;
    }
}