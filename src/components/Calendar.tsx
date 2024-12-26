"use client";

import React from "react";
import {
  Calendar as ModernCalendar,
  DayValue,
  Day,
} from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

/**
 * For convenience, define DayObject = { year: number; month: number; day: number }
 * to avoid confusion with DayValue (which can be null).
 */
type DayObject = {
  year: number;
  month: number;
  day: number;
};

interface CalendarProps {
  /**
   * Called when user selects a new date
   */
  onChange: (date: Date | null) => void;
  /**
   * Currently selected date
   */
  value: Date | null;
  /**
   * Disables certain days. We'll pass an array of DayObject to `disabledDays`.
   */
  bookedDates?: Date[]; // or any approach to list booked dates
}

function dateToDayObject(date: Date): DayObject {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function dayObjectToDate(dayObj: DayObject): Date {
  return new Date(dayObj.year, dayObj.month - 1, dayObj.day);
}

export default function Calendar({
  onChange,
  value,
  bookedDates = [],
}: CalendarProps) {
  // 1) Convert your JS Date => DayValue (could be null)
  let currentDayValue: DayValue = null;
  if (value) {
    currentDayValue = {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
    };
  }

  // 2) disabledDays must be Day[] (no nulls)
  const disabledDayObjects: Day[] = bookedDates.map((b) => ({
    year: b.getFullYear(),
    month: b.getMonth() + 1,
    day: b.getDate(),
  }));

  // 3) When user picks a day in react-modern-calendar-datepicker
  const handleDayChange = (selectedDayValue: DayValue) => {
    if (!selectedDayValue) {
      // If user clears the calendar, pass null
      onChange(null);
    } else {
      // convert DayValue => Date
      const newDate = new Date(
        selectedDayValue.year,
        selectedDayValue.month - 1,
        selectedDayValue.day
      );
      onChange(newDate);
    }
  };

  return (
    <ModernCalendar
      value={currentDayValue}
      onChange={handleDayChange}
      disabledDays={disabledDayObjects} // here we pass Day[], not DayValue[]
      colorPrimary="#4ade80" // Tailwind green-300
      colorPrimaryLight="#bbf7d0" // Tailwind green-100/200
      shouldHighlightWeekends
    />
  );
}
