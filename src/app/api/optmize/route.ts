// src/app/api/optimize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AIOptimizer } from '@/lib/ai-services';
import { ResumeParsers } from '@/lib/resume-parser';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        const parsedResume = await ResumeParsers.parsePDF(file);

        const openai = new AIOptimizer(process.env.OPENAI_API_KEY!);
        const optimizedResume = await openai.optimizeResume(
            parsedResume,
            jobDescription
        );

        return NextResponse.json(optimizedResume);
    } catch (error) {
        console.error('Optimization error:', error);
        return NextResponse.json(
            { error: 'Resume optimization failed' },
            { status: 500 }
        );
    }
}