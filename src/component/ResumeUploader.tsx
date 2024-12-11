// src/app/components/ResumeUploader.tsx
'use client';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ResumeUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        }
    });

    const handleOptimize = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await fetch('/api/optimize', {
                method: 'POST',
                body: formData
            });
            const optimizedResume = await response.json();
            // Handle optimized resume
        } catch (error) {
            console.error('Optimization failed', error);
        }
    };

    return (
        <div>
            <div
                {...getRootProps()}
                className="border-2 border-dashed p-4 text-center"
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop resume, or click to select</p>
            </div>
            <textarea
                placeholder="Paste job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
            <button onClick={handleOptimize}>Optimize Resume</button>
        </div>
    );
}