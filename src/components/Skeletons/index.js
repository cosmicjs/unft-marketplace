import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useDarkMode from "use-dark-mode";

const Skeletons = ( {count, height = 50 } ) => {
  const darkMode = useDarkMode( false );

  return (
    <SkeletonTheme baseColor={darkMode.value ? "#c7c8c9" : "#d9d9d9"} highlightColor={darkMode.value ? "#e6e8eb" : "#ebebf0"}>
      <Skeleton height={height} count={count} />
    </SkeletonTheme>
  )
};

export default Skeletons;
