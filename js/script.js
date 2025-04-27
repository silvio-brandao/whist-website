document.getElementById('design-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o comportamento padrão do formulário

  // Obtém os valores do formulário
  const tipo = e.target.tipo.value;
  const estilo = e.target.estilo.value;
  const cores = e.target.cores.value;

  // Cria o prompt para a API da OpenAI
  const prompt = `Crie um layout de site do tipo ${tipo}, com estilo ${estilo} e cores ${cores}. Gere o HTML e CSS básico.`;

  // Envia a requisição para o servidor
  const response = await fetch('/api/gpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  // Processa a resposta da API
  const data = await response.json();
  
  // Exibe o código gerado (opcional, apenas para visualização)
  document.getElementById('resultado').textContent = data.result; 

  // Renderiza o HTML gerado dentro do iframe
  const iframe = document.getElementById('preview');
  iframe.srcdoc = data.result; // Injecta o HTML no iframe
});
