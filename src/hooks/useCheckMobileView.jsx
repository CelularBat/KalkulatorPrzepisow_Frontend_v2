
import useMediaQuery from './useMediaQuery';

export default function useCheckIsMobileView() {

  return useMediaQuery('(max-width: 768px)');
}
