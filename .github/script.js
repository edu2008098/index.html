{
       e.preventDefault();
       const nome = document.getElementById('nome').value;
       const data = document.getElementById('data').value;

       const resposta = await fetch('http://localhost:3000/agendar', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ nome, data })
       });

       if (resposta.ok) {
           alert('Agendamento realizado!');
           carregarAgendamentos();
       }
   });

   async function carregarAgendamentos() {
       const resposta = await fetch('http://localhost:3000/agendamentos');
       const agendamentos = await resposta.json();
       const lista = document.getElementById('lista-agendamentos');
       lista.innerHTML = '';
       agendamentos.forEach(a => {
           const item = document.createElement('li');
           item.textContent = `${a.nome} - ${new Date(a.data).toLocaleString()}`;
           lista.appendChild(item);
       });
   }

   carregarAgendamentos();