<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Use TanStack file routes with a shared MoneyProvider and app shell; this keeps navigation shareable while all views use the same financial state.
- Keep browser persistence and backup validation in `src/lib/money.ts`, loaded after hydration; this centralizes storage and prevents SSR mismatches.
- Calculate balances from opening balance and transactions, and reserve only unpaid monthly obligations; this makes transaction edits reversible and prevents double deductions.
- Keep all financial formulas in the data module and test them independently of the UI; this protects affordability decisions from presentation changes.
- Use semantic neo-brutalist tokens and shared Button/Dialog controls; this keeps visual and keyboard behavior consistent.
