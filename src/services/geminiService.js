import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt = "Gere uma descrição em pt-br para a seguinte imagem. Não gere nenhuma mensagem adicional além da própria descrição para não atrapalhar a visualização.";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text não está disponível.";
    } catch(erro) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        throw new Error("Erro ao obter alt-text do Gemini.");
    }
}