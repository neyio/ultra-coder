import React from 'react';
import useMenu from '@/components/Hooks/useMenu';

const Dashboard = props => {
  const { render } = useMenu();
  return <section>{render}</section>;
};
export default Dashboard;
