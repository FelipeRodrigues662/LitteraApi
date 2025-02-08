const https = require('https');
const preferencias = require('./PreferenciasController.js');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1";

exports.postPrompt = async (req, res) => {
    try {
        const userId = req.user.id;
        const generos = await preferencias.getPreferenciasPrompt(userId);
        const generosFormatados = generos || "qualquer gênero";

        const prompt = `Haja como um bibliotecário especializado e recomende 10 livros baseados nos seguintes gêneros: ${generosFormatados}.  
        Forneça a resposta no formato JSON, garantindo que cada recomendação inclua:  
        - "titulo": O nome do livro  
        - "descricao": Um breve resumo explicando por que o usuário deve ler esse livro  
        Responda apenas com o JSON, sem explicações adicionais.  
        `;

        const data = JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: prompt }]
        });

        const url = new URL(`${BASE_URL}/chat/completions`);

        const options = {
            hostname: url.hostname,
            port: 443,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const request = https.request(options, (response) => {
            let responseData = '';

            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    let content = parsedData.choices?.[0]?.message?.content || '{}';

                    content = content.replace(/```json\n?/g, "").replace(/```/g, "").trim();

                    res.json(JSON.parse(content));
                } catch (error) {
                    console.error('JSON Parse Error:', error);
                    res.status(500).json({ error: 'Erro ao processar a resposta da API externa' });
                }
            });
        });

        request.on('error', (error) => {
            console.error('Request Error:', error);
            res.status(502).json({ error: 'Erro ao se comunicar com a API externa' });
        });

        request.setTimeout(200000, () => {
            console.error('Request timeout');
            request.abort();
            res.status(504).json({ error: 'Tempo limite excedido na requisição' });
        });

        request.write(data);
        request.end();

    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
