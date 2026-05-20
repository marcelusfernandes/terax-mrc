# CLAUDE.md

Memória de projeto para o Claude Code trabalhando neste fork (`marcelusfernandes/terax-mrc`, upstream `crynta/terax-ai`).

## Arquitetura

`TERAX.md` é o doc vivo de arquitetura — ler antes de qualquer mudança não-trivial. Cobre two-process model, módulos do frontend, subsistema AI, gotchas de Windows/ConPTY, e convenções cross-platform.

@TERAX.md

## Workflow rules (mandatórias)

As regras abaixo governam **toda** mudança neste repositório. Ler e seguir estritamente.

@.claude/rules/branch-strategy.md
@.claude/rules/plans-kanban.md
@.claude/rules/commits.md

## Tooling

- Frontend type-check: `pnpm exec tsc --noEmit`
- Rust: `cd src-tauri && cargo check && cargo clippy`
- Testes: `pnpm test` (frontend), `cargo test` (Rust)
- Package manager: **pnpm** (nunca npm/yarn)
- Dev: `pnpm tauri dev` · Build: `pnpm tauri build`
