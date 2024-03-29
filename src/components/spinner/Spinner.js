import { CircularProgress } from '@mui/material';

export default function Spinner() {
  return (
    <div className="flex flex-row justify-center items-center min-h-[200px]">
      <CircularProgress />
    </div>
  );
}
