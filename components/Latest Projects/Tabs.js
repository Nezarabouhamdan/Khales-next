import React from 'react';
import { NavPills } from './LatestProjectsStyles';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'proj1', label: 'Featured' },
    { id: 'proj2', label: 'Architecture' },
    { id: 'proj3', label: 'Interior Design' },
  ];

  return (
    <div>
      <NavPills>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </NavPills>
    </div>
  );
};

export default Tabs;
