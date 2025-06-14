import OpenAI from 'openai';
const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req, res) {
  const { receta, pregunta } = req.body;
  const prompt = `Sobre la receta "${receta}": ${pregunta}`;
  const chat = await ai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{role:'system',content:'Eres experto culinario.'},{role:'user',content:prompt}],
  });
  res.status(200).json({ respuesta: chat.choices[0].message.content });
}
