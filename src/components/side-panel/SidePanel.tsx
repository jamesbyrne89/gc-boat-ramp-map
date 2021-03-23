import React from "react";
import SidePanelStyles from "./SidePanelStyles";

interface SidePanelProps {
  children: React.ReactNode;
}

const SidePanel = ({ children }: SidePanelProps) => {
  return <SidePanelStyles>{children}</SidePanelStyles>;
};

export default SidePanel;
