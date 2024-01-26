"use client";

import React, { useState } from "react";
import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumeTracker() {
  const [inputText, setInputText] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [strength, setStrength] = useState<string>("");
  const [atsScore, setAtsScore] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State for loader

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show loading text

    if (!inputText || !resumeFile) {
      alert("Please fill in all fields.");
      setLoading(false); // Hide loading text
      return;
    }

    // Reset previous result
    setStrength("");
    setAtsScore("");

    const formData = new FormData();
    formData.append("input_text", inputText);
    formData.append("uploaded_file", resumeFile);

    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      setStrength(data.strength);
      setAtsScore(data.ats_score);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Hide loading text after response or error
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Resume Evaluation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="inputText" className="mb-1 block font-fantasy">
              Input job discription:
            </label>
            <input
              type="text"
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="resumeFile" className="mb-1 block font-fantasy">
              Upload Resume (PDF):
            </label>
            <Input
              type="file"
              id="resumeFile"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="rounded-md border"
              accept=".pdf"
              required
            />
          </div>
          <Button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </Button>
        </form>
        {loading && <div className="mt-4 text-center ">Loading...</div>}
        <div id="result" className="mt-8">
          {strength && (
            <>
              <h2>Result:</h2>
              <p>
                <strong>Strength:</strong> {strength}
              </p>
              <p>
                <strong>ATS Score:</strong> {atsScore}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
