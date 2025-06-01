import { useState } from 'react';
import './Section.css';

export default function Section({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{isOpen ? '↓' : '-'} {title} </h3>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
