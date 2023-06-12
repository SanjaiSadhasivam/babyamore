import React, { useState } from "react";
import { Card, Button } from "reactstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { OverlineTitle } from "../text/Text";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const PreviewCard = ({ className, bodyClass, ...props }) => {
  return (
    <Card className={`card-preview ${className ? className : ""}`}>
      <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
    </Card>
  );
};

export const PreviewAltCard = ({ className, bodyClass, ...props }) => {
  return (
    <Card className={`${className ? className : ""}`}>
      <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
    </Card>
  );
};

export const PreviewTable = ({ ...props }) => {
  return (
    <Card className="card card-bordered card-preview">
      <table className={`table preview-reference ${props.size ? `table-${props.size}` : ""}`}>{props.children}</table>
    </Card>
  );
};

export const CodeBlock = ({ language, ...props }) => {
  const [copyText] = useState(props.children);
  const [copyState, setCopyState] = useState(false);
  const onCopyClick = () => {
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };
  return (
    <div  >
      
    
    </div>
  );
};
