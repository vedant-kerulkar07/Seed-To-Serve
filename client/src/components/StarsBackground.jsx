import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { cn } from "@/lib/utils";

const StarsBackgroundWrapper = () => {
  return (
    <StarsBackground
      starColor="#ffffff"
      className={cn(
        "fixed inset-0 -z-10",
        "bg-[radial-gradient(ellipse_at_bottom,_#0f172a_0%,_#020617_100%)]"
      )}
    />
  );
};

export default StarsBackgroundWrapper;
