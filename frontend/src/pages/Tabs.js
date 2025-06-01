import { React, useState } from 'react';
import Entities from './EntityList.js';
import Bills from './BillList.js';
import Stats from './Stats.js';
import './Tabs.css';

export default function Tabs() {
    const [activeTab, setActiveTab] = useState('Entities');
    
    return (
        <div className="tab-container">
            <br />
            <b><i>=> Test technique ARIPA par LR</i></b>
            <div className="tab-header">
                <div className={activeTab === 'Bills' ? 'tab active' : 'tab'} onClick={() => setActiveTab('Bills')}>
                    Liste des factures
                </div>
                <div className={activeTab === 'Entities' ? 'tab active' : 'tab'} onClick={() => setActiveTab('Entities')}>
                    Entités
                </div>
                <div className={activeTab === 'Stats' ? 'tab active' : 'tab'} onClick={() => setActiveTab('Stats')}>
                    Statistiques globales
                </div>
            </div>

            {activeTab === 'Bills' && (
                <div className="tab-content">
                    <Bills />
                </div>
            )}
            {activeTab === 'Entities' && (
                <div className="tab-content">
                    <Entities />
                </div>
            )}
            {activeTab === 'Stats' && (
                <div className="tab-content">
                    <Stats />
                </div>
            )}
        </div>
    );
}
