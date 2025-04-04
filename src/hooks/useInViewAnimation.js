import { useEffect, useState } from "react";

const useInViewAnimation = (ref, options = { threshold: 0.2 }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(element); // Stop observing after the element is visible
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, options]);

  return isInView;
};

export default useInViewAnimation;
