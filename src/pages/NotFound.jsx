import { Link } from "react-router-dom";
import { useMotionValue } from "framer-motion";
import { CarFace } from "../components/Headlights";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
  const light = useMotionValue(1);

  return (
    <div className="container page not-found">
      <CarFace light={light} title="Angry car headlights" />
      <PageHeader eyebrow="404" title="Wrong turn.">
        No road here. This page may have moved, or the link might be wrong.
      </PageHeader>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
