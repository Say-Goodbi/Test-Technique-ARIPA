import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>404 - Page Introuvable</h1>
            <p>La page que vous essayez d'atteindre n'existe pas.</p>
            <Link to="/">Se rendre à l'accueil</Link>
        </div>
    );
}
