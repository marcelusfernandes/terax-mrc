# `.claude/rules/`

Regras de workflow do projeto. Carregadas pelo Claude Code via `@` imports no `CLAUDE.md` da raiz.

## Arquivos

- [branch-strategy.md](./branch-strategy.md) — branch base, naming, layout de remotes do fork
- [plans-kanban.md](./plans-kanban.md) — ciclo kanban em `_plans-fase1/`
- [commits.md](./commits.md) — convenção de commits

## Status

Estas regras são **mandatórias** para qualquer mudança neste repositório. Sobrescrevem defaults globais e convenções do projeto upstream onde houver conflito.

## Bootstrap

A criação inicial deste workflow (branch `develop`, esqueleto de `_plans-fase1/`, `.claude/rules/`, `CLAUDE.md`) foi feita fora do ciclo Kanban — bootstrap único. A partir daqui, **toda** mudança segue o ciclo descrito em `plans-kanban.md`.
