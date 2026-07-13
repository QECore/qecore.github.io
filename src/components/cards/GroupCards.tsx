import React from "react";

interface GroupCardsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GroupCards — container component that ensures all child cards (DocCard/SkeuCard)
 * share exactly the same height, regardless of differing text or code lengths inside them.
 *
 * Uses flex row layout with items-stretch to align card heights uniformly.
 */
export default function GroupCards({ children, className = "" }: GroupCardsProps) {
  return (
    <div
      className={`flex flex-row items-stretch gap-6 w-full overflow-x-auto pb-0 scrollbar-none ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        // Ensure child elements stretch to the height of the tallest card
        return React.cloneElement(child, {
          ...child.props,
          className: `${child.props.className || ""} flex flex-col justify-between`,
          style: {
            ...(child.props.style || {}),
            height: "auto",
            display: "flex",
            flexDirection: "column"
          }
        });
      })}
    </div>
  );
}
