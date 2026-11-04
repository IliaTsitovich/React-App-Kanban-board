import './DemoNotice.scss';

export function DemoNotice() {
  return (
    <p className="demo-notice" role="note">
      <strong>Demo:</strong> tasks are saved only in this browser and are lost if its data is
      cleared. Profiles have no passwords, so anyone using this browser can open them. Don&apos;t
      store anything sensitive here.
    </p>
  );
}
