import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { image }: { image?: string } = req.body;

  if (!image) {
    res.status(400).json({ message: 'No image provided' });
    return;
  }

  try {
    const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Hacemos la petición al modelo
    const result = await model.generateContent([
      "Identify this plant and provide its name, common name, family, and basic care instructions.",
      { inlineData: { data: image, mimeType: "image/jpeg" } },
    ]);

   
    console.log('Result:', result);

    
    if (result?.response?.text) {
      const text: string = result.response.text();
      
    
      const [name, commonName, family, care]: (string | undefined)[] = text.split('\n').map(line => line.split(':')[1]?.trim());

      res.status(200).json({ name, commonName, family, care });
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error identifying plant:', error);
    res.status(500).json({ message: 'Error identifying plant' });
  }
}
