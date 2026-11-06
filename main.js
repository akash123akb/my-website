// Entry Point for CSE Academic Command Center Web App
import './style.css';
import { 
  initApp, 
  switchView, 
  openDrawer, 
  closeDrawer, 
  openModal, 
  closeModal, 
  toggleTimer, 
  resetTimer, 
  setTimerMode, 
  setAmbientSound, 
  handleTopicSearch, 
  toggleTopicStatus, 
  toggleTopicRevision, 
  toggleGoalStatus, 
  handleCreateSubject, 
  handleCreateTopic, 
  handleProfileUpdate 
} from './app.js';

// Expose handlers to global window object for HTML inline events
Object.assign(window, {
  switchView,
  openDrawer,
  closeDrawer,
  openModal,
  closeModal,
  toggleTimer,
  resetTimer,
  setTimerMode,
  setAmbientSound,
  handleTopicSearch,
  toggleTopicStatus,
  toggleTopicRevision,
  toggleGoalStatus,
  handleCreateSubject,
  handleCreateTopic,
  handleProfileUpdate
});

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

