const SUPABASE_URL = 'https://snlplzwemcvrjewfcdax.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zdDzxx8SBZhITAloKpO7gg_on1JDMzO';

async function submitToSupabase(table, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const contatoForm = document.querySelector('form[action="#"]');
  if (!contatoForm) return;

  const isContato = contatoForm.querySelector('#assunto') !== null;
  const isCotacao = contatoForm.querySelector('#tipo') !== null;

  if (!isContato && !isCotacao) return;

  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contatoForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const formData = new FormData(contatoForm);
    const data = Object.fromEntries(formData.entries());

    try {
      if (isContato) {
        await submitToSupabase('contatos', data);
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      } else if (isCotacao) {
        await submitToSupabase('cotacoes', data);
        alert('Cotação solicitada com sucesso! Em breve entraremos em contato.');
      }
      contatoForm.reset();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar. Tente novamente ou entre em contato por telefone.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
});