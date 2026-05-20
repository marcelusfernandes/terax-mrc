# Branch Strategy (ABSOLUTO)

Estas regras são inegociáveis. Aplicam-se a toda mudança neste repositório.

## Branch base

- **`develop` é a branch base.** Toda branch é criada a partir de `develop`.
- **PRs SEMPRE apontam para `develop` no próprio fork (`marcelusfernandes/terax-mrc`). NUNCA para `main` e NUNCA para o upstream (`crynta/terax-ai`).**
- **NUNCA fazer merge direto em qualquer branch** — sempre via PR.
- **Sempre validar com o usuário ANTES de abrir PR.** Não abrir PR sem aprovação explícita.

## ⚠️ GitHub UI trap em forks (CRÍTICO)

Quando uma branch é pushada para um fork, o GitHub aplica **dois defaults agressivos** ao abrir o form de PR:

1. **Base repo** = upstream (`crynta/terax-ai`), não o fork
2. **Base branch** = default branch do upstream (`main`)

Isto leva a PRs apontando pra `crynta/terax-ai:main` mesmo quando a intenção é PR interno no fork.

**Regras para evitar:**

- **NUNCA usar a URL `https://github.com/.../pull/new/<branch>`.** Essa URL não força base/head e cai nos defaults do GitHub.
- **Sempre usar a URL de compare explícita** quando for via navegador:
  ```
  https://github.com/marcelusfernandes/terax-mrc/compare/develop...<branch-name>?expand=1
  ```
  Esse formato força `base=develop` no fork e `head=<branch-name>` no fork.
- **Preferir `gh pr create` com `--repo` e `--head` explícitos** (ver `plans-kanban.md`).
- **Antes de submeter o form do GitHub, conferir explicitamente:**
  - "base repository" = `marcelusfernandes/terax-mrc` (não `crynta/terax-ai`)
  - "base" branch = `develop` (não `main`)
  - "compare" branch = a sua feature branch

## Naming

## Naming

Formato: `<tipo>/<short-description>` (kebab-case).

| Tipo         | Para                                         |
| ------------ | -------------------------------------------- |
| `feat/`      | Nova feature                                 |
| `fix/`       | Bug fix                                      |
| `refactor/`  | Refactor sem mudança de comportamento        |
| `docs/`      | Apenas docs                                  |
| `test/`      | Apenas testes                                |
| `chore/`     | Tooling, config, dependências                |
| `perf/`      | Performance                                  |
| `ci/`        | CI / pipeline de build                       |
| `security/`  | Segurança                                    |

Exemplos:
- `feat/cart-service`
- `fix/guardrails-pending`
- `docs/ai-scaffolding-improvement`

## Layout de remotes (este fork)

Este repositório é um fork de `crynta/terax-ai`. Remotes:

```
origin    → marcelusfernandes/terax-mrc   (push target)
upstream  → crynta/terax-ai               (read-only — push URL desabilitada via `no_push`)
```

- `git push` (sem args) sempre vai para `origin` (o fork).
- Atualizar com upstream: `git fetch upstream && git merge upstream/main` na branch `develop` (ou `main` local, conforme estratégia de sincronia escolhida).
- Push em `upstream` é bloqueado localmente — falha antes de chegar no GitHub.

## Sincronização com upstream

`main` local espelha `upstream/main`. Não commitar diretamente em `main`. Fluxo de sync:

```bash
git fetch upstream
git checkout main
git merge --ff-only upstream/main   # sem divergência
git push origin main                # propaga para o fork
git checkout develop
git merge main                      # traz updates do upstream para develop
```
