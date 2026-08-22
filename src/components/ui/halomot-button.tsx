"use client";

import React, { useState } from "react";

interface HalomotButtonProps {
  gradient?: string;
  inscription: string;
  onClick?: () => void;
  fillWidth?: boolean;
  fixedWidth?: string;
  href?: string;
  backgroundColor?: string;
  icon?: React.ReactElement;
  borderWidth?: string;
  padding?: string;
  outerBorderRadius?: string;
  innerBorderRadius?: string;
  textColor?: string;
  hoverTextColor?: string;
}

export const HalomotButton: React.FC<HalomotButtonProps> = ({
  gradient = "linear-gradient(135deg, #f59e0b, #d97706)",
  inscription,
  onClick,
  fillWidth = false,
  fixedWidth,
  href,
  backgroundColor = "#000",
  icon,
  borderWidth = "1px",
  padding,
  outerBorderRadius = "9999px",
  innerBorderRadius = "9999px",
  textColor = "#fff",
  hoverTextColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: React.CSSProperties = fixedWidth
    ? { width: fixedWidth, display: "inline-block" }
    : {};

  const buttonStyle: React.CSSProperties = {
    margin: fillWidth || fixedWidth ? "0" : "auto",
    padding: borderWidth,
    background: gradient,
    border: "0",
    borderRadius: outerBorderRadius,
    color: textColor,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    whiteSpace: "nowrap",
    transition: "all .3s",
    width: fillWidth || fixedWidth ? "100%" : "fit-content",
    boxSizing: "border-box",
  };

  const spanStyle: React.CSSProperties = {
    background: isHovered ? "transparent" : backgroundColor,
    padding: padding ?? (fillWidth || fixedWidth ? "0.75rem 0" : "0.75rem 2rem"),
    border: "0",
    borderRadius: innerBorderRadius,
    width: "100%",
    height: "100%",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: isHovered && hoverTextColor ? hoverTextColor : textColor,
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    gap: icon ? "0.5em" : 0,
    cursor: "pointer",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      if (!href) e.preventDefault();
      onClick();
    }
  };

  const ButtonContent = (
    <span
      style={spanStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
{icon && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}      {inscription}
    </span>
  );

  const ButtonElement = href ? (
    <a href={href} style={buttonStyle} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {ButtonContent}
    </a>
  ) : (
    <button type="button" style={buttonStyle} onClick={handleClick}>
      {ButtonContent}
    </button>
  );

  return fixedWidth ? <div style={containerStyle}>{ButtonElement}</div> : ButtonElement;
};