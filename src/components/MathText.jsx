import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import './MathText.css';

/**
 * MathText component - Renders text with LaTeX math expressions
 * 
 * Supports:
 * - Inline math: $expression$
 * - Block math: $$expression$$
 * 
 * @param {string} children - Text content that may contain LaTeX expressions
 */
const MathText = ({ children }) => {
    if (!children) return null;

    const text = String(children);

    // Split text by block math ($$...$$) and inline math ($...$)
    const parts = [];
    let currentIndex = 0;

    // Regular expression to match both block and inline math
    const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
    let match;

    while ((match = mathRegex.exec(text)) !== null) {
        // Add text before the math expression
        if (match.index > currentIndex) {
            const beforeText = text.slice(currentIndex, match.index);
            parts.push({ type: 'text', content: beforeText });
        }

        // Add the math expression
        const mathContent = match[1];
        if (mathContent.startsWith('$$') && mathContent.endsWith('$$')) {
            // Block math
            const expression = mathContent.slice(2, -2).trim();
            parts.push({ type: 'block-math', content: expression });
        } else if (mathContent.startsWith('$') && mathContent.endsWith('$')) {
            // Inline math
            const expression = mathContent.slice(1, -1).trim();
            parts.push({ type: 'inline-math', content: expression });
        }

        currentIndex = match.index + mathContent.length;
    }

    // Add remaining text after the last math expression
    if (currentIndex < text.length) {
        const remainingText = text.slice(currentIndex);
        parts.push({ type: 'text', content: remainingText });
    }

    // If no math was found, return plain text
    if (parts.length === 0) {
        return <span className="math-text">{text}</span>;
    }

    // Render the parts
    return (
        <span className="math-text">
            {parts.map((part, index) => {
                if (part.type === 'block-math') {
                    return (
                        <div key={index} className="math-block">
                            <BlockMath math={part.content} />
                        </div>
                    );
                } else if (part.type === 'inline-math') {
                    return (
                        <span key={index} className="math-inline">
                            <InlineMath math={part.content} />
                        </span>
                    );
                } else {
                    // Preserve line breaks in plain text
                    return (
                        <span key={index}>
                            {part.content.split('\n').map((line, i, arr) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                }
            })}
        </span>
    );
};

export default MathText;
