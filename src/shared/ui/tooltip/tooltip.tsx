import { CSSProperties, PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren<{
  isError?: boolean;
  noPadding?: boolean;
}>;

export const Tooltip = (props: TooltipProps) => {
  const { children, isError, noPadding } = props;

  const tooltipStyles: CSSProperties = {
    padding: noPadding ? undefined : "20px 0 0",
    textAlign: "center",
    fontWeight: 600,
    color: isError ? "#f44336" : undefined,
  };

  return <p style={tooltipStyles}>{children}</p>;
};
