import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { Navbar } from "../components/HeaderNavbar";
import { Sidebar } from "../components/Sidebar";

export function LayoutDashboard({ children, name, id, }) {
  
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
      <main className="w-100 mt-5">
        <section className="bg-white border border-2 border-primary rounded m-5 p-4">
          {children}
        </section>
      </main>
    </>
  );
}

