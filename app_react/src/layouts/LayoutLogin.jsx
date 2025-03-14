import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LayoutLogin({ children }) {
  const navigate = useNavigate();
  const SessionUser = localStorage.getItem("SessionUser");

  useEffect(() => {
    if (SessionUser) {
      navigate(`/Dashboard/${SessionUser}`);
    }
  }, [SessionUser, navigate]);

  if (SessionUser) {
    return null;
  }

  return (
    <>
      <main className="MainLayoutLogin">
        <section className="card shadow-lg p-4 border border-3 border-primary">
          {children}
        </section>
      </main>
    </>
  );
}
