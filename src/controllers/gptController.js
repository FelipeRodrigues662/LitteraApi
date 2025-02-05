const https = require('https');
const preferencias = require('./PreferenciasController.js');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1";

exports.postPrompt = async (req, res) => {
    try {
        const userId = req.user.id;

        const generos = await preferencias.getPreferenciasPrompt(userId);
        const generosFormatados = generos || "qualquer gênero"; 

        const prompt = 
        `Haja como um bibliotecário especializado e recomende 10 livros baseados nos seguintes gêneros: ${generosFormatados}.  
        Forneça a resposta no formato JSON, garantindo que cada recomendação inclua:  

        - "titulo": O nome do livro  
        - "descricao": Um breve resumo explicando por que o usuário deve ler esse livro  
        - "capa_url": Um link para uma imagem da capa do livro  

        Responda apenas com o JSON, sem explicações adicionais.  

        Exemplo de formato esperado:  


            {
                "titulo": "Nome do Livro",
                "descricao": "Uma breve explicação do motivo pelo qual o livro é uma ótima leitura.",
                "capa_url": "URL da imagem da capa"
            },

        
        Retorne somente o JSON sem barra 'n'
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
                'Content-Length': data.length
            }
        };

        const request = https.request(options, (response) => {
            let responseData = '';

            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                const parsedData = JSON.parse(responseData);
                const cleanMessage = parsedData.choices[0].message.content;
                res.json({ message: cleanMessage });
            });            
        });

        request.on('error', (error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        request.write(data);
        request.end();

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};