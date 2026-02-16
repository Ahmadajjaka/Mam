
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PrayerTracker from './components/PrayerTracker';
import QuranTracker from './components/QuranTracker';
import StudyTracker from './components/StudyTracker';
import AIAssistant from './components/AIAssistant';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Dashboard);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.Dashboard:
        return <Dashboard />;
      case AppTab.Prayers:
        return <PrayerTracker />;
      case AppTab.Quran:
        return <QuranTracker />;
      case AppTab.Study:
        return <StudyTracker />;
      case AppTab.AI:
        return <AIAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
