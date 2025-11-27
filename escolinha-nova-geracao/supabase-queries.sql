-- =====================================================
-- MIGRATION SCRIPT - ESCOLINHA NOVA GERAÇÃO
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1️⃣ CRIAR TABELA: admin_users
CREATE TABLE public.admin_users (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT admin_users_pkey PRIMARY KEY (id),
    CONSTRAINT admin_users_username_key UNIQUE (username)
);

-- 2️⃣ CRIAR TABELA: alunos
CREATE TABLE public.alunos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT alunos_pkey PRIMARY KEY (id)
);

-- 3️⃣ CRIAR TABELA: chamadas
CREATE TABLE public.chamadas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT chamadas_pkey PRIMARY KEY (id)
);

-- 4️⃣ CRIAR TABELA: inscricoes
CREATE TABLE public.inscricoes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome_aluno text NOT NULL,
    sobrenome_aluno text NOT NULL,
    idade_aluno integer NOT NULL,
    nome_responsavel1 text NOT NULL,
    sobrenome_responsavel1 text NOT NULL,
    whatsapp_responsavel1 text NOT NULL,
    relacionamento_responsavel1 text NOT NULL,
    nome_responsavel2 text,
    sobrenome_responsavel2 text,
    whatsapp_responsavel2 text,
    relacionamento_responsavel2 text,
    mesmo_endereco boolean DEFAULT true NOT NULL,
    endereco_aluno_rua text NOT NULL,
    endereco_aluno_numero text NOT NULL,
    endereco_aluno_complemento text,
    endereco_aluno_bairro text NOT NULL,
    endereco_responsavel_rua text,
    endereco_responsavel_numero text,
    endereco_responsavel_complemento text,
    endereco_responsavel_bairro text,
    status text DEFAULT 'pending'::text NOT NULL,
    CONSTRAINT inscricoes_pkey PRIMARY KEY (id)
);

-- 5️⃣ CRIAR TABELA: presencas
CREATE TABLE public.presencas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_aluno uuid NOT NULL,
    id_chamada uuid NOT NULL,
    status character varying(20) NOT NULL,
    justificativa text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    chamada_id uuid NOT NULL,
    CONSTRAINT presencas_pkey PRIMARY KEY (id),
    CONSTRAINT presencas_id_aluno_id_chamada_key UNIQUE (id_aluno, id_chamada),
    CONSTRAINT presencas_status_check CHECK (status::text = ANY (ARRAY['presente'::character varying, 'falta'::character varying, 'justificada'::character varying]::text[])),
    CONSTRAINT presencas_chamada_id_fkey FOREIGN KEY (chamada_id) REFERENCES public.chamadas(id) ON DELETE CASCADE,
    CONSTRAINT presencas_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES public.alunos(id),
    CONSTRAINT presencas_id_chamada_fkey FOREIGN KEY (id_chamada) REFERENCES public.chamadas(id)
);

-- 6️⃣ INSERIR USUÁRIO ADMIN
INSERT INTO public.admin_users (id, username, password, created_at, updated_at) 
VALUES ('7beece69-e69a-479c-9b5d-d328518b102f', 'icnv', '1234', '2025-06-14 00:37:27.674017+00', '2025-06-14 00:37:27.674017+00');

-- 7️⃣ INSERIR ALUNOS
INSERT INTO public.alunos (id, nome, created_at, updated_at) VALUES
('16b0d1af-cedf-4845-b739-473346d96b9e', 'Andreas Santos', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('3e37fb86-64bd-4ab8-b0e4-6bdef38dd4db', 'Andrew Santos', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('07d23d98-caef-4c58-bda6-360fce872e99', 'Arthur Henrique', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('82c3ff66-0d27-40b8-924b-bec17882ebcc', 'Bernardo Nascimento', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('23bdef55-edcb-46f1-a20b-fe03ff5caa31', 'Daniel Cardoso de Melo', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('399205e4-1466-488a-a03d-1c7cb8691c2a', 'Danilo Pereira', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('069d0be4-16a3-458c-888f-76e30de158cb', 'Davi Leandro', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('bd9bfc6d-6475-4314-a474-a69c48639ee1', 'Francisco Carlos', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('6bb47c0d-b265-4d02-864f-1431f2023457', 'Gabriel Alexandre Pereira', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('b2ca2345-bb47-47a9-ab43-4b766d2a4255', 'Gabriel da Silva', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('bdd9a877-ae4a-49e6-a6b2-33139cdd284c', 'Gabriel da Silva Fonseca', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('f7135829-6185-447d-83f4-998e5ae14ac6', 'Gustavo Gabriel A. Lacerda', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('b8c7b8bd-734c-44cd-93c9-9e77feb596ad', 'Heitor dos Santos', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('f5495b58-6d76-4797-9425-30b4cd7971cb', 'João Gabriel', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('eb8940e6-0f64-4c40-9a34-006d2fc25199', 'João Lucas M. do Carmo', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('8cc81f19-e497-49b3-9794-d568982ea053', 'João Miguel', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('22bcd722-06f1-46b5-8366-21205b37cbca', 'Joaquim Moraes Cipriano', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('2e57b22b-e67b-45aa-a378-05182c69f26f', 'Juan Pereira Caetano', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('5ab6eb12-f4c0-4546-995c-dba6c055f531', 'Junior Pernambucano', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('f442b91c-f0a8-47a0-8b99-fef6b932cddc', 'Kaique Leal', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('18f1e694-cd12-4d77-914f-6d1dc7c7caae', 'Kauan Breno R. de Oliveira', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('6c4bb0c5-db2f-46c6-8c4b-fc85659255ac', 'Luan Cariollo Domingues', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('5e43b0c8-a920-4b72-b57c-ea8f13eadac0', 'Lucas Brito', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('f103de98-c31e-413e-b8a8-befa1de45b2f', 'Lucas Framback', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('1194a629-96b4-4f20-be3f-a5f292c9ece7', 'Luiz Gustavo', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('24817240-4819-4a9a-b474-bd001034296e', 'Marco Antonio', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('6cacc771-149c-4dfe-8c1b-f6e2ca5b9283', 'Miguel Araújo', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('528d2fb5-f309-427a-8816-113cb6118ece', 'Miguel Leandro da Costa', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('5a1c9fa5-bab1-45da-9f86-8888803b7d53', 'Nicolas de Carvalho', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('f5e9924f-bcda-4668-ba7c-5864204603ec', 'Ruan Gabriel', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('c4229748-7e19-4570-a082-9d02807ffe63', 'Ryan Lucas', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('64f08c65-7ec6-4be3-be7e-d76ecc5b9dba', 'Samuel Avelar', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('80902c01-5e26-41cc-aaaf-dbec49d3cd6e', 'Samuel Barreto', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('032c7ba5-d549-42e5-868a-181ba914b553', 'Samuel Gomes', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('ea5e1413-310b-46d9-9c05-148148984083', 'Samuel Gomes Avelar', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('5161b934-bdeb-44a1-91a2-90e4ad1a47c3', 'Thalles Miguel F. S. Luiz', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('7274dfed-ef1c-47fb-bf53-97bc2a9155d2', 'Nicolas Barreto', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('009dbd39-7e67-4b54-a352-883bf9220cba', 'Vitor Hugo', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00'),
('ce42832b-18f0-4ae2-99aa-141a691ffa5e', 'Marcos Kaique', '2025-06-14 00:55:52.442571+00', '2025-06-14 00:55:52.442571+00');

-- 8️⃣ INSERIR INSCRIÇÕES
INSERT INTO public.inscricoes (id, created_at, nome_aluno, sobrenome_aluno, idade_aluno, nome_responsavel1, sobrenome_responsavel1, whatsapp_responsavel1, relacionamento_responsavel1, nome_responsavel2, sobrenome_responsavel2, whatsapp_responsavel2, relacionamento_responsavel2, mesmo_endereco, endereco_aluno_rua, endereco_aluno_numero, endereco_aluno_complemento, endereco_aluno_bairro, endereco_responsavel_rua, endereco_responsavel_numero, endereco_responsavel_complemento, endereco_responsavel_bairro, status) VALUES
('2794a11a-204a-457c-a6ec-350cea5678c8', '2025-06-03 22:58:26.659953+00', 'Alfredo', 'dos Santos Araújo', 7, 'Rebeca', 'dos Santos Araújo', '+5521219699805', 'pai/mae', 'Sergio', 'Costa', '+5521976988970', 'pai/mae', true, 'Estrada Santa Eugenia', '2400', NULL, 'Paciência', NULL, NULL, NULL, NULL, 'pending'),
('ce1585dc-3e9e-4737-88f7-ba3dd00870af', '2025-06-06 20:01:04.095256+00', 'Rebeca', 'dos Santos Araújo', 9, 'Rebeca', 'dos Santos Araújo', '+5521219699805', 'pai/mae', 'Rebeca', 'dos Santos Araújo', '+5521219699805', 'irmao/irma', true, 'Estrada Santa Eugenia', '2400', NULL, 'Paciência', NULL, NULL, NULL, NULL, 'pending');

-- ✅ MIGRAÇÃO COMPLETA!
-- Total: 5 tabelas | 1 admin | 39 alunos | 2 inscrições
