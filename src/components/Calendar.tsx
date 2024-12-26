import { Calendar as MantineCalendar } from '@mantine/dates';
import '@mantine/core/styles.css';

interface CalendarProps {
  onChange: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onChange }) => {
  return (
    <MantineCalendar onChange={onChange} />
  );
};

export default Calendar;
