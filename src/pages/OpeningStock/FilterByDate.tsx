import { Switch, Transition } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

export interface FilterByDateProps {
  onFilterDateChange: (date: Date) => void;
  onEnableFilterDateChange: (enable: boolean) => void;
}
function FilterByDate(props: FilterByDateProps) {
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const [enableFilterDate, setEnableFilterDate] = useState(false);

  const { onFilterDateChange, onEnableFilterDateChange } = props;

  return (
    <>
      <Transition
        mounted={enableFilterDate}
        transition="slide-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <DatePickerInput
            dropdownType="modal"
            style={styles}
            placeholder="Select date"
            icon={<IconCalendar size={16} />}
            value={new Date(filterDate)}
            onChange={(e) => {
              setFilterDate(e ?? new Date()),
                onFilterDateChange(e ?? new Date());
            }}
          />
        )}
      </Transition>
      <Switch
        checked={enableFilterDate}
        onChange={(e) => {
          setEnableFilterDate(e.target.checked),
            onEnableFilterDateChange(e.target.checked);
        }}
        label="Filter by date"
        labelPosition="left"
      />
    </>
  );
}

export default FilterByDate;
