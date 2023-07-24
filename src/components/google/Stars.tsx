import { StarIcon } from "@heroicons/react/24/solid";

interface StarsProps {
  rating: number;
  starSize?: number;
}

export const Stars = ({ rating }: StarsProps) => {
  return (
    <div className="flex my-auto ml-1">
      {/* tailwind class to move stars to the left a half px:  */}

      {[...Array(Math.floor(rating))].map((_, index) => (
        <StarIcon key={`star-${index}`} className="text-yellow-400 h-4 w-4" />
      ))}
    </div>
  );
};