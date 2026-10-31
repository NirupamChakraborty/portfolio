import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
  return (
    <div className="container page not-found">
      <PageHeader eyebrow="404" title="This page doesn't exist.">
        It may have moved, or the link might be wrong.
      </PageHeader>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
