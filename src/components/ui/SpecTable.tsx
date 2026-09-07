import type { ReactNode } from "react";

export type SpecRow = {
  label: string;
  value: ReactNode;
  /** Renders the value muted with a "not verified" tag instead of a hard fact. */
  unverified?: boolean;
};

export function SpecTable({ rows, caption }: { rows: SpecRow[]; caption?: string }) {
  return (
    <table className="ef-spec">
      {caption ? <caption>{caption}</caption> : null}
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>
              {row.unverified ? (
                <span className="ef-tag ef-tag--flag">Not verified yet</span>
              ) : (
                row.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
