import { Navbar } from "../components/HeaderNavbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export function LayoutIndexDashboard({ children, name, id, }) {
  
  const navigate = useNavigate();
  const SessionUser = localStorage.getItem('SessionUser');

  useEffect(() => {
    if (!SessionUser) {
      navigate('/');
    }
  }, [SessionUser, navigate]);

  if (!SessionUser) {
    return null;
  }

  return (
    <>
      <Navbar UserName={name} UserID={id}/>
      <Sidebar UserID={id}/>
      <main className="w-100 mt-4">
        {children}
      </main>
    </>
  );
}
