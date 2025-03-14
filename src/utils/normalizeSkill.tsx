export const normalizeSkill = async (skill: string[]): Promise<string[]> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: `Padronize esta skill: ${skill}` }],
      temperature: 0.5
    })
  });

  const data = await response.json();
  console.log(data);
  return data.choices[0].message.content.trim();
}
