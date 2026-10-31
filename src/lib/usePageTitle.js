import { useEffect } from "react";

const DEFAULT_TITLE = "Nirupam Chakraborty · Software Developer";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Nirupam Chakraborty` : DEFAULT_TITLE;
  }, [title]);
}
