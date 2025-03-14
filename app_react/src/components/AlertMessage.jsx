export function AlertMessage({ message, typeAlert, fnRefresh}) {
  return (
    <>
      <div className={`alert ${typeAlert} alert-dismissible fade show`} role="alert">
        <strong>{ message }</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={fnRefresh}></button>
      </div>
    </>
  );
}

export function AlertFilter({ message, typeAlert }) {
  return (
    <>
      <div className={`alert ${typeAlert} alert-dismissible fade show`} role="alert">
        <strong>{ message }</strong>
      </div>
    </>
  );
}
