"use client";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Home() {
  const [userName, setUserName] = useState<string>("");

  const data = {
    state: "",
    result: null,
  };

  const hasStarted = data?.state === "started" || data?.state === "created";

  return (
    <main className="container">
      <h1>GitHub README AI Generator</h1>
      <p>Let OpenAI generate a personalized GitHub Profile README for you</p>
      <div className="name">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input"
          placeholder="Enter your GitHub username"
          disabled={hasStarted}
        />
        <button
          onClick={() => {}}
          className="buttonPrimary"
          disabled={hasStarted}
        >
          {hasStarted ? "Generating ..." : "Generate"}
        </button>
      </div>
      {data && data.result && (
        <div className="result codeblock-container">
          <div className="codeblock-content">{data.result}</div>
        </div>
      )}
    </main>
  );
}
