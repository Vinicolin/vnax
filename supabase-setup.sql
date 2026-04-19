-- Tabelas para o site VNAX Seguros
-- Execute este SQL no Supabase Dashboard > SQL Editor

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS contatos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  assunto TEXT,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de cotações
CREATE TABLE IF NOT EXISTS cotacoes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  tipo TEXT NOT NULL,
  mensagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotacoes ENABLE ROW LEVEL SECURITY;

-- Permissão de inserção pública (para o site)
CREATE POLICY "Permitir inserção pública em contatos" ON contatos
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Permitir inserção pública em cotacoes" ON cotacoes
  FOR INSERT TO anon
  WITH CHECK (true);

-- Permissão de leitura apenas para autenticados (opcional)
CREATE POLICY "Leitura contatos apenas autenticado" ON contatos
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Leitura cotacoes apenas autenticado" ON cotacoes
  FOR SELECT TO authenticated
  USING (true);