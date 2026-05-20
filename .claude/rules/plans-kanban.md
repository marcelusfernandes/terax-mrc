# Plans Kanban (`_plans-fase1/`)

Toda feature tem um plano documentado em `_plans-fase1/`, organizado em 5 estágios.

## Layout

```
_plans-fase1/
├── 1_todo/<branch-name>/            # spec pronta, ainda não iniciada
├── 2_doing/<branch-name>/           # branch ativa (nome da pasta = nome da branch)
├── 3_review/PR<NN>-<branch-name>/   # PR aberta no GitHub
├── 4_done/PR<NN>-<branch-name>/     # PR mergeada
└── archived/<branch-name>/          # descartada
```

Cada pasta contém pelo menos `<branch-name>.plan.md` com a especificação da feature.

## Template do `*.plan.md`

```markdown
# <Título da feature>

## Objective
O que esta feature realiza (1-2 frases).

## Context
Por que importa. Links para issues, conversas, ou contexto do upstream.

## Contracts
- Superfície de API, assinaturas, tipos
- Arquivos tocados (paths)

## Acceptance Criteria
- [ ] Critério 1 (testável)
- [ ] Critério 2
- [ ] Todos os testes passam
- [ ] Type-check / lint limpos

## Notes
Edge cases, riscos, follow-ups.
```

## Ciclo de uma feature

### 1. Plan
Criar `_plans-fase1/1_todo/<branch-name>/<branch-name>.plan.md` com objetivo, contexto, contratos e acceptance criteria. Discutir com usuário se o escopo for não-trivial.

### 2. Start
Mover pasta para `2_doing/<branch-name>/`, criar branch a partir de `develop` com mesmo nome:

```bash
git checkout develop && git pull
git checkout -b <branch-name>
```

### 3. Implement
TDD: red → green → refactor. Validar acceptance criteria do plano à medida que avança.

### 4. Validate
Apresentar resultado ao usuário e **pedir aprovação para abrir PR**. Não abrir antes.

### 5. Open PR (somente após aprovação)

**Forma à prova de erro** — flags explícitos pra escapar dos defaults do GitHub em forks:

```bash
git push -u origin <branch-name>

gh pr create \
  --repo marcelusfernandes/terax-mrc \
  --base develop \
  --head <branch-name> \
  --title "<conventional title>" \
  --body "<body>"

# Capturar o número da PR do output
mv _plans-fase1/2_doing/<branch-name> _plans-fase1/3_review/PR<NN>-<branch-name>
```

**Regras absolutas:**
- **NUNCA** `--base main`.
- **NUNCA** omitir `--repo marcelusfernandes/terax-mrc` (sem ele, o `gh` pode default pro upstream `crynta/terax-ai`).
- **NUNCA** compartilhar/usar URL `/pull/new/<branch>` (ver `branch-strategy.md` → "GitHub UI trap em forks").

**Se for via navegador**, usar:
```
https://github.com/marcelusfernandes/terax-mrc/compare/develop...<branch-name>?expand=1
```

**Após criar, conferir imediatamente:**
```bash
gh pr view <NN> --repo marcelusfernandes/terax-mrc --json baseRefName,headRefName,baseRepository,headRepository
```
- `baseRefName` deve ser `develop`
- `baseRepository.name` deve ser `terax-mrc` (não `terax-ai`)
- Se algo estiver errado: `gh pr edit <NN> --repo marcelusfernandes/terax-mrc --base develop` (não dá pra mudar base repo cross-fork via gh; nesse caso fechar e reabrir).

### 6. Status sync (periodicamente e quando o usuário perguntar)

```bash
gh pr list --state all --json number,title,state,headRefName,mergedAt --limit 50
```

Para cada pasta em `3_review/`:

- `state == MERGED` → `mv _plans-fase1/3_review/PR<NN>-... _plans-fase1/4_done/PR<NN>-...` e informar usuário.
- `state == CLOSED` (sem merge) → `mv _plans-fase1/3_review/PR<NN>-... _plans-fase1/archived/...` e informar usuário.
- `state == OPEN` → deixar em `3_review/`.

## Convenções

- Nome da pasta em `2_doing/` é **idêntico** ao nome da branch.
- Ao mover para `3_review/`, prefixar com `PR<NN>-` (zero-padded a 2 dígitos quando aplicável; PR100+ pode usar 3+).
- Se uma feature for descartada antes de virar PR, mover de `2_doing/` (ou `1_todo/`) diretamente para `archived/` com nota no plan file explicando o motivo.
