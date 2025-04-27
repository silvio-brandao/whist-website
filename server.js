import express from 'express';
import fetch from 'node-fetch'; // Agora usamos import para trazer o fetch
import dotenv from 'dotenv';

dotenv.config(); // carrega variáveis do .env

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos

app.use('/css', express.static('css'));  // Serve arquivos CSS
app.use('/js', express.static('js'));   // Serve arquivos JS
app.use('/assets', express.static('assets'));  // Serve arquivos da pasta 'assets'

app.post('/api/gpt', async (req, res) => {
  const prompt = req.body.prompt;

  // A chave da API deve ser acessada através de process.env
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // Verifique se a chave da API foi carregada corretamente
  if (!openaiApiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    // Verificar se a requisição foi bem-sucedida
    if (!openaiRes.ok) {
      const errorResponse = await openaiRes.json();  // Ler o conteúdo da resposta de erro
      console.error(`Erro na requisição para OpenAI: ${openaiRes.status} - ${openaiRes.statusText}`);
      console.error('Resposta de erro:', errorResponse);  // Loga a resposta de erro completa da OpenAI
      return res.status(openaiRes.status).json({ error: errorResponse });
    }

    const json = await openaiRes.json();
    console.log('Resposta da OpenAI:', json);

    if (!json.choices || json.choices.length === 0) {
      console.error('Erro: Resposta da OpenAI não contém a chave "choices"');
      return res.status(500).json({ error: 'Resposta inválida da OpenAI: choices não encontrado' });
    }
    
    const result = json.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error('Erro ao fazer a requisição para a OpenAI:', error);
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
