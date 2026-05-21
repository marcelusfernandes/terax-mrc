# Commit Convention

## Formato

```
<type>: <description>

<optional body>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.

Sem ID de issue — o projeto não usa Linear.

## Exemplos

- `feat: add cart service with add/remove operations`
- `fix: prevent race condition on cart state`
- `docs: update memory-patterns rules`
- `refactor: extract pty session lifecycle into hook`
- `chore: bump tauri to 2.x`

## When to commit

- **Um commit por feature** quando possível — squash se acumular vários commits na branch.
- Commit **somente quando todos os testes passam**.
- **NUNCA** commitar testes falhando ou código quebrado.
- Não commitar secrets, `.env*`, credenciais ou binários grandes.

## Body (opcional)

Use o body para o **why**, não o **what**. Referenciar o plan file quando útil:

```
feat: add cart service

See _plans-fase1/3_review/PR12-feat-cart-service/feat-cart-service.plan.md
for context and acceptance criteria.
```

## Compatibilidade com upstream

O upstream (`crynta/terax-ai`) usa **Conventional Commits com scope** (ex: `feat(terminal): add split panes`). Para PRs que eventualmente venham a ser submetidas ao upstream, ajustar o título do PR para incluir o scope conforme `CONTRIBUTING.md` do projeto original. Para trabalho interno no fork, o formato sem scope acima é o padrão.
